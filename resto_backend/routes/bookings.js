const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');
const { protect, authorize } = require('../middleware/auth');

// ─────────────────────────────────────────
// POST /api/bookings
// Create a new table reservation (customer only)
// ─────────────────────────────────────────
router.post('/', protect, authorize('customer'), async (req, res) => {
  try {
    const { restaurantId, date, timeSlot, guestCount, specialRequests } = req.body;

    if (!restaurantId || !date || !timeSlot || !guestCount) {
      return res.status(400).json({
        success: false,
        message: 'restaurantId, date, timeSlot, and guestCount are required.',
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }

    // Validate the time slot exists in restaurant
    const slotExists = restaurant.slots.find((s) => s.time === timeSlot);
    if (!slotExists) {
      return res.status(400).json({ success: false, message: 'Invalid time slot for this restaurant.' });
    }

    // Check availability: count seats already booked in this slot on this date
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const slotReservations = await Reservation.find({
      restaurant: restaurantId,
      date: { $gte: startOfDay, $lte: endOfDay },
      timeSlot,
      status: { $in: ['pending', 'confirmed'] },
    });

    const bookedSeats = slotReservations.reduce((sum, r) => sum + r.guestCount, 0);
    const availableSeats = slotExists.totalSeats - bookedSeats;

    if (guestCount > availableSeats) {
      return res.status(400).json({
        success: false,
        message: `Not enough seats. Only ${availableSeats} seats available in this slot.`,
      });
    }

    // Calculate total amount in INR.
    const feePerGuest = restaurant.bookingFeePerGuest > 1 ? restaurant.bookingFeePerGuest : 75;
    const totalAmount = guestCount * feePerGuest;

    const reservation = await Reservation.create({
      customer: req.user._id,
      restaurant: restaurantId,
      date: new Date(date),
      timeSlot,
      guestCount,
      totalAmount,
      specialRequests: specialRequests || '',
      status: 'pending',
    });

    await reservation.populate([
      { path: 'restaurant', select: 'name address cuisine' },
      { path: 'customer', select: 'name email phone' },
    ]);

    res.status(201).json({
      success: true,
      message: 'Table reserved successfully. Proceed to payment.',
      reservation,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You already have a booking at this restaurant for this slot on this date.',
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/bookings/my
// Get all bookings for logged-in customer
// ─────────────────────────────────────────
router.get('/my', protect, authorize('customer'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { customer: req.user._id };
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Reservation.countDocuments(filter);

    const reservations = await Reservation.find(filter)
      .populate('restaurant', 'name address cuisine photos')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ success: true, total, page: parseInt(page), reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/bookings/:id
// Get a single booking (owner or customer)
// ─────────────────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('restaurant', 'name address cuisine photos bookingFeePerGuest')
      .populate('customer', 'name email phone');

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    // Only the customer or the restaurant owner can view
    const isCustomer = reservation.customer._id.toString() === req.user._id.toString();
    const isOwner = req.user.role === 'owner';

    if (!isCustomer && !isOwner) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this booking.' });
    }

    res.json({ success: true, reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/bookings/:id/cancel
// Cancel a booking (customer only)
// ─────────────────────────────────────────
router.put('/:id/cancel', protect, authorize('customer'), async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    if (reservation.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    if (['cancelled', 'completed'].includes(reservation.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel a booking that is already ${reservation.status}.`,
      });
    }

    reservation.status = 'cancelled';
    reservation.cancellationReason = req.body.reason || 'Cancelled by customer';
    await reservation.save();

    res.json({ success: true, message: 'Booking cancelled successfully.', reservation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
