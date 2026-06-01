const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'restaurants_generated.json');
const restaurants = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const imagesByCuisine = {
  Italian: [
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=1200&q=80',
  ],
  Indian: [
    'https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  ],
  Asian: [
    'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=1200&q=80',
  ],
  Mexican: [
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=1200&q=80',
  ]
};

restaurants.forEach(r => {
  const cuisine = r.cuisine[0];
  const pool = imagesByCuisine[cuisine] || imagesByCuisine.Indian;
  const url = pool[Math.floor(Math.random() * pool.length)];
  r.photos = [{ url }];
});

fs.writeFileSync(dataFile, JSON.stringify(restaurants, null, 2));

// Update frontend data.ts too
const dataTsPath = path.join(__dirname, 'resto_frontend', 'src', 'app', 'data.ts');
let dataTs = fs.readFileSync(dataTsPath, 'utf8');

// Replace everything from `export const restaurants = [` to `];\n\nexport const mockTables`
const newRestaurantsCode = `export const restaurants = ${JSON.stringify(restaurants, null, 2)};`;

const regex = /export const restaurants = \[[\s\S]*?\];\n*(?=export const mockTables)/;
if (regex.test(dataTs)) {
  dataTs = dataTs.replace(regex, newRestaurantsCode + '\n\n');
  fs.writeFileSync(dataTsPath, dataTs);
  console.log('Updated data.ts');
} else {
  console.log('Could not replace in data.ts');
}
