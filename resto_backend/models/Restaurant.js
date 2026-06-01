const mongoose = require('mongoose');

// Individual menu item schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    enum: ['starter', 'main', 'dessert', 'drinks', 'sides', 'other'],
    default: 'other',
  },
  isVeg: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  image: { type: String, default: '' },
});

// Time slot schema for booking availability
const slotSchema = new mongoose.Schema({
  time: { type: String, required: true }, // e.g. "19:00"
  totalSeats: { type: Number, required: true, default: 20 },
});

// Operating hours schema
const operatingHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    required: true,
  },
  isOpen: { type: Boolean, default: true },
  openTime: { type: String, default: '09:00' }, // 24hr format
  closeTime: { type: String, default: '22:00' },
});

const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    cuisine: {
      type: [String], // e.g. ["Italian", "Pizza"]
      required: [true, 'At least one cuisine type is required'],
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String },
      country: { type: String, default: 'India' },
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    photos: [
      {
        url: { type: String },
        caption: { type: String, default: '' },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    menu: [menuItemSchema],
    operatingHours: [operatingHoursSchema],
    slots: [slotSchema], // available booking time slots
    priceRange: {
      type: String,
      enum: ['₹', '₹₹', '₹₹₹', '₹₹₹₹', '$', '$$', '$$$', '$$$$'],
      default: '₹₹',
    },
    bookingFeePerGuest: {
      type: Number,
      default: 75,
    },
    totalTables: {
      type: Number,
      default: 10,
    },
    discount: {
      isActive: { type: Boolean, default: false },
      percentage: { type: Number, min: 0, max: 100, default: 0 },
      description: { type: String, default: '' },
      validUntil: { type: Date },
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    tags: [String], // e.g. ["rooftop", "pet-friendly", "parking"]
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Geo index for map-based queries
restaurantSchema.index({ location: '2dsphere' });

// Text index for search
restaurantSchema.index({ name: 'text', description: 'text', cuisine: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
