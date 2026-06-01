const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const { protect, authorize } = require('../middleware/auth');

// Simulate payment methods: phonepe, gpay, upi, credit_card, debit_card

// ─────────────────────────────────────────
// POST /api/payment/initiate
// Initiate payment for a reservation
// Body: { reservationId, method }
// ─────────────────────────────────────────
router.post('/initiate', protect, authorize('customer'), async (req, res) => {
  try {
    const { reservationId, method } = req.body;

    if (!reservationId || !method) {
      return res.status(400).json({ success: false, message: 'reservationId and method are required.' });
    }

    const validMethods = ['phonepe', 'gpay', 'upi', 'credit_card', 'debit_card'];
    if (!validMethods.includes(method)) {
      return res.status(400).json({ success: false, message: `Invalid method. Choose from: ${validMethods.join(', ')}` });
    }

    const reservation = await Reservation.findById(reservationId)
      .populate('restaurant', 'name bookingFeePerGuest');

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found.' });
    }

    if (reservation.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    if (reservation.payment.status === 'paid') {
      return res.status(400).json({ success: false, message: 'Payment already completed.' });
    }

    if (reservation.status === 'cancelled') {
      return res.status(400).json({ success: false, message: 'Cannot pay for a cancelled booking.' });
    }

    // Generate a fake transaction ID
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate payment: return payment details based on method
    const paymentResponse = {
      reservationId,
      method,
      amount: reservation.totalAmount,
      transactionId,
      currency: 'INR',
    };

    if (method === 'phonepe' || method === 'gpay') {
      paymentResponse.upiId = method === 'phonepe' ? 'seatsync@phonepe' : 'seatsync@gpay';
      paymentResponse.qrCodeUrl = `https://placeholder.com/qr/${transactionId}`;
    } else if (method === 'upi') {
      paymentResponse.upiId = 'seatsync@upi';
    } else {
      paymentResponse.gateway = 'Simulated Card Gateway';
      paymentResponse.instructions = 'Enter your card details on the next screen.';
    }

    res.json({
      success: true,
      message: 'Payment initiated. Please complete the payment.',
      payment: paymentResponse,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// POST /api/payment/confirm
// Confirm/simulate payment completion
// Body: { reservationId, method, transactionId, cardDetails (optional) }
// ─────────────────────────────────────────
router.post('/confirm', protect, authorize('customer'), async (req, res) => {
  try {
    const { reservationId, method, transactionId } = req.body;

    if (!reservationId || !method || !transactionId) {
      return res.status(400).json({
        success: false,
        message: 'reservationId, method, and transactionId are required.',
      });
    }

    const reservation = await Reservation.findById(reservationId).populate(
      'restaurant',
      'name address'
    );

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found.' });
    }

    if (reservation.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    if (reservation.payment.status === 'paid') {
      return res.status(400).json({ success: false, message: 'Already paid.' });
    }

    // Simulate payment success (in production: verify with payment gateway)
    reservation.payment.method = method;
    reservation.payment.transactionId = transactionId;
    reservation.payment.status = 'paid';
    reservation.payment.paidAt = new Date();
    reservation.status = 'confirmed';

    await reservation.save();

    res.json({
      success: true,
      message: '🎉 Payment successful! Your table is confirmed. Thank you for booking!',
      reservation: {
        _id: reservation._id,
        restaurant: reservation.restaurant,
        date: reservation.date,
        timeSlot: reservation.timeSlot,
        guestCount: reservation.guestCount,
        totalAmount: reservation.totalAmount,
        status: reservation.status,
        payment: reservation.payment,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/payment/:reservationId/receipt
// Get payment receipt
// ─────────────────────────────────────────
router.get('/:reservationId/receipt', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId)
      .populate('restaurant', 'name address cuisine')
      .populate('customer', 'name email phone');

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found.' });
    }

    if (
      reservation.customer._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'owner'
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    if (reservation.payment.status !== 'paid') {
      return res.status(400).json({ success: false, message: 'Payment not completed yet.' });
    }

    res.json({
      success: true,
      receipt: {
        receiptId: `RCP-${reservation._id}`,
        reservationId: reservation._id,
        customer: reservation.customer,
        restaurant: reservation.restaurant,
        date: reservation.date,
        timeSlot: reservation.timeSlot,
        guestCount: reservation.guestCount,
        totalAmount: reservation.totalAmount,
        paymentMethod: reservation.payment.method,
        transactionId: reservation.payment.transactionId,
        paidAt: reservation.payment.paidAt,
        status: 'PAID',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
