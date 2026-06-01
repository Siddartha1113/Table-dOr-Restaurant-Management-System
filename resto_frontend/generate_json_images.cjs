const fs = require('fs');

const italianImages = [
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1498579150354-9794751d90ba?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1621996311210-66e3bebf0f94?auto=format&fit=crop&w=900&q=80"
];

const asianImages = [
  "https://images.unsplash.com/photo-1553163147-622ab57ecd16?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1626804475297-4160aece06eb?auto=format&fit=crop&w=900&q=80"
];

const indianImages = [
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=80"
];

const mexicanImages = [
  "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1584345604476-8c8e3ed3e2bf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=80"
];

const restaurants = [
    { "name": "Tre Forni Restaurant and Bar", "cuisine": "Italian", "latitude": 17.4265, "longitude": 78.4287, "address": "Park Hyatt, Road No. 2, Banjara Hills, Hyderabad, Telangana" },
    { "name": "Little Italy", "cuisine": "Italian", "latitude": 17.4326, "longitude": 78.4072, "address": "Road No. 92, Jubilee Hills, Hyderabad, Telangana" },
    { "name": "Flying Spaghetti Monster", "cuisine": "Italian", "latitude": 17.4332, "longitude": 78.4068, "address": "Road No. 46, Jubilee Hills, Hyderabad, Telangana" },
    { "name": "Jonathan's Kitchen", "cuisine": "Italian", "latitude": 17.4428, "longitude": 78.3615, "address": "Holiday Inn Express, Gachibowli, Hyderabad, Telangana" },
    { "name": "Prego", "cuisine": "Italian", "latitude": 17.4435, "longitude": 78.3811, "address": "The Westin, Mindspace IT Park, HITEC City, Hyderabad, Telangana" },
    { "name": "Tuscany", "cuisine": "Italian", "latitude": 17.4290, "longitude": 78.4312, "address": "Trident Hyderabad, HITEC City, Hyderabad, Telangana" },
    { "name": "Ruci & Idoni", "cuisine": "Italian", "latitude": 17.4193, "longitude": 78.4485, "address": "Road No. 1, Banjara Hills, Hyderabad, Telangana" },
    { "name": "Ci Gusta!", "cuisine": "Italian", "latitude": 17.4440, "longitude": 78.4032, "address": "Road No. 64, Jubilee Hills, Hyderabad, Telangana" },
    { "name": "Cibo House", "cuisine": "Italian", "latitude": 17.4402, "longitude": 78.3965, "address": "Inorbit Mall Road, HITEC City, Hyderabad, Telangana" },
    { "name": "Roastery Coffee House", "cuisine": "Italian", "latitude": 17.4190, "longitude": 78.4230, "address": "Road No. 14, Banjara Hills, Hyderabad, Telangana" },

    { "name": "Mekong", "cuisine": "Asian", "latitude": 17.4367, "longitude": 78.4445, "address": "Marigold Hotel, Greenlands, Ameerpet, Hyderabad, Telangana" },
    { "name": "Haiku", "cuisine": "Asian", "latitude": 17.4208, "longitude": 78.4348, "address": "Road No. 12, Banjara Hills, Hyderabad, Telangana" },
    { "name": "Hashi", "cuisine": "Asian", "latitude": 17.4300, "longitude": 78.4075, "address": "Road No. 36, Jubilee Hills, Hyderabad, Telangana" },
    { "name": "Mamagoto", "cuisine": "Asian", "latitude": 17.4407, "longitude": 78.3779, "address": "Kondapur Main Road, Hyderabad, Telangana" },
    { "name": "Zega", "cuisine": "Asian", "latitude": 17.4156, "longitude": 78.3498, "address": "Sheraton Hyderabad, Gachibowli, Hyderabad, Telangana" },
    { "name": "Holy Basil", "cuisine": "Asian", "latitude": 17.4093, "longitude": 78.4482, "address": "Radisson Blu, Banjara Hills, Hyderabad, Telangana" },
    { "name": "Chubby Cho", "cuisine": "Asian", "latitude": 17.4323, "longitude": 78.4055, "address": "Road No. 45, Jubilee Hills, Hyderabad, Telangana" },
    { "name": "Nanking", "cuisine": "Asian", "latitude": 17.4434, "longitude": 78.5020, "address": "Park Lane, Secunderabad, Hyderabad, Telangana" },
    { "name": "Mainland China", "cuisine": "Asian", "latitude": 17.4375, "longitude": 78.4447, "address": "Begumpet Next to Lifestyle, Hyderabad, Telangana" },
    { "name": "Seven Sisters", "cuisine": "Asian", "latitude": 17.4225, "longitude": 78.4392, "address": "Road No. 1, Banjara Hills, Hyderabad, Telangana" },

    { "name": "Dum Pukht Begum's", "cuisine": "Indian", "latitude": 17.4335, "longitude": 78.4593, "address": "ITC Kakatiya, Begumpet, Hyderabad, Telangana" },
    { "name": "Jewel of Nizam", "cuisine": "Indian", "latitude": 17.3780, "longitude": 78.3262, "address": "The Minar, Golkonda Resort, Gandipet, Hyderabad, Telangana" },
    { "name": "Paradise Biryani", "cuisine": "Indian", "latitude": 17.4399, "longitude": 78.4903, "address": "SD Road, Secunderabad, Hyderabad, Telangana" },
    { "name": "Bawarchi", "cuisine": "Indian", "latitude": 17.4057, "longitude": 78.4983, "address": "RTC X Roads, Hyderabad, Telangana" },
    { "name": "Krishnapatnam", "cuisine": "Indian", "latitude": 17.4408, "longitude": 78.3962, "address": "Salarpuria Sattva Knowledge City, HITEC City, Hyderabad, Telangana" },
    { "name": "AnTeRa Kitchen & Bar", "cuisine": "Indian", "latitude": 17.4338, "longitude": 78.4080, "address": "Road No. 10, Jubilee Hills, Hyderabad, Telangana" },
    { "name": "Spicy Venue", "cuisine": "Indian", "latitude": 17.4328, "longitude": 78.4110, "address": "Road No. 36, Jubilee Hills, Hyderabad, Telangana" },
    { "name": "Chutneys", "cuisine": "Indian", "latitude": 17.4277, "longitude": 78.4533, "address": "Raj Bhavan Road, Somajiguda, Hyderabad, Telangana" },
    { "name": "Simply South", "cuisine": "Indian", "latitude": 17.4390, "longitude": 78.3960, "address": "Film Nagar, Jubilee Hills, Hyderabad, Telangana" },
    { "name": "Ohri's Jiva Imperia", "cuisine": "Indian", "latitude": 17.4337, "longitude": 78.4552, "address": "White House Building, Begumpet, Hyderabad, Telangana" },

    { "name": "Chili's American Grill & Bar", "cuisine": "Mexican", "latitude": 17.4334, "longitude": 78.3860, "address": "Inorbit Mall, HITEC City, Hyderabad, Telangana" },
    { "name": "California Burrito", "cuisine": "Mexican", "latitude": 17.4422, "longitude": 78.3800, "address": "Mindspace, HITEC City, Hyderabad, Telangana" },
    { "name": "Taco Bell", "cuisine": "Mexican", "latitude": 17.4312, "longitude": 78.3920, "address": "Sarath City Capital Mall, Kondapur, Hyderabad, Telangana" },
    { "name": "Churrolto", "cuisine": "Mexican", "latitude": 17.4140, "longitude": 78.4235, "address": "Road No. 8, Banjara Hills, Hyderabad, Telangana" },
    { "name": "Nomad's Tacos", "cuisine": "Mexican", "latitude": 17.4372, "longitude": 78.3945, "address": "Madhapur, Hyderabad, Telangana" },
    { "name": "World of Tortillas", "cuisine": "Mexican", "latitude": 17.4465, "longitude": 78.3688, "address": "Gachibowli, Hyderabad, Telangana" },
    { "name": "Wrap It", "cuisine": "Mexican", "latitude": 17.4320, "longitude": 78.4002, "address": "Jubilee Hills, Hyderabad, Telangana" },
    { "name": "Hard Rock Cafe", "cuisine": "Mexican", "latitude": 17.4408, "longitude": 78.3962, "address": "Salarpuria Sattva Knowledge City, HITEC City, Hyderabad, Telangana" },
    { "name": "By The Peepal", "cuisine": "Mexican", "latitude": 17.4265, "longitude": 78.4060, "address": "Road No. 36, Jubilee Hills, Hyderabad, Telangana" },
    { "name": "Habanero", "cuisine": "Mexican", "latitude": 17.4452, "longitude": 78.3892, "address": "Hitech City Main Road, Hyderabad, Telangana" }
];

const result = {
    restaurants: restaurants.map((r, i) => {
        let imgs = [];
        if (r.cuisine === 'Italian') imgs = italianImages;
        if (r.cuisine === 'Asian') imgs = asianImages;
        if (r.cuisine === 'Indian') imgs = indianImages;
        if (r.cuisine === 'Mexican') imgs = mexicanImages;
        
        return {
            id: i + 1,
            name: r.name,
            cuisine: r.cuisine,
            latitude: r.latitude,
            longitude: r.longitude,
            address: r.address,
            images: [
                {
                    imageUrl: imgs[i % imgs.length],
                    imageType: "food",
                    source: "Unsplash Verified"
                },
                {
                    imageUrl: imgs[(i + 1) % imgs.length],
                    imageType: "interior",
                    source: "Unsplash Verified"
                }
            ]
        };
    })
};

fs.writeFileSync('d:/TNP MINI PRJ/resto/resto_frontend/hyderabad_restaurants_images.json', JSON.stringify(result, null, 2));
console.log('Saved to hyderabad_restaurants_images.json');
