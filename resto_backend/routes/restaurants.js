const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { protect, authorize } = require('../middleware/auth');

// ─────────────────────────────────────────
// GET /api/restaurants
// Search + filter restaurants
// Query params: search, cuisine, priceRange, minRating, city, sortBy, page, limit
// ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const {
      search,
      cuisine,
      priceRange,
      minRating,
      city,
      sortBy = 'averageRating',
      page = 1,
      limit = 12,
      discount,
    } = req.query;

    const filter = { isActive: true };

    // Text search (name, description, cuisine)
    if (search) {
      filter.$text = { $search: search };
    }

    // Cuisine filter
    if (cuisine) {
      filter.cuisine = { $in: cuisine.split(',').map((c) => new RegExp(c.trim(), 'i')) };
    }

    // Price range filter
    if (priceRange) {
      filter.priceRange = { $in: priceRange.split(',') };
    }

    // Minimum rating filter
    if (minRating) {
      filter.averageRating = { $gte: parseFloat(minRating) };
    }

    // City filter
    if (city) {
      filter['address.city'] = new RegExp(city, 'i');
    }

    // Active discount filter
    if (discount === 'true') {
      filter['discount.isActive'] = true;
    }

    // Sort options
    const sortOptions = {
      rating: { averageRating: -1 },
      price_low: { priceRange: 1 },
      price_high: { priceRange: -1 },
      newest: { createdAt: -1 },
    };
    const sort = sortOptions[sortBy] || { averageRating: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Restaurant.countDocuments(filter);

    const restaurants = await Restaurant.find(filter)
      .select('-menu -operatingHours -slots') // exclude heavy fields for list view
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('owner', 'name email');

    res.json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      restaurants,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/restaurants/nearby
// Get restaurants near a lat/lng (for map hover feature - Yelp-style)
// Query params: lat, lng, radius (meters, default 5000)
// ─────────────────────────────────────────
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: 'lat and lng are required.' });
    }

    const restaurants = await Restaurant.find({
      isActive: true,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius),
        },
      },
    })
      .select('name cuisine address location photos averageRating totalReviews priceRange discount')
      .limit(20);

    res.json({ success: true, count: restaurants.length, restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/restaurants/recommendations
// Recommendations based on time of day and weather (client sends weather)
// Query params: weather (hot/cold/rainy/clear), timeOfDay (breakfast/lunch/dinner)
// ─────────────────────────────────────────
router.get('/recommendations', async (req, res) => {
  try {
    const { weather, timeOfDay, city } = req.query;

    // Map weather/time to cuisine tags
    const weatherCuisineMap = {
      hot: ['Ice Cream', 'Juices', 'Sushi', 'Salads', 'Cold Drinks'],
      cold: ['Soup', 'Indian', 'Hot Pot', 'Ramen', 'BBQ'],
      rainy: ['Indian', 'Chinese', 'Biryani', 'Pakoras', 'Comfort Food'],
      clear: ['Italian', 'Continental', 'Mexican', 'Grill'],
    };

    const timeCuisineMap = {
      breakfast: ['Cafe', 'Breakfast', 'Bakery', 'South Indian'],
      lunch: ['Indian', 'Chinese', 'Fast Food', 'Biryani'],
      dinner: ['Fine Dining', 'Italian', 'Continental', 'BBQ', 'Seafood'],
    };

    const suggestedCuisines = [
      ...(weatherCuisineMap[weather] || []),
      ...(timeCuisineMap[timeOfDay] || []),
    ];

    const filter = { isActive: true };
    if (suggestedCuisines.length > 0) {
      filter.cuisine = { $in: suggestedCuisines.map((c) => new RegExp(c, 'i')) };
    }
    if (city) filter['address.city'] = new RegExp(city, 'i');

    const restaurants = await Restaurant.find(filter)
      .select('name cuisine address photos averageRating totalReviews priceRange discount location')
      .sort({ averageRating: -1 })
      .limit(8);

    res.json({
      success: true,
      basedOn: { weather, timeOfDay },
      count: restaurants.length,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/restaurants/cuisines
// Get all distinct cuisine types
// ─────────────────────────────────────────
router.get('/cuisines', async (req, res) => {
  try {
    const cuisines = await Restaurant.distinct('cuisine', { isActive: true });
    res.json({ success: true, cuisines: cuisines.sort() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/restaurants/:id
// Full restaurant details (for individual restaurant page)
// ─────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('owner', 'name email phone');

    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    }

    res.json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/restaurants/:id/availability
// Check slot availability for a given date
// Query: date (YYYY-MM-DD)
// ─────────────────────────────────────────
router.get('/:id/availability', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ success: false, message: 'Date is required.' });

    const restaurant = await Restaurant.findById(req.params.id).select('slots operatingHours');
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    const Reservation = require('../models/Reservation');
    const queryDate = new Date(date);
    const dayName = queryDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    // Check if restaurant is open that day
    const daySchedule = restaurant.operatingHours.find((h) => h.day === dayName);
    if (daySchedule && !daySchedule.isOpen) {
      return res.json({ success: true, isOpen: false, slots: [] });
    }

    // Get all reservations for that date
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingReservations = await Reservation.find({
      restaurant: req.params.id,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] },
    });

    // Calculate seats booked per slot
    const bookedSeatsPerSlot = {};
    existingReservations.forEach((r) => {
      bookedSeatsPerSlot[r.timeSlot] = (bookedSeatsPerSlot[r.timeSlot] || 0) + r.guestCount;
    });

    // Build availability response
    const slotsWithAvailability = restaurant.slots.map((slot) => ({
      time: slot.time,
      totalSeats: slot.totalSeats,
      bookedSeats: bookedSeatsPerSlot[slot.time] || 0,
      availableSeats: slot.totalSeats - (bookedSeatsPerSlot[slot.time] || 0),
      isAvailable: slot.totalSeats - (bookedSeatsPerSlot[slot.time] || 0) > 0,
    }));

    res.json({
      success: true,
      isOpen: true,
      date,
      daySchedule,
      slots: slotsWithAvailability,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
