const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('d:/TNP MINI PRJ/resto/resto_frontend/hyderabad_restaurants_images.json', 'utf8')).restaurants;

// Construct full schema for seed.js
const seededData = raw.map(r => ({
  name: r.name,
  description: `Experience the finest ${r.cuisine} cuisine at ${r.name}, safely situated in the heart of Hyderabad. Our meticulously engineered menu caters to exquisite culinary cravings featuring authentic aesthetic ambiance.`,
  cuisine: [r.cuisine],
  address: {
    street: r.address.split(',')[0],
    city: "Hyderabad",
    state: "Telangana"
  },
  location: {
    type: "Point",
    coordinates: [r.longitude, r.latitude]
  },
  photos: r.images.map(img => ({ url: img.imageUrl, caption: img.imageType })),
  bookingFeePerGuest: 75,
  averageRating: Number((4 + Math.random()).toFixed(1)),
  totalReviews: Math.floor(Math.random() * 500) + 50,
  priceRange: "₹₹₹",
  menu: [],
  discount: { isActive: Math.random() > 0.5, type: 'percentage', value: 50 }
}));

fs.writeFileSync('d:/TNP MINI PRJ/resto/restaurants_generated.json', JSON.stringify(seededData, null, 2));

// Update frontend data.ts
const dataPath = 'd:/TNP MINI PRJ/resto/resto_frontend/src/app/data.ts';
let frontendData = fs.readFileSync(dataPath, 'utf8');

// The exported restaurants array usually starts like `export const restaurants = [`
// Let's replace everything after it or find the block.
const startIndex = frontendData.indexOf('export const restaurants = [');
if (startIndex !== -1) {
   // Assuming it ends at the end of the file or before another export
   const strSubset = frontendData.substring(0, startIndex);
   
   const mappedFrontend = raw.map(r => (`  {
    id: "${r.id}",
    name: "${r.name}",
    cuisine: ["${r.cuisine}"],
    rating: ${Number((4 + Math.random()).toFixed(1))},
    reviews: ${Math.floor(Math.random() * 500) + 50},
    priceRange: "₹₹₹",
    bookingFeePerGuest: 75,
    location: { type: "Point", coordinates: [${r.longitude}, ${r.latitude}] },
    address: { street: "${r.address.split(',')[0]}", city: "Hyderabad" },
    description: "Experience the finest ${r.cuisine} cuisine at ${r.name}, safely situated in the heart of Hyderabad. Our meticulously engineered menu caters to exquisite culinary cravings featuring authentic aesthetic ambiance.",
    photos: ${JSON.stringify(r.images.map(img => ({ url: img.imageUrl })))},
    image: "${r.images[0].imageUrl}"
  }`)).join(',\n');

   const newFrontend = strSubset + 'export const restaurants = [\n' + mappedFrontend + '\n];\n';
   fs.writeFileSync(dataPath, newFrontend);
} else {
   console.log('Could not find frontend block');
}

console.log('Successfully linked to backend and frontend arrays!');
