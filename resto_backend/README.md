# 🍴 SeatSync — Restaurant Table Reservation System
## Backend API Documentation

---

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| File Uploads | Multer |
| Validation | express-validator |
| Deployment | Render (backend) + MongoDB Atlas |

---

## Project Structure
```
seatsync-backend/
├── config/
│   └── db.js                  # MongoDB connection
├── middleware/
│   ├── auth.js                # JWT protect + authorize + generateToken
│   ├── upload.js              # Multer file upload config
│   └── errorHandler.js        # Global error handler
├── models/
│   ├── User.js                # customer / owner roles
│   ├── Restaurant.js          # menu, photos, slots, hours, location
│   ├── Reservation.js         # slot-based bookings with payment
│   └── Review.js              # ratings with auto-update to restaurant
├── routes/
│   ├── auth.js                # register, login, profile
│   ├── restaurants.js         # search, filter, map, availability
│   ├── bookings.js            # create, view, cancel bookings
│   ├── payment.js             # initiate, confirm, receipt
│   ├── reviews.js             # CRUD reviews
│   └── owner.js               # owner dashboard, menu, photos, tables
├── uploads/                   # saved uploaded images/videos
├── server.js                  # entry point
├── package.json
└── .env.example
```

---

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Fill in your MONGO_URI, JWT_SECRET, GOOGLE_MAPS_API_KEY
```

### 3. Start dev server
```bash
npm run dev       # with nodemon (auto-reload)
npm start         # production
```

Server runs at: `http://localhost:5000`

---

## Authentication

All protected routes require a Bearer token in the header:
```
Authorization: Bearer <your_jwt_token>
```

Tokens are returned on `/api/auth/register` and `/api/auth/login`.

---

## API Endpoints

### 🔑 AUTH  `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Register as customer or owner |
| POST | `/login` | ❌ | Login, get JWT token |
| GET | `/me` | ✅ | Get current user profile |
| PUT | `/update-profile` | ✅ | Update name, phone, photo |
| PUT | `/change-password` | ✅ | Change password |

**Register Body:**
```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "password": "secret123",
  "role": "customer",        // "customer" or "owner"
  "phone": "+91-9999999999"
}
```

---

### 🍽️ RESTAURANTS  `/api/restaurants`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | ❌ | Search + filter restaurants |
| GET | `/nearby` | ❌ | Restaurants near lat/lng (map) |
| GET | `/recommendations` | ❌ | By weather + time of day |
| GET | `/cuisines` | ❌ | All distinct cuisine types |
| GET | `/:id` | ❌ | Full restaurant details |
| GET | `/:id/availability` | ❌ | Slot availability for a date |

**Search & Filter Query Params (`GET /`):**
```
?search=pizza           # text search
&cuisine=Indian,Italian # comma-separated
&priceRange=₹₹,₹₹₹
&minRating=4.0
&city=Hyderabad
&discount=true          # only discounted places
&sortBy=rating          # rating | price_low | price_high | newest
&page=1&limit=12
```

**Nearby Query Params (`GET /nearby`):**
```
?lat=17.3850&lng=78.4867&radius=5000   # radius in meters
```

**Recommendations Query Params:**
```
?weather=rainy&timeOfDay=dinner&city=Hyderabad
# weather: hot | cold | rainy | clear
# timeOfDay: breakfast | lunch | dinner
```

**Availability Query Params:**
```
?date=2025-12-25       # YYYY-MM-DD
```

---

### 📅 BOOKINGS  `/api/bookings`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/` | ✅ | customer | Create reservation |
| GET | `/my` | ✅ | customer | My bookings |
| GET | `/:id` | ✅ | any | Get single booking |
| PUT | `/:id/cancel` | ✅ | customer | Cancel booking |

**Create Booking Body:**
```json
{
  "restaurantId": "abc123",
  "date": "2025-12-25",
  "timeSlot": "19:00",
  "guestCount": 4,
  "specialRequests": "Window seat please"
}
```
> Booking fee = `guestCount x ₹75` by default (configurable per restaurant)

---

### 💳 PAYMENT  `/api/payment`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/initiate` | ✅ | Initiate payment for a booking |
| POST | `/confirm` | ✅ | Confirm / simulate payment success |
| GET | `/:reservationId/receipt` | ✅ | Get payment receipt |

**Initiate Body:**
```json
{
  "reservationId": "abc123",
  "method": "gpay"    // phonepe | gpay | upi | credit_card | debit_card
}
```

**Confirm Body:**
```json
{
  "reservationId": "abc123",
  "method": "gpay",
  "transactionId": "TXN-1234567-ABCXYZ"
}
```

---

### ⭐ REVIEWS  `/api/reviews`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/restaurant/:id` | ❌ | any | All reviews for a restaurant |
| POST | `/` | ✅ | customer | Submit a review |
| PUT | `/:id` | ✅ | customer | Edit own review |
| DELETE | `/:id` | ✅ | customer | Delete own review |

> Reviews auto-update `averageRating` and `totalReviews` on the Restaurant.  
> Verified reviews: linked to a confirmed reservation.

---

### 👑 OWNER DASHBOARD  `/api/owner`  *(owner role only)*

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/restaurant` | Create your restaurant |
| GET | `/restaurant` | Get your restaurant |
| PUT | `/restaurant` | Update restaurant info |
| POST | `/restaurant/photos` | Upload photos (multipart/form-data, field: `photos`) |
| DELETE | `/restaurant/photos/:photoId` | Delete a photo |
| POST | `/restaurant/menu` | Add menu item |
| PUT | `/restaurant/menu/:itemId` | Update menu item |
| DELETE | `/restaurant/menu/:itemId` | Delete menu item |
| GET | `/dashboard` | Table status + stats for today |
| GET | `/bookings` | All bookings (filter by status/date) |
| PUT | `/bookings/:id/status` | Update booking status |

**Dashboard Response includes:**
- Slot-by-slot table availability for today
- Total confirmed/pending bookings all time
- Total revenue from paid bookings
- Today's booking count with customer details

---

## Database Schemas

### User
```
name, email, password(hashed), role(customer|owner), phone,
profilePhoto, restaurant(ref), isActive, timestamps
```

### Restaurant
```
owner(ref), name, description, cuisine[], address, location(GeoJSON),
photos[], menu[], operatingHours[], slots[], priceRange(₹-₹₹₹),
bookingFeePerGuest, totalTables, discount{isActive,percentage,validUntil},
averageRating, totalReviews, tags[], isActive, timestamps
```

### Reservation
```
customer(ref), restaurant(ref), date, timeSlot, guestCount, totalAmount,
status(pending|confirmed|cancelled|completed|no_show),
specialRequests, payment{method,transactionId,status,paidAt},
cancellationReason, timestamps
```

### Review
```
customer(ref), restaurant(ref), reservation(ref), rating(1-5),
title, comment, photos[], likes, isVerified, timestamps
```

---

## Booking Flow

```
Customer searches → Filters → Views restaurant page 
→ Checks slot availability → Creates booking (status: pending)
→ Initiates payment (method selected)
→ Confirms payment → Booking (status: confirmed) 
→ "Thank you for booking!" screen
```

---

## Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

**Render environment variables needed:**
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
GOOGLE_MAPS_API_KEY=...
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
```
