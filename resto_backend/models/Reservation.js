const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Booking date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'], // e.g. "19:00"
    },
    guestCount: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'At least 1 guest required'],
      max: [20, 'Cannot book for more than 20 guests'],
    },
    totalAmount: {
      type: Number, // guestCount * bookingFeePerGuest
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'],
      default: 'pending',
    },
    specialRequests: {
      type: String,
      maxlength: [500, 'Special requests cannot exceed 500 characters'],
      default: '',
    },
    payment: {
      method: {
        type: String,
        enum: ['phonepe', 'gpay', 'upi', 'credit_card', 'debit_card', 'other'],
      },
      transactionId: { type: String, default: '' },
      status: {
        type: String,
        enum: ['pending', 'paid', 'refunded', 'failed'],
        default: 'pending',
      },
      paidAt: { type: Date },
    },
    cancellationReason: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Prevent duplicate bookings (same restaurant + date + slot + customer)
reservationSchema.index(
  { restaurant: 1, date: 1, timeSlot: 1, customer: 1 },
  { unique: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);
