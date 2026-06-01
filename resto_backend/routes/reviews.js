const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Reservation = require('../models/Reservation');
const { protect, authorize } = require('../middleware/auth');

// ─────────────────────────────────────────
// GET /api/reviews/restaurant/:restaurantId
// Get all reviews for a restaurant
// ─────────────────────────────────────────
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'newest' } = req.query;
    const sortMap = { newest: { createdAt: -1 }, highest: { rating: -1 }, lowest: { rating: 1 } };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Review.countDocuments({ restaurant: req.params.restaurantId });

    const reviews = await Review.find({ restaurant: req.params.restaurantId })
      .populate('customer', 'name profilePhoto')
      .sort(sortMap[sort] || { createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ success: true, total, page: parseInt(page), reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// POST /api/reviews
// Create a review (customer only)
// ─────────────────────────────────────────
router.post('/', protect, authorize('customer'), async (req, res) => {
  try {
    const { restaurantId, rating, title, comment, reservationId } = req.body;

    if (!restaurantId || !rating) {
      return res.status(400).json({ success: false, message: 'restaurantId and rating are required.' });
    }

    // If reservationId provided, mark as verified
    let isVerified = false;
    if (reservationId) {
      const reservation = await Reservation.findOne({
        _id: reservationId,
        customer: req.user._id,
        restaurant: restaurantId,
        status: 'confirmed',
      });
      if (reservation) isVerified = true;
    }

    const review = await Review.create({
      customer: req.user._id,
      restaurant: restaurantId,
      reservation: reservationId || null,
      rating,
      title,
      comment,
      isVerified,
    });

    await review.populate('customer', 'name profilePhoto');

    res.status(201).json({ success: true, message: 'Review submitted. Thank you!', review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this restaurant.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/reviews/:id
// Update a review (owner of review)
// ─────────────────────────────────────────
router.put('/:id', protect, authorize('customer'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });

    if (review.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this review.' });
    }

    const { rating, title, comment } = req.body;
    if (rating) review.rating = rating;
    if (title !== undefined) review.title = title;
    if (comment !== undefined) review.comment = comment;
    await review.save();

    res.json({ success: true, message: 'Review updated.', review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// DELETE /api/reviews/:id
// Delete a review
// ─────────────────────────────────────────
router.delete('/:id', protect, authorize('customer'), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });

    if (review.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Review deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
