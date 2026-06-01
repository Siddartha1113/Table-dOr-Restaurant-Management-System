import { BOOKING_FEE_PER_GUEST } from './currency';

export const defaultRestaurantImage =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80';

export const cuisineVideos = [
  {
    id: 1,
    name: 'Indian',
    tone: 'Tandoor smoke, dum biryani, rich gravies',
    image:
      'https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Italian',
    tone: 'Fresh pasta, pizza, quiet date-night tables',
    image:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Asian',
    tone: 'Sushi, ramen, wok-fired street plates',
    image:
      'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Mexican',
    tone: 'Tacos, burrito bowls, bright shared plates',
    image:
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80',
  },
];

export const cuisines = cuisineVideos;

const rawRestaurants = [
  {
    "name": "Tre Forni Restaurant and Bar",
    "description": "Popular Italian restaurant located in Park Hyatt, Road No. 2, Banjara Hills.",
    "cuisine": [
      "Italian"
    ],
    "address": {
      "street": "Park Hyatt, Road No. 2, Banjara Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4287,
        17.4265
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Margherita Pizza",
        "description": "",
        "price": 950,
        "category": "main"
      },
      {
        "name": "Spaghetti Carbonara",
        "description": "",
        "price": 1050,
        "category": "main"
      },
      {
        "name": "Mushroom Risotto",
        "description": "",
        "price": 1100,
        "category": "main"
      },
      {
        "name": "Lasagna Al Forno",
        "description": "",
        "price": 1200,
        "category": "main"
      },
      {
        "name": "Bruschetta Classica",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Ravioli Burro e Salvia",
        "description": "",
        "price": 1150,
        "category": "main"
      },
      {
        "name": "Minestrone Soup",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Tiramisu",
        "description": "",
        "price": 700,
        "category": "main"
      },
      {
        "name": "Panna Cotta",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Focaccia Bread",
        "description": "",
        "price": 400,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Little Italy",
    "description": "Popular Italian restaurant located in Aryan's Building, Road No. 92, Jubilee Hills.",
    "cuisine": [
      "Italian"
    ],
    "address": {
      "street": "Aryan's Building, Road No. 92, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4072,
        17.4326
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Pizza Napoli",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Pasta Barbaresca",
        "description": "",
        "price": 700,
        "category": "main"
      },
      {
        "name": "Garlic Bread with Cheese",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Nachos with Cheese Sauce",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Cannelloni Alla Siciliana",
        "description": "",
        "price": 720,
        "category": "main"
      },
      {
        "name": "Risotto Funghi",
        "description": "",
        "price": 690,
        "category": "main"
      },
      {
        "name": "Caesar Salad",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Chocolate Bomb",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Cream of Tomato Soup",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Gelato",
        "description": "",
        "price": 200,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Flying Spaghetti Monster",
    "description": "Popular Italian restaurant located in Road No. 46, Jubilee Hills.",
    "cuisine": [
      "Italian"
    ],
    "address": {
      "street": "Road No. 46, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4068,
        17.4332
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "The FSM Pizza",
        "description": "",
        "price": 800,
        "category": "main"
      },
      {
        "name": "Penne Arrabbiata",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Stuffed Mushroom Caps",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Chicken Piccata",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Aglio Olio Peperoncino",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Pesto Pasta",
        "description": "",
        "price": 680,
        "category": "main"
      },
      {
        "name": "Caprese Salad",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Blueberry Cheesecake",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Iced Peach Tea",
        "description": "",
        "price": 200,
        "category": "main"
      },
      {
        "name": "Tiramisu",
        "description": "",
        "price": 380,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Jonathan's Kitchen",
    "description": "Popular Italian restaurant located in Holiday Inn Express & Suites, Gachibowli.",
    "cuisine": [
      "Italian"
    ],
    "address": {
      "street": "Holiday Inn Express & Suites, Gachibowli",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.3615,
        17.4428
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/wurrux1468416624.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Pepperoni Pizza",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Fettuccine Alfredo",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Grilled Salmon",
        "description": "",
        "price": 1400,
        "category": "main"
      },
      {
        "name": "Cheese Platter",
        "description": "",
        "price": 950,
        "category": "main"
      },
      {
        "name": "Seafood Risotto",
        "description": "",
        "price": 900,
        "category": "main"
      },
      {
        "name": "Classic Caesar Salad",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Chicken Cacciatore",
        "description": "",
        "price": 800,
        "category": "main"
      },
      {
        "name": "Spaghetti Bolognese",
        "description": "",
        "price": 780,
        "category": "main"
      },
      {
        "name": "Chocolate Fondant",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Wild Mushroom Soup",
        "description": "",
        "price": 350,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Prego",
    "description": "Popular Italian restaurant located in The Westin, Mindspace, HITEC City.",
    "cuisine": [
      "Italian"
    ],
    "address": {
      "street": "The Westin, Mindspace, HITEC City",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.3811,
        17.4435
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/qwrtut1468418027.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/sxxpst1468569714.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Pizza Prosciutto e Funghi",
        "description": "",
        "price": 1100,
        "category": "main"
      },
      {
        "name": "Homemade Pappardelle",
        "description": "",
        "price": 1050,
        "category": "main"
      },
      {
        "name": "Gnocchi al Pesto",
        "description": "",
        "price": 950,
        "category": "main"
      },
      {
        "name": "Burrata Salad",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Grilled Lamb Chops",
        "description": "",
        "price": 1600,
        "category": "main"
      },
      {
        "name": "Seafood Linguine",
        "description": "",
        "price": 1200,
        "category": "main"
      },
      {
        "name": "Calamari Fritti",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Torta al Cioccolato",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Classic Tiramisu",
        "description": "",
        "price": 700,
        "category": "main"
      },
      {
        "name": "Minestrone",
        "description": "",
        "price": 500,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Tuscany",
    "description": "Popular Italian restaurant located in Trident Hotel, HITEC City.",
    "cuisine": [
      "Italian"
    ],
    "address": {
      "street": "Trident Hotel, HITEC City",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4312,
        17.429
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/qtwtss1468572261.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/qtqvys1468573168.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Quattro Formaggi Pizza",
        "description": "",
        "price": 1050,
        "category": "main"
      },
      {
        "name": "Lobster Ravioli",
        "description": "",
        "price": 1400,
        "category": "main"
      },
      {
        "name": "Ossobuco",
        "description": "",
        "price": 1500,
        "category": "main"
      },
      {
        "name": "Truffle Risotto",
        "description": "",
        "price": 1200,
        "category": "main"
      },
      {
        "name": "Prosciutto e Melone",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Baked Eggplant Parmigiana",
        "description": "",
        "price": 800,
        "category": "main"
      },
      {
        "name": "Spaghetti Vongole",
        "description": "",
        "price": 1100,
        "category": "main"
      },
      {
        "name": "Affogato",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Lemon Sorbet",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Zuppa di Pesce",
        "description": "",
        "price": 900,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Ruci & Idoni",
    "description": "Popular Italian restaurant located in Road No. 10, Banjara Hills.",
    "cuisine": [
      "Italian"
    ],
    "address": {
      "street": "Road No. 10, Banjara Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4485,
        17.4193
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/uwxqwy1483389553.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "BBQ Chicken Pizza",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Creamy Pesto Penne",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Stuffed Garlic Bread",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Jalapeno Cheese Poppers",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Grilled Chicken Breast",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Greek Salad",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Spinach and Ricotta Ravioli",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Choco Lava Cake",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Hazelnut Frappe",
        "description": "",
        "price": 220,
        "category": "main"
      },
      {
        "name": "Veg Cannelloni",
        "description": "",
        "price": 550,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Ci Gusta!",
    "description": "Popular Italian restaurant located in Ayyappa Society, Madhapur.",
    "cuisine": [
      "Italian"
    ],
    "address": {
      "street": "Ayyappa Society, Madhapur",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4032,
        17.444
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/vtxyxv1483567157.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/xrysxr1483568462.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Artisanal Gelato",
        "description": "",
        "price": 200,
        "category": "main"
      },
      {
        "name": "Wood-fired Margherita",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Chicken Alfredo Pasta",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Bruschetta Assortment",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Waffles with Nutella",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Crepes",
        "description": "",
        "price": 280,
        "category": "main"
      },
      {
        "name": "Cappuccino",
        "description": "",
        "price": 180,
        "category": "main"
      },
      {
        "name": "Pasta Primavera",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Chicken Panini",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Caesar Wrap",
        "description": "",
        "price": 350,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Cibo House",
    "description": "Popular Italian restaurant located in Indiranagar, Gachibowli.",
    "cuisine": [
      "Italian"
    ],
    "address": {
      "street": "Indiranagar, Gachibowli",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.3965,
        17.4402
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/vvusxs1483907034.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Cibo Special Meat Pizza",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Mac and Cheese",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Garlic Butter Prawns",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Chicken Stroganoff",
        "description": "",
        "price": 680,
        "category": "main"
      },
      {
        "name": "Veg Lasagna",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Cheesy Fries",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Mediterranean Salad",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Brownie with Ice Cream",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Virgin Mojito",
        "description": "",
        "price": 180,
        "category": "main"
      },
      {
        "name": "Grilled Basa Fish",
        "description": "",
        "price": 650,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Roastery Coffee House",
    "description": "Popular Italian restaurant located in Road No. 14, Banjara Hills.",
    "cuisine": [
      "Italian"
    ],
    "address": {
      "street": "Road No. 14, Banjara Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.423,
        17.419
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/xqwwpy1483908697.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/xrptpq1483909204.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Cheesy Garlic Bread",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Baked Macaroni & Cheese",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Roastery Special Pizza",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Peri Peri Chicken Pasta",
        "description": "",
        "price": 500,
        "category": "main"
      },
      {
        "name": "Onion Rings",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Cranberry Coffee",
        "description": "",
        "price": 280,
        "category": "main"
      },
      {
        "name": "Pesto Spaghetti",
        "description": "",
        "price": 480,
        "category": "main"
      },
      {
        "name": "Grilled Chicken Salad",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Chocolate Brownie Blend",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "English Breakfast Tea",
        "description": "",
        "price": 200,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Mekong",
    "description": "Popular Asian restaurant located in Marigold Hotel, Greenlands, Begumpet.",
    "cuisine": [
      "Asian"
    ],
    "address": {
      "street": "Marigold Hotel, Greenlands, Begumpet",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4445,
        17.4367
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/qxutws1486978099.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Peking Duck",
        "description": "",
        "price": 1800,
        "category": "main"
      },
      {
        "name": "Dim Sum Basket",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Pad Thai Noodles",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Tom Yum Soup",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Sushi Boat",
        "description": "",
        "price": 1500,
        "category": "main"
      },
      {
        "name": "Nasi Goreng",
        "description": "",
        "price": 800,
        "category": "main"
      },
      {
        "name": "Green Thai Curry",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Chili Basil Fish",
        "description": "",
        "price": 900,
        "category": "main"
      },
      {
        "name": "Jasmine Rice",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Matcha Cheesecake",
        "description": "",
        "price": 500,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Haiku",
    "description": "Popular Asian restaurant located in Road No. 36, Jubilee Hills.",
    "cuisine": [
      "Asian"
    ],
    "address": {
      "street": "Road No. 36, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4348,
        17.4208
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/urtwux1486983078.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Spicy Tuna Roll",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Prawn Tempura Uramaki",
        "description": "",
        "price": 900,
        "category": "main"
      },
      {
        "name": "Chicken Gyoza",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Miso Soup",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Chicken Katsu Curry",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Yaki Udon Noodles",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Edamame",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Salmon Sashimi",
        "description": "",
        "price": 1100,
        "category": "main"
      },
      {
        "name": "Pork Bao Bun",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Mochi Ice Cream",
        "description": "",
        "price": 400,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Hashi",
    "description": "Popular Asian restaurant located in Road No. 45, Jubilee Hills.",
    "cuisine": [
      "Asian"
    ],
    "address": {
      "street": "Road No. 45, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4075,
        17.43
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Philadelphia Roll",
        "description": "",
        "price": 800,
        "category": "main"
      },
      {
        "name": "Crispy Lotus Stem",
        "description": "",
        "price": 500,
        "category": "main"
      },
      {
        "name": "Dynamite Prawns",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Chicken Teriyaki Bowl",
        "description": "",
        "price": 800,
        "category": "main"
      },
      {
        "name": "Ramen with Chashu Pork",
        "description": "",
        "price": 900,
        "category": "main"
      },
      {
        "name": "Veg Spring Rolls",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Pan-fried Noodles",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Katsu Sando",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Matcha Bubble Tea",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Tempura Moriawase",
        "description": "",
        "price": 850,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Mamagoto",
    "description": "Popular Asian restaurant located in Sarath City Capital Mall, Kondapur.",
    "cuisine": [
      "Asian"
    ],
    "address": {
      "street": "Sarath City Capital Mall, Kondapur",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.3779,
        17.4407
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Hua Hin Highway Rolls",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Traditional Peking Dumpling",
        "description": "",
        "price": 480,
        "category": "main"
      },
      {
        "name": "Mamagoto Goreng",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Spicy Bangkok Bowl",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Chicken Three Pepper Bomb",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Water Chestnut Dumplings",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Panang Curry",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Basil Chicken Sticky Rice",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Caramel Sponge Cake",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Mint Lemonade",
        "description": "",
        "price": 250,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Zega",
    "description": "Popular Asian restaurant located in Sheraton Hyderabad Hotel, Gachibowli.",
    "cuisine": [
      "Asian"
    ],
    "address": {
      "street": "Sheraton Hyderabad Hotel, Gachibowli",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.3498,
        17.4156
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Assorted Nigiri",
        "description": "",
        "price": 1200,
        "category": "main"
      },
      {
        "name": "Truffle Edamame Dumplings",
        "description": "",
        "price": 800,
        "category": "main"
      },
      {
        "name": "Wok-tossed Black Pepper Beef",
        "description": "",
        "price": 1100,
        "category": "main"
      },
      {
        "name": "Som Tam Salad",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Laksa Soup",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Cantonese Roast Chicken",
        "description": "",
        "price": 950,
        "category": "main"
      },
      {
        "name": "Hibachi Fried Rice",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Wasabi Prawns",
        "description": "",
        "price": 950,
        "category": "main"
      },
      {
        "name": "Five-spice Chocolate Dome",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Szechuan Noodles",
        "description": "",
        "price": 700,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Holy Basil",
    "description": "Popular Asian restaurant located in Radisson Blu Plaza Hotel, Banjara Hills.",
    "cuisine": [
      "Asian"
    ],
    "address": {
      "street": "Radisson Blu Plaza Hotel, Banjara Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4482,
        17.4093
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/vvstvq1487342592.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Tom Kha Gai",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Sushi Platter",
        "description": "",
        "price": 1800,
        "category": "main"
      },
      {
        "name": "Kung Pao Chicken",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Mapo Tofu",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Sweet & Sour Pork",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Vietnamese Spring Rolls",
        "description": "",
        "price": 500,
        "category": "main"
      },
      {
        "name": "Massaman Curry",
        "description": "",
        "price": 800,
        "category": "main"
      },
      {
        "name": "Hakka Noodles",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Date Pancake",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Jasmine Tea",
        "description": "",
        "price": 250,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Chubby Cho",
    "description": "Popular Asian restaurant located in Road No. 45, Jubilee Hills.",
    "cuisine": [
      "Asian"
    ],
    "address": {
      "street": "Road No. 45, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4055,
        17.4323
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/wwuqvt1487345467.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/xrrwpx1487347049.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Bao Buns Assortment",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Dan Dan Noodles",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Honey Chilly Potato",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Prawn Crackers",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Korean Fried Chicken",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Thai Red Curry",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Glass Noodle Salad",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Chicken Sui Mai",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Darsaan with Vanilla Ice Cream",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Peach Iced Tea",
        "description": "",
        "price": 220,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Nanking",
    "description": "Popular Asian restaurant located in Park Lane, Secunderabad.",
    "cuisine": [
      "Asian"
    ],
    "address": {
      "street": "Park Lane, Secunderabad",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.502,
        17.4434
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/40r49m1763197022.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Golden Fried Prawns",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Chicken Manchurian",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Mixed Fried Rice",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Sweet Corn Chicken Soup",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Chilly Chicken",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "American Chopsuey",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Garlic Fish",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Veg Hakka Noodles",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Crispy Thread Paneer",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Lychee with Ice Cream",
        "description": "",
        "price": 200,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Mainland China",
    "description": "Popular Asian restaurant located in Inorbit Mall, Madhapur.",
    "cuisine": [
      "Asian"
    ],
    "address": {
      "street": "Inorbit Mall, Madhapur",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4447,
        17.4375
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/vwwspt1487394060.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Crackling Spinach",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Pan-fried Chilli Fish",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Chicken Taipei",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Mixed Meat Fried Rice",
        "description": "",
        "price": 500,
        "category": "main"
      },
      {
        "name": "Vegetable Dumplings",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Sliced Lamb in Oyster Sauce",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Lemon Coriander Soup",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Chilli Garlic Noodles",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Chocolate Rolls with Ice Cream",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Dim Sum Platter",
        "description": "",
        "price": 650,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Seven Sisters",
    "description": "Popular Asian restaurant located in Road No. 3, Banjara Hills.",
    "cuisine": [
      "Asian"
    ],
    "address": {
      "street": "Road No. 3, Banjara Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4392,
        17.4225
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/ysqrus1487425681.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/yqwtvu1487426027.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Naga Pork Curry",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Chicken Thukpa",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Bamboo Shoot Chicken",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Pork Momo",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Assamese Fish Curry",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Smoked Meat with Raja Mirchi",
        "description": "",
        "price": 700,
        "category": "main"
      },
      {
        "name": "Veg Kothey Dumplings",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Shilong Pork Noodles",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Rice Beer (Mocktail)",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Jaggery Pudding",
        "description": "",
        "price": 300,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Dum Pukht Begum's",
    "description": "Popular Indian restaurant located in ITC Kohenur, HITEC City.",
    "cuisine": [
      "Indian"
    ],
    "address": {
      "street": "ITC Kohenur, HITEC City",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4593,
        17.4335
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Dum Pukht Biryani",
        "description": "",
        "price": 1500,
        "category": "main"
      },
      {
        "name": "Kakori Kebab",
        "description": "",
        "price": 1200,
        "category": "main"
      },
      {
        "name": "Dal Dum Pukht",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Nihari Khaas",
        "description": "",
        "price": 1400,
        "category": "main"
      },
      {
        "name": "Murgh Chandi Tikka",
        "description": "",
        "price": 1100,
        "category": "main"
      },
      {
        "name": "Khamiri Roti",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Shahi Tukda",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Jhinga Dum Nisha",
        "description": "",
        "price": 1600,
        "category": "main"
      },
      {
        "name": "Mutton Rogan Josh",
        "description": "",
        "price": 1300,
        "category": "main"
      },
      {
        "name": "Guchchi Pulao",
        "description": "",
        "price": 1200,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Jewel of Nizam",
    "description": "Popular Indian restaurant located in The Minar, Golkonda Resort, Gandipet.",
    "cuisine": [
      "Indian"
    ],
    "address": {
      "street": "The Minar, Golkonda Resort, Gandipet",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.3262,
        17.378
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/rvypwy1503069308.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Barkas Patthar Ka Gosht",
        "description": "",
        "price": 1100,
        "category": "main"
      },
      {
        "name": "Hyderabadi Kacche Gosht ki Biryani",
        "description": "",
        "price": 1200,
        "category": "main"
      },
      {
        "name": "Haleem (Seasonal)",
        "description": "",
        "price": 950,
        "category": "main"
      },
      {
        "name": "Murgh Mutabbaq",
        "description": "",
        "price": 1050,
        "category": "main"
      },
      {
        "name": "Khubani Ka Meetha",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Double Ka Meetha",
        "description": "",
        "price": 500,
        "category": "main"
      },
      {
        "name": "Paneer Tikka",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Warqi Paratha",
        "description": "",
        "price": 200,
        "category": "main"
      },
      {
        "name": "Khatti Dal",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Nizami Handi",
        "description": "",
        "price": 900,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Paradise Biryani",
    "description": "Popular Indian restaurant located in Paradise Circle, Secunderabad.",
    "cuisine": [
      "Indian"
    ],
    "address": {
      "street": "Paradise Circle, Secunderabad",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4903,
        17.4399
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/ytuvwr1503070420.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Mutton Biryani",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Chicken Dum Biryani",
        "description": "",
        "price": 380,
        "category": "main"
      },
      {
        "name": "Chicken Tikka Kebab",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Apollo Fish",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Tandoori Chicken",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Mutton Kheema",
        "description": "",
        "price": 420,
        "category": "main"
      },
      {
        "name": "Butter Naan",
        "description": "",
        "price": 70,
        "category": "main"
      },
      {
        "name": "Paneer Butter Masala",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Qubani Ka Meetha",
        "description": "",
        "price": 150,
        "category": "main"
      },
      {
        "name": "Sweet Lassi",
        "description": "",
        "price": 100,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Bawarchi",
    "description": "Popular Indian restaurant located in RTC X Roads, Chikkadpally.",
    "cuisine": [
      "Indian"
    ],
    "address": {
      "street": "RTC X Roads, Chikkadpally",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4983,
        17.4057
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/uuqvwu1504629254.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Bawarchi Special Chicken Biryani",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Mutton Biryani",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Chicken 65",
        "description": "",
        "price": 280,
        "category": "main"
      },
      {
        "name": "Tandoori Roti",
        "description": "",
        "price": 40,
        "category": "main"
      },
      {
        "name": "Boti Kebab",
        "description": "",
        "price": 320,
        "category": "main"
      },
      {
        "name": "Mutton Curry",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Chicken Reshmi Kebab",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Veg Biryani",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Thums Up",
        "description": "",
        "price": 50,
        "category": "main"
      },
      {
        "name": "Fruit Salad",
        "description": "",
        "price": 120,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Krishnapatnam",
    "description": "Popular Indian restaurant located in Road No. 36, Jubilee Hills.",
    "cuisine": [
      "Indian"
    ],
    "address": {
      "street": "Road No. 36, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.3962,
        17.4408
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/tvttqv1504640475.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/qqwypw1504642429.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Royyala Vepudu (Prawn Fry)",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Guntur Kodi Kura",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Natu Kodi Pulao",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Nellore Chepala Pulusu",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "MLA Potlam Biryani",
        "description": "",
        "price": 700,
        "category": "main"
      },
      {
        "name": "Miriyala Rasam",
        "description": "",
        "price": 200,
        "category": "main"
      },
      {
        "name": "Kodi Roast",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Gutti Vankaya Kura",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Bagara Annam",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Junnu",
        "description": "",
        "price": 200,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "AnTeRa Kitchen & Bar",
    "description": "Popular Indian restaurant located in Road No. 10, Jubilee Hills.",
    "cuisine": [
      "Indian"
    ],
    "address": {
      "street": "Road No. 10, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.408,
        17.4338
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/ypxvwv1505333929.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "AnTeRa Special Mutton Ghee Roast",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Avakai Kodi Pulao",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Konaseema Royyala Vepudu",
        "description": "",
        "price": 700,
        "category": "main"
      },
      {
        "name": "Pachimirchi Kodi Kebab",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Gongura Mamsam",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Palnadu Chicken Curry",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Appam",
        "description": "",
        "price": 150,
        "category": "main"
      },
      {
        "name": "Kodi Chittigare",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Junnu",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Godavari Royyala Pulao",
        "description": "",
        "price": 750,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Spicy Venue",
    "description": "Popular Indian restaurant located in Road No. 10, Jubilee Hills.",
    "cuisine": [
      "Indian"
    ],
    "address": {
      "street": "Road No. 10, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.411,
        17.4328
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/qstyvs1505931190.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "MLA Potlam Biryani",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Apricot Delight",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Ulavacharu Chicken Pulao",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Chicken Raju Gari Pulao",
        "description": "",
        "price": 580,
        "category": "main"
      },
      {
        "name": "Royyala Iguru",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Kothimeera Kodi Vepudu",
        "description": "",
        "price": 500,
        "category": "main"
      },
      {
        "name": "Mamsam Vepudu",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Gutti Vankaya Koora",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Butter Naan",
        "description": "",
        "price": 80,
        "category": "main"
      },
      {
        "name": "Gongura Mutton",
        "description": "",
        "price": 600,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Chutneys",
    "description": "Popular Indian restaurant located in Road No. 3, Banjara Hills.",
    "cuisine": [
      "Indian"
    ],
    "address": {
      "street": "Road No. 3, Banjara Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4533,
        17.4277
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/xqrwyr1511133646.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/svprys1511176755.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Babai Idli",
        "description": "",
        "price": 150,
        "category": "main"
      },
      {
        "name": "Guntur Idli",
        "description": "",
        "price": 160,
        "category": "main"
      },
      {
        "name": "MLA Pesarattu",
        "description": "",
        "price": 220,
        "category": "main"
      },
      {
        "name": "South Indian Thali",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Masala Dosa",
        "description": "",
        "price": 180,
        "category": "main"
      },
      {
        "name": "Paneer Butter Masala",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Filter Coffee",
        "description": "",
        "price": 90,
        "category": "main"
      },
      {
        "name": "Vada",
        "description": "",
        "price": 140,
        "category": "main"
      },
      {
        "name": "Sweet Pongal",
        "description": "",
        "price": 120,
        "category": "main"
      },
      {
        "name": "Uttappam",
        "description": "",
        "price": 170,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Simply South",
    "description": "Popular Indian restaurant located in Film Nagar, Jubilee Hills.",
    "cuisine": [
      "Indian"
    ],
    "address": {
      "street": "Film Nagar, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.396,
        17.439
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Natu Kodi Pulusu",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Bagara Baingan",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Telangana Mamsam Koora",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Royyala Vepudu",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Kozhi Chettinad",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Appam",
        "description": "",
        "price": 120,
        "category": "main"
      },
      {
        "name": "Bisibelebath",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Neer Dosa",
        "description": "",
        "price": 150,
        "category": "main"
      },
      {
        "name": "Elaneer Payasam",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Andhra Thali",
        "description": "",
        "price": 450,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Ohri's Jiva Imperia",
    "description": "Popular Indian restaurant located in White House Building, Begumpet.",
    "cuisine": [
      "Indian"
    ],
    "address": {
      "street": "White House Building, Begumpet",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4552,
        17.4337
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/vvtvtr1511180578.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/qvrwpt1511181864.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Grand Veg Buffet",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Paneer Tikka Masala",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Dal Makhani",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Veg Jhalfrezi",
        "description": "",
        "price": 380,
        "category": "main"
      },
      {
        "name": "Hara Bhara Kebab",
        "description": "",
        "price": 320,
        "category": "main"
      },
      {
        "name": "Garlic Naan",
        "description": "",
        "price": 90,
        "category": "main"
      },
      {
        "name": "Veg Biryani",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Gulab Jamun",
        "description": "",
        "price": 150,
        "category": "main"
      },
      {
        "name": "Rasmalai",
        "description": "",
        "price": 180,
        "category": "main"
      },
      {
        "name": "Jal-Jeera",
        "description": "",
        "price": 120,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Chili's American Grill & Bar",
    "description": "Popular Mexican restaurant located in Inorbit Mall, Madhapur.",
    "cuisine": [
      "Mexican"
    ],
    "address": {
      "street": "Inorbit Mall, Madhapur",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.386,
        17.4334
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/rvtvuw1511190488.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Trio Fajitas",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Southwestern Eggrolls",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Bacon Ranch Chicken Quesadillas",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Loaded Boneless Wings",
        "description": "",
        "price": 580,
        "category": "main"
      },
      {
        "name": "Classic Nachos",
        "description": "",
        "price": 500,
        "category": "main"
      },
      {
        "name": "Spicy Smoked Chicken Burrito",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Crispy Chicken Tacos",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Skillet Chocolate Chip Cookie",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Chili's Classic Margaritas (Mocktail)",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Chipotle Chicken Fresh Mex Bowl",
        "description": "",
        "price": 650,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "California Burrito",
    "description": "Popular Mexican restaurant located in Divyashree Techridge, Manikonda.",
    "cuisine": [
      "Mexican"
    ],
    "address": {
      "street": "Divyashree Techridge, Manikonda",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.38,
        17.4422
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Chicken Crispy Taco",
        "description": "",
        "price": 180,
        "category": "main"
      },
      {
        "name": "BBQ Chicken Burrito",
        "description": "",
        "price": 320,
        "category": "main"
      },
      {
        "name": "Mexican Paneer Rice Bowl",
        "description": "",
        "price": 280,
        "category": "main"
      },
      {
        "name": "Cheese Quesadilla",
        "description": "",
        "price": 220,
        "category": "main"
      },
      {
        "name": "Loaded Chicken Nachos",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Guacamole Portion",
        "description": "",
        "price": 100,
        "category": "main"
      },
      {
        "name": "Churros with Chocolate Sauce",
        "description": "",
        "price": 150,
        "category": "main"
      },
      {
        "name": "Veg Snacker Burrito",
        "description": "",
        "price": 150,
        "category": "main"
      },
      {
        "name": "Jalapeno Cheese Poppers",
        "description": "",
        "price": 180,
        "category": "main"
      },
      {
        "name": "Peach Iced Tea",
        "description": "",
        "price": 120,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Taco Bell",
    "description": "Popular Mexican restaurant located in Next Galleria Mall, Punjagutta.",
    "cuisine": [
      "Mexican"
    ],
    "address": {
      "street": "Next Galleria Mall, Punjagutta",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.392,
        17.4312
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/yuwtuu1511295751.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Naked Chicken Taco",
        "description": "",
        "price": 220,
        "category": "main"
      },
      {
        "name": "Crunchy Veg Taco",
        "description": "",
        "price": 120,
        "category": "main"
      },
      {
        "name": "Chicken Quesadilla",
        "description": "",
        "price": 200,
        "category": "main"
      },
      {
        "name": "Cheesy Double Decker Taco",
        "description": "",
        "price": 180,
        "category": "main"
      },
      {
        "name": "Mexican Fries",
        "description": "",
        "price": 150,
        "category": "main"
      },
      {
        "name": "Loaded Nachos",
        "description": "",
        "price": 280,
        "category": "main"
      },
      {
        "name": "Cinnamon Twists",
        "description": "",
        "price": 80,
        "category": "main"
      },
      {
        "name": "Churros & Chocolate",
        "description": "",
        "price": 120,
        "category": "main"
      },
      {
        "name": "Chalupa Supreme",
        "description": "",
        "price": 190,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Churrolto",
    "description": "Popular Mexican restaurant located in Road No. 1, Film Nagar.",
    "cuisine": [
      "Mexican"
    ],
    "address": {
      "street": "Road No. 1, Film Nagar",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4235,
        17.414
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/ypuxtw1511297463.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Classic Churros with Dark Chocolate",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Pulled Chicken Tacos",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Mexican Spiced Fries",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Cheese & Jalapeno Quesadilla",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Veg Fajita Wrap",
        "description": "",
        "price": 420,
        "category": "main"
      },
      {
        "name": "Churro Sundae",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Nachos Grande",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Spicy Chicken Burrito Bowl",
        "description": "",
        "price": 480,
        "category": "main"
      },
      {
        "name": "Hot Chocolate",
        "description": "",
        "price": 280,
        "category": "main"
      },
      {
        "name": "Tres Leches",
        "description": "",
        "price": 350,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Nomad's Tacos",
    "description": "Popular Mexican restaurant located in Road No. 45, Jubilee Hills.",
    "cuisine": [
      "Mexican"
    ],
    "address": {
      "street": "Road No. 45, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.3945,
        17.4372
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/wxuvuv1511299147.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/vxuyrx1511302687.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Al Pastor Pork Tacos",
        "description": "",
        "price": 480,
        "category": "main"
      },
      {
        "name": "Baja Fish Tacos",
        "description": "",
        "price": 500,
        "category": "main"
      },
      {
        "name": "Carne Asada Tacos",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Chicken Tinga Quesadilla",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Veggie Bean Burrito",
        "description": "",
        "price": 380,
        "category": "main"
      },
      {
        "name": "Homemade Guacamole & Chips",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Mexican Street Corn / Elote",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Churros with Dulce de Leche",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Horchata",
        "description": "",
        "price": 200,
        "category": "main"
      },
      {
        "name": "Spicy Salsa Roja Bowl",
        "description": "",
        "price": 150,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "World of Tortillas",
    "description": "Popular Mexican restaurant located in Kokapet.",
    "cuisine": [
      "Mexican"
    ],
    "address": {
      "street": "Kokapet",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.3688,
        17.4465
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/wspuvp1511303478.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Classic Chicken Burrito",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Veggie Enchiladas",
        "description": "",
        "price": 420,
        "category": "main"
      },
      {
        "name": "Beef Barbacoa Tacos",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Loaded Tortilla Chips",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Sour Cream & Onion Quesadilla",
        "description": "",
        "price": 380,
        "category": "main"
      },
      {
        "name": "Mexican Lime Chicken Bowl",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Refried Bean Tacos",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Grilled Fajita Wrap",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Churro Bites",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Mexican Lemonade",
        "description": "",
        "price": 180,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Wrap It",
    "description": "Popular Mexican restaurant located in Shaikpet.",
    "cuisine": [
      "Mexican"
    ],
    "address": {
      "street": "Shaikpet",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.4002,
        17.432
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Spicy Mexican Chicken Wrap",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Veg Mex Roll",
        "description": "",
        "price": 200,
        "category": "main"
      },
      {
        "name": "Cheesy Jalapeno Wrap",
        "description": "",
        "price": 220,
        "category": "main"
      },
      {
        "name": "Chicken Tikka Taco (Fusion)",
        "description": "",
        "price": 200,
        "category": "main"
      },
      {
        "name": "BBQ Chicken Quesadilla",
        "description": "",
        "price": 280,
        "category": "main"
      },
      {
        "name": "Peri Peri Fries",
        "description": "",
        "price": 150,
        "category": "main"
      },
      {
        "name": "Cheese Corn Nuggets",
        "description": "",
        "price": 180,
        "category": "main"
      },
      {
        "name": "Paneer Fajita Wrap",
        "description": "",
        "price": 240,
        "category": "main"
      },
      {
        "name": "Mint Mojito",
        "description": "",
        "price": 120,
        "category": "main"
      },
      {
        "name": "Chocolate Brownie",
        "description": "",
        "price": 150,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Hard Rock Cafe",
    "description": "Popular Mexican restaurant located in GVK One Mall, Banjara Hills.",
    "cuisine": [
      "Mexican"
    ],
    "address": {
      "street": "GVK One Mall, Banjara Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.3962,
        17.4408
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Classic Fajitas",
        "description": "",
        "price": 850,
        "category": "main"
      },
      {
        "name": "Southwest Chicken Flatbread",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Tupelo Chicken Tenders",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Nachos Palooza",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "BBQ Pulled Pork Sandwich",
        "description": "",
        "price": 800,
        "category": "main"
      },
      {
        "name": "California Style Tacos",
        "description": "",
        "price": 700,
        "category": "main"
      },
      {
        "name": "Twisted Mac & Cheese",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Hot Fudge Brownie",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Strawberry Basil Lemonade",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Fiesta Burger",
        "description": "",
        "price": 850,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "By The Peepal",
    "description": "Popular Mexican restaurant located in Road No. 36, Jubilee Hills.",
    "cuisine": [
      "Mexican"
    ],
    "address": {
      "street": "Road No. 36, Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.406,
        17.4265
      ]
    },
    "photos": [
      {
        "url": "https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg",
        "caption": "food"
      },
      {
        "url": "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg",
        "caption": "interior"
      }
    ],
    "menu": [
      {
        "name": "Mexican Chicken Sizzler",
        "description": "",
        "price": 750,
        "category": "main"
      },
      {
        "name": "Loaded Veggie Nachos",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Chicken Quesadilla",
        "description": "",
        "price": 500,
        "category": "main"
      },
      {
        "name": "Spicy Salsa & Chips",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Mexican Rice Bowl",
        "description": "",
        "price": 480,
        "category": "main"
      },
      {
        "name": "Jalapeno Poppers",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Chicken Enchiladas",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Cheesy Bean Tacos",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Virgin Margarita",
        "description": "",
        "price": 250,
        "category": "main"
      },
      {
        "name": "Churros",
        "description": "",
        "price": 300,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  },
  {
    "name": "Habanero (Note: Representative of classic Habanero-style Tex-Mex menus popular in the city)",
    "description": "Popular Mexican restaurant located in Phoenix Tower, HITEC City.",
    "cuisine": [
      "Mexican"
    ],
    "address": {
      "street": "Phoenix Tower, HITEC City",
      "city": "Hyderabad",
      "state": "Telangana",
      "zipCode": "500000"
    },
    "location": {
      "type": "Point",
      "coordinates": [
        78.48474749754911,
        17.34484882118833
      ]
    },
    "photos": [
      {
        "url": "https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    "menu": [
      {
        "name": "Black Bean Hummus & Nachos",
        "description": "",
        "price": 350,
        "category": "main"
      },
      {
        "name": "Sesame Lime Shrimp Tostada",
        "description": "",
        "price": 550,
        "category": "main"
      },
      {
        "name": "Grilled Chipotle Skewers",
        "description": "",
        "price": 450,
        "category": "main"
      },
      {
        "name": "Fajita Salad",
        "description": "",
        "price": 400,
        "category": "main"
      },
      {
        "name": "Summer Veggie Pizza",
        "description": "",
        "price": 500,
        "category": "main"
      },
      {
        "name": "Chicken Chimichanga",
        "description": "",
        "price": 600,
        "category": "main"
      },
      {
        "name": "Beef Burrito Grande",
        "description": "",
        "price": 650,
        "category": "main"
      },
      {
        "name": "Peri Peri Fish",
        "description": "",
        "price": 700,
        "category": "main"
      },
      {
        "name": "Fried Ice Cream",
        "description": "",
        "price": 300,
        "category": "main"
      },
      {
        "name": "Tres Leches Cake",
        "description": "",
        "price": 350,
        "category": "main"
      }
    ],
    "operatingHours": [],
    "slots": [],
    "priceRange": "₹₹"
  }
];

export const restaurants = rawRestaurants.map((r, i) => ({
  ...r,
  id: `demo-resto-${i + 1}`,
  _id: `demo-resto-${i + 1}`
}));

export const mockTables = [
  { id: 'T1', capacity: 2, status: 'available' },
  { id: 'T2', capacity: 2, status: 'occupied' },
  { id: 'T3', capacity: 4, status: 'available' },
  { id: 'T4', capacity: 4, status: 'reserved' },
  { id: 'T5', capacity: 6, status: 'available' },
  { id: 'T6', capacity: 8, status: 'available' },
  { id: 'T7', capacity: 4, status: 'available' },
  { id: 'T8', capacity: 2, status: 'reserved' },
];

export const availableTimes = [
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
];
