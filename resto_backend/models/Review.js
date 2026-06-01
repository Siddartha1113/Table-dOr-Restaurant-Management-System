const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
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
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservation',
      default: null, // optional link to booking
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
    photos: [String], // URLs
    likes: {
      type: Number,
      default: 0,
    },
    isVerified: {
      // verified = linked to an actual reservation
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// One review per customer per restaurant
reviewSchema.index({ customer: 1, restaurant: 1 }, { unique: true });

// Auto-update restaurant's averageRating after save/delete
reviewSchema.post('save', async function () {
  await updateRestaurantRating(this.restaurant);
});

reviewSchema.post('findOneAndDelete', async function (doc) {
  if (doc) await updateRestaurantRating(doc.restaurant);
});

async function updateRestaurantRating(restaurantId) {
  const Restaurant = mongoose.model('Restaurant');
  const result = await mongoose.model('Review').aggregate([
    { $match: { restaurant: restaurantId } },
    { $group: { _id: '$restaurant', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);
  if (result.length > 0) {
    await Restaurant.findByIdAndUpdate(restaurantId, {
      averageRating: Math.round(result[0].avg * 10) / 10,
      totalReviews: result[0].count,
    });
  } else {
    await Restaurant.findByIdAndUpdate(restaurantId, {
      averageRating: 0,
      totalReviews: 0,
    });
  }
}

module.exports = mongoose.model('Review', reviewSchema);
