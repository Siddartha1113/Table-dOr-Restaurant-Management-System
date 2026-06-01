const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');

// All owner routes require auth + owner role
router.use(protect, authorize('owner'));

// ─────────────────────────────────────────
// POST /api/owner/restaurant
// Create owner's restaurant (once per owner)
// ─────────────────────────────────────────
router.post('/restaurant', async (req, res) => {
  try {
    const existing = await Restaurant.findOne({ owner: req.user._id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You already have a restaurant. Use PUT to update it.',
      });
    }

    const {
      name, description, cuisine, address, location,
      priceRange, totalTables, operatingHours, slots, tags,
    } = req.body;

    const restaurant = await Restaurant.create({
      owner: req.user._id,
      name, description, cuisine, address,
      location: location || { type: 'Point', coordinates: [0, 0] },
      priceRange, totalTables, operatingHours, slots, tags,
    });

    // Link restaurant to owner's user document
    await User.findByIdAndUpdate(req.user._id, { restaurant: restaurant._id });

    res.status(201).json({ success: true, message: 'Restaurant created!', restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/owner/restaurant
// Get owner's restaurant details
// ─────────────────────────────────────────
router.get('/restaurant', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'No restaurant found. Please create one first.' });
    }
    res.json({ success: true, restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/owner/restaurant
// Update restaurant info
// ─────────────────────────────────────────
router.put('/restaurant', async (req, res) => {
  try {
    const allowed = [
      'name', 'description', 'cuisine', 'address', 'location',
      'priceRange', 'totalTables', 'operatingHours', 'slots', 'tags', 'discount',
    ];
    const updates = {};
    allowed.forEach((field) => { if (req.body[field] !== undefined) updates[field] = req.body[field]; });

    const restaurant = await Restaurant.findOneAndUpdate(
      { owner: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    res.json({ success: true, message: 'Restaurant updated.', restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// POST /api/owner/restaurant/photos
// Upload restaurant photos (up to 10 at once)
// ─────────────────────────────────────────
router.post('/restaurant/photos', upload.array('photos', 10), async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No photos uploaded.' });
    }

    const newPhotos = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      caption: req.body.caption || '',
    }));

    restaurant.photos.push(...newPhotos);
    await restaurant.save();

    res.json({
      success: true,
      message: `${req.files.length} photo(s) uploaded.`,
      photos: newPhotos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// DELETE /api/owner/restaurant/photos/:photoId
// Delete a restaurant photo
// ─────────────────────────────────────────
router.delete('/restaurant/photos/:photoId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    restaurant.photos = restaurant.photos.filter(
      (p) => p._id.toString() !== req.params.photoId
    );
    await restaurant.save();

    res.json({ success: true, message: 'Photo deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/owner/restaurant/photos/:photoId/primary
// Set a restaurant photo as the primary profile photo (moves to index 0)
// ─────────────────────────────────────────
router.put('/restaurant/photos/:photoId/primary', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    const photoIndex = restaurant.photos.findIndex(p => p._id.toString() === req.params.photoId);
    if (photoIndex === -1) return res.status(404).json({ success: false, message: 'Photo not found.' });

    if (photoIndex > 0) {
      const [photo] = restaurant.photos.splice(photoIndex, 1);
      restaurant.photos.unshift(photo);
      restaurant.markModified('photos');
      await restaurant.save();
    }

    res.json({ success: true, message: 'Profile photo updated.', photos: restaurant.photos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// POST /api/owner/restaurant/logo-url
// Set the logo using a URL string direct paste
// ─────────────────────────────────────────
router.post('/restaurant/logo-url', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });
    if (!req.body.url) return res.status(400).json({ success: false, message: 'No URL provided' });

    // Unshift the direct URL to the photos array (making it the primary photo)
    restaurant.photos.unshift({ url: req.body.url, caption: 'Profile Logo' });
    restaurant.markModified('photos');
    await restaurant.save();

    res.json({ success: true, message: 'Logo successfully applied.', photos: restaurant.photos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// ─────────────────────────────────────────
// POST /api/owner/restaurant/menu
// Add a menu item
// ─────────────────────────────────────────
router.post('/restaurant/menu', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    const { name, description, price, category, isVeg, image } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ success: false, message: 'name and price are required.' });
    }

    restaurant.menu.push({ name, description, price, category, isVeg, image });
    await restaurant.save();

    const addedItem = restaurant.menu[restaurant.menu.length - 1];
    res.status(201).json({ success: true, message: 'Menu item added.', item: addedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/owner/restaurant/menu/:itemId
// Update a menu item
// ─────────────────────────────────────────
router.put('/restaurant/menu/:itemId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    const item = restaurant.menu.id(req.params.itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Menu item not found.' });

    const { name, description, price, category, isVeg, image, isAvailable } = req.body;
    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = price;
    if (category !== undefined) item.category = category;
    if (isVeg !== undefined) item.isVeg = isVeg;
    if (image !== undefined) item.image = image;
    if (isAvailable !== undefined) item.isAvailable = isAvailable;

    await restaurant.save();
    res.json({ success: true, message: 'Menu item updated.', item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// POST /api/owner/restaurant/menu/:itemId/image
// Upload an image for a specific menu item
// ─────────────────────────────────────────
router.post('/restaurant/menu/:itemId/image', upload.single('image'), async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    const item = restaurant.menu.id(req.params.itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Menu item not found.' });

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded.' });
    }

    item.image = `/uploads/${req.file.filename}`;
    await restaurant.save();

    res.json({ success: true, message: 'Menu item image uploaded.', item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// DELETE /api/owner/restaurant/menu/:itemId
// Delete a menu item
// ─────────────────────────────────────────
router.delete('/restaurant/menu/:itemId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    restaurant.menu = restaurant.menu.filter((item) => item._id.toString() !== req.params.itemId);
    await restaurant.save();

    res.json({ success: true, message: 'Menu item deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/owner/dashboard
// Owner dashboard: table status for today
// ─────────────────────────────────────────
router.get('/dashboard', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id }).select(
      'name totalTables slots operatingHours'
    );
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Today's reservations
    const todayReservations = await Reservation.find({
      restaurant: restaurant._id,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed'] },
    }).populate('customer', 'name phone');

    // Slot-wise table status
    const slotStatus = restaurant.slots.map((slot) => {
      const slotBookings = todayReservations.filter((r) => r.timeSlot === slot.time);
      const bookedSeats = slotBookings.reduce((sum, r) => sum + r.guestCount, 0);
      return {
        time: slot.time,
        totalSeats: slot.totalSeats,
        bookedSeats,
        availableSeats: slot.totalSeats - bookedSeats,
        bookings: slotBookings,
      };
    });

    // Stats
    const totalConfirmed = await Reservation.countDocuments({
      restaurant: restaurant._id,
      status: 'confirmed',
    });
    const totalPending = await Reservation.countDocuments({
      restaurant: restaurant._id,
      status: 'pending',
    });
    const totalRevenue = await Reservation.aggregate([
      { $match: { restaurant: restaurant._id, 'payment.status': 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const recentBookings = todayReservations.map(r => ({
      id: r._id.toString().substring(16).toUpperCase(),
      name: r.customer ? r.customer.name : 'Unknown',
      time: r.timeSlot,
      guests: r.guestCount,
      status: r.status.charAt(0).toUpperCase() + r.status.slice(1)
    }));

    res.json({
      success: true,
      dashboard: {
        restaurantName: restaurant.name,
        today: new Date().toDateString(),
        slotStatus,
        recentBookings,
        stats: {
          totalConfirmedAllTime: totalConfirmed,
          totalPendingAllTime: totalPending,
          totalRevenue: totalRevenue[0]?.total || 0,
          todayBookings: todayReservations.length,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// GET /api/owner/bookings
// Get all bookings for owner's restaurant
// ─────────────────────────────────────────
router.get('/bookings', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    const { status, date, page = 1, limit = 20 } = req.query;
    const filter = { restaurant: restaurant._id };

    if (status) filter.status = status;
    if (date) {
      const d = new Date(date);
      filter.date = { $gte: new Date(d.setHours(0,0,0,0)), $lte: new Date(d.setHours(23,59,59,999)) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Reservation.countDocuments(filter);

    const bookings = await Reservation.find(filter)
      .populate('customer', 'name email phone')
      .sort({ date: 1, timeSlot: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ success: true, total, page: parseInt(page), bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/owner/bookings/:id/status
// Update booking status (confirm, complete, no_show)
// ─────────────────────────────────────────
router.put('/bookings/:id/status', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found.' });

    const { status } = req.body;
    const allowed = ['confirmed', 'completed', 'no_show', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${allowed.join(', ')}` });
    }

    const booking = await Reservation.findOneAndUpdate(
      { _id: req.params.id, restaurant: restaurant._id },
      { status },
      { new: true }
    ).populate('customer', 'name email');

    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
    res.json({ success: true, message: `Booking marked as ${status}.`, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
