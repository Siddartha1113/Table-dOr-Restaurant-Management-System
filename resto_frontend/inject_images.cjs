const fs = require('fs');

const imagesJson = JSON.parse(fs.readFileSync('d:/TNP MINI PRJ/resto/resto_frontend/hyderabad_restaurants_images.json', 'utf8')).restaurants;

// 1. Update frontend data.ts
const dataPath = 'd:/TNP MINI PRJ/resto/resto_frontend/src/app/data.ts';
let frontendData = fs.readFileSync(dataPath, 'utf8');

// Find const rawRestaurants = [ ... ];
const startIdx = frontendData.indexOf('const rawRestaurants = [');
if (startIdx !== -1) {
  const endMarker = '];\n\nexport const restaurants';
  let endIdx = frontendData.indexOf(endMarker, startIdx);
  if (endIdx !== -1) {
    let arrayContent = frontendData.substring(startIdx + 'const rawRestaurants = '.length, endIdx + 1);
    let parsedArr = JSON.parse(arrayContent);

    // Merge images into parsedArr
    parsedArr.forEach(r => {
       const mapped = imagesJson.find(i => i.name === r.name);
       if (mapped) {
           r.photos = mapped.images.map(img => ({ url: img.imageUrl, caption: img.imageType }));
           // Replace the default location coordinates directly too
           r.location = {
               type: "Point",
               coordinates: [mapped.longitude, mapped.latitude]
           };
       }
    });

    const newFront = frontendData.substring(0, startIdx + 'const rawRestaurants = '.length) 
        + JSON.stringify(parsedArr, null, 2) 
        + frontendData.substring(endIdx + 1);
    
    fs.writeFileSync(dataPath, newFront);
  }
}

// 2. Update backend restaurants_generated.json
const backendDataPath = 'd:/TNP MINI PRJ/resto/restaurants_generated.json';
if (fs.existsSync(backendDataPath)) {
    let backendArr = JSON.parse(fs.readFileSync(backendDataPath, 'utf8'));
    backendArr.forEach(r => {
        const mapped = imagesJson.find(i => i.name === r.name);
        if (mapped) {
            r.photos = mapped.images.map(img => ({ url: img.imageUrl, caption: img.imageType }));
            r.location = {
               type: "Point",
               coordinates: [mapped.longitude, mapped.latitude]
            };
        }
    });
    fs.writeFileSync(backendDataPath, JSON.stringify(backendArr, null, 2));
}

console.log('Injected high-res photos and distinct locations successfully!');
