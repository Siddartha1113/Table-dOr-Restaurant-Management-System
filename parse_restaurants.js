const fs = require('fs');
const path = require('path');

const text = fs.readFileSync(path.join(__dirname, 'restaurants_data.txt'), 'utf8');

const lines = text.split('\n').filter(l => l.trim() !== '');

const parsed = [];
let currentCuisine = '';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('Cuisine')) {
    if (line.includes('Italian')) currentCuisine = 'Italian';
    else if (line.includes('Asian')) currentCuisine = 'Asian';
    else if (line.includes('Indian')) currentCuisine = 'Indian';
    else if (line.includes('Mexican')) currentCuisine = 'Mexican';
    continue;
  }
  
  if (line.match(/^\d+\./) && lines[i+1] && lines[i+1].startsWith('Top 10 Items:')) {
    const rawTitle = line.replace(/^\d+\.\s*/, '');
    const [name, address] = rawTitle.split(' | ');
    
    // basic lat lng distribution around hyderabad roughly
    const lat = 17.3850 + (Math.random() - 0.5) * 0.1;
    const lng = 78.4867 + (Math.random() - 0.5) * 0.1;

    const itemsStr = lines[i+1].replace('Top 10 Items: ', '').trim();
    const itemsRaw = itemsStr.split(/,\s*(?=[A-Za-z])/);

    const menu = itemsRaw.map(item => {
      let match = item.match(/(.+?)\s*\(₹([\d,]+)\)/);
      if(match) {
        return {
          name: match[1].trim(),
          description: '',
          price: parseInt(match[2].replace(',', '')),
          category: 'main'
        }
      }
      return null;
    }).filter(Boolean);

    // Some items might end with '.' so we strip it.
    menu.forEach(item => {
      if(item.name.endsWith('.')) {
        item.name = item.name.slice(0, -1);
      }
    });

    parsed.push({
      name: name.trim(),
      description: `Popular ${currentCuisine} restaurant located in ${address.trim()}.`,
      cuisine: [currentCuisine],
      address: { street: address.trim(), city: 'Hyderabad', state: 'Telangana', zipCode: '500000' },
      location: { type: 'Point', coordinates: [lng, lat] },
      photos: [],
      menu: menu,
      operatingHours: [],
      slots: [],
      priceRange: '₹₹'
    });
  }
}

fs.writeFileSync(path.join(__dirname, 'restaurants_generated.json'), JSON.stringify(parsed, null, 2));
console.log('Saved to restaurants_generated.json', parsed.length);
