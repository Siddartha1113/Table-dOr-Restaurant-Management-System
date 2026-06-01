require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const User = require('./models/User');
const connectDB = require('./config/db');

const seedRestaurants = require('../restaurants_generated.json');

const seedData = async () => {
  try {
    await connectDB();
    await Restaurant.deleteMany();
    await User.deleteMany();
    
    // Create a default customer
    const customer = new User({
      name: 'Default Customer',
      email: 'customer@gmail.com',
      password: 'password123',
      role: 'customer'
    });
    await customer.save();

    // Assign owner to restaurants and save and add mock stats
    // Ensure every restaurant has operatingHours (11:30 - 22:30) and slots
    const defaultHours = [
      { day: 'monday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
      { day: 'tuesday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
      { day: 'wednesday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
      { day: 'thursday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
      { day: 'friday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
      { day: 'saturday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
      { day: 'sunday', isOpen: true, openTime: '11:30', closeTime: '22:30' }
    ];

    for (let r of seedRestaurants) {
      // Create a unique owner for each restaurant
      const emailPrefix = r.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const email = `${emailPrefix}@gmail.com`;
      
      let owner = await User.findOne({ email });
      if (!owner) {
        owner = new User({
          name: `${r.name.slice(0, 35)} Owner`,
          email: email,
          password: 'password123',
          role: 'owner'
        });
        await owner.save();
      }
      r.owner = owner._id;
      // normalize operating hours if missing
      if (!r.operatingHours || r.operatingHours.length === 0) {
        r.operatingHours = defaultHours;
      } else {
        // fill missing days with default hours
        const days = r.operatingHours.map((h) => h.day);
        for (const dh of defaultHours) {
          if (!days.includes(dh.day)) r.operatingHours.push(dh);
        }
      }

      // ensure at least some slots exist
      if (!r.slots || r.slots.length === 0) {
        const generatedSlots = [];
        for (let h = 11; h <= 23; h++) {
          for (let m of ['00', '15', '30', '45']) {
            if (h === 23 && m !== '00') continue;
            generatedSlots.push({ time: `${h.toString().padStart(2, '0')}:${m}`, totalSeats: Math.floor(10 + Math.random() * 15) });
          }
        }
        r.slots = generatedSlots;
      }
      // ensure menu has ~10 items; generate cuisine-appropriate extras when needed
      const templates = {
        italian: ['Bruschetta','Caprese Salad','Garlic Bread','Penne Alfredo','Pesto Pasta','Four Cheese Pizza','Calzone','Polenta','Gnocchi Sorrentina','Affogato'],
        indian: ['Samosa','Tandoori Chicken','Paneer Butter Masala','Dal Makhani','Rogan Josh','Aloo Gobi','Palak Paneer','Naan','Gulab Jamun','Raita'],
        chinese: ['Spring Rolls','Sweet Corn Soup','Chow Mein','Fried Rice','Manchurian','Kung Pao Chicken','Szechuan Tofu','Dumplings','Hot & Sour Soup','Honey Chicken'],
        japanese: ['Miso Soup','Edamame','Gyoza','Tempura','Sashimi','California Roll','Udon','Teriyaki Chicken','Green Tea Ice Cream','Yakitori'],
        mexican: ['Nachos','Quesadilla','Tacos','Guacamole','Chili Con Carne','Enchiladas','Burrito Bowl','Elote','Salsa Trio','Flan'],
        cafe: ['Flat White','Cappuccino','Latte','Espresso','Blueberry Muffin','Avocado Toast','Club Sandwich','Granola Bowl','Iced Tea','Cheesecake']
      };

      if (!Array.isArray(r.menu)) r.menu = [];
      const existingNames = new Set(r.menu.map((m) => (m.name || '').toLowerCase()));
      const cuisineKey = (Array.isArray(r.cuisine) ? r.cuisine[0] : r.cuisine || '').toString().toLowerCase();
      const pool = templates[cuisineKey] || Object.values(templates).flat();
      let i = 0;
      while (r.menu.length < 10 && i < pool.length) {
        const name = pool[i];
        if (!existingNames.has(name.toLowerCase())) {
          r.menu.push({ name, description: '', price: Math.floor(100 + Math.random() * 600), category: 'main' });
          existingNames.add(name.toLowerCase());
        }
        i++;
      }

      r.averageRating = parseFloat((Math.random() * (5.0 - 4.5) + 4.5).toFixed(1));
      r.totalReviews = Math.floor(Math.random() * 500) + 50;
      const created = await Restaurant.create(r);
    }

    console.log('✅ Seed Data Inserted Successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Data seeding failed:', err);
    process.exit(1);
  }
}

seedData();
