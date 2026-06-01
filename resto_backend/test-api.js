const axios = require('axios');

async function test() {
  try {
    // 1. Register a test owner
    const regRes = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Owner Test',
      email: 'owner12345@test.com',
      password: 'password123',
      phone: '9876543210',
      role: 'owner'
    });
    
    console.log('Registered User:', regRes.data.success);
    const token = regRes.data.token;

    // 2. Create Restaurant
    const resRes = await axios.post('http://localhost:5000/api/owner/restaurant', {
      name: 'Test Kitchen',
      description: 'Test text',
      cuisine: ['Italian'],
      address: { street: 'Main St', city: 'Hyd', state: 'TS' },
      priceRange: '₹₹',
      totalTables: 10,
      slots: [{ time: '18:00', totalSeats: 20 }]
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Created Restaurant:', resRes.data.success);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}
test();
