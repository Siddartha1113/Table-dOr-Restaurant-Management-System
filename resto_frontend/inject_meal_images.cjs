const fs = require('fs');

const mealImages = JSON.parse(fs.readFileSync('d:/TNP MINI PRJ/resto/resto_frontend/mealImages.json', 'utf8'));

// 1. Get raw
let raw = JSON.parse(fs.readFileSync('d:/TNP MINI PRJ/resto/resto_frontend/hyderabad_restaurants_images.json', 'utf8'));

// 2. Map new images
let ptr = 0;
raw.restaurants.forEach(r => {
    r.images = [
        { imageUrl: mealImages[ptr % mealImages.length], imageType: "food", source: "Verified Selection" },
        { imageUrl: mealImages[(ptr+1) % mealImages.length], imageType: "interior", source: "Verified Selection" }
    ];
    ptr += 2;
});

// Save it back to our JSON
fs.writeFileSync('d:/TNP MINI PRJ/resto/resto_frontend/hyderabad_restaurants_images.json', JSON.stringify(raw, null, 2));

console.log("Successfully rebuilt images map!");
