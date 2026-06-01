import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  CalendarCheck,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  Play,
  Search,
  Sparkles,
  Star,
  Utensils,
} from 'lucide-react';
import { motion } from 'motion/react';
import api from '../../api';
import { BOOKING_FEE_PER_GUEST, formatRupees, priceTierLabel, rupeeTier } from '../currency';
import { cuisineVideos, defaultRestaurantImage, restaurants as fallbackRestaurants } from '../data';

type RestaurantCard = {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  reviews: number;
  priceRange: string;
  addressLine: string;
  description: string;
  hours: string;
  image: string;
  discount?: string | null;
  bookingFeePerGuest: number;
};

function toCard(restaurant: any): RestaurantCard {
  const photos = restaurant.photos || [];
  const images = restaurant.images || [];
  const cuisine = Array.isArray(restaurant.cuisine)
    ? restaurant.cuisine
    : [restaurant.cuisine || 'Various'];

  const firstUrl = photos[0]?.url;
  const mainImage = firstUrl
    ? (firstUrl.startsWith('http') ? firstUrl : `http://localhost:5000${firstUrl}`)
    : (images[0] || defaultRestaurantImage);

  return {
    id: restaurant._id || restaurant.id,
    name: restaurant.name,
    cuisines: cuisine,
    rating: restaurant.averageRating || restaurant.rating || 4.5,
    reviews: restaurant.totalReviews || restaurant.reviews || 0,
    priceRange: restaurant.priceRange || '₹₹',
    addressLine: restaurant.address?.street
      ? `${restaurant.address.street}, ${restaurant.address.city}`
      : restaurant.address || 'Hyderabad',
    description: restaurant.description || 'A loved local dining room with table booking open now.',
    hours: restaurant.operatingHours?.[0]
      ? `${restaurant.operatingHours[0].openTime} - ${restaurant.operatingHours[0].closeTime}`
      : '11:30 - 22:30',
    image: mainImage,
    discount:
      typeof restaurant.discount === 'string'
        ? restaurant.discount
        : restaurant.discount?.isActive
          ? restaurant.discount.description
          : (Math.random() > 0.5 ? '50% off on dine-in' : null),
    bookingFeePerGuest:
      restaurant.bookingFeePerGuest > 1 ? restaurant.bookingFeePerGuest : BOOKING_FEE_PER_GUEST,
  };
}

const fallbackCards = fallbackRestaurants.map(toCard);

export function CustomerHome() {
  const location = useLocation();
  const incomingSearch = (location.state as { searchQuery?: string } | null)?.searchQuery || '';
  const [searchQuery, setSearchQuery] = useState(incomingSearch);
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('Any Price');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<RestaurantCard[]>(fallbackCards);
  const [usingLiveData, setUsingLiveData] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>('Detecting location...');

  useEffect(() => {
    let cancelled = false;

    const fetchRestaurants = (lat?: number, lng?: number) => {
      const endpoint = lat && lng ? '/restaurants/nearby' : '/restaurants';
      const params = lat && lng ? { lat, lng, radius: 25000 } : { limit: 24 };

      api
        .get(endpoint, { params })
        .then((res) => {
          if (!cancelled && res.data.success) {
            let localList: RestaurantCard[] = [];
            try {
              const saved = JSON.parse(localStorage.getItem('demo-created-restaurants') || '[]');
              localList = saved.map(toCard);
            } catch (e) { }

            const list = res.data.data || res.data.restaurants || [];
            const backendCards = list.length ? list.map(toCard) : fallbackCards;
            
            const combinedMap = new Map();
            localList.forEach(c => combinedMap.set(c.id, c));
            backendCards.forEach(c => combinedMap.set(c.id, c));
            const combinedList = Array.from(combinedMap.values());

            setRestaurants(combinedList);
            setUsingLiveData(Boolean(list.length));
            if (lat && lng) {
              setLocationStatus('Near your location');
            } else {
              setLocationStatus('Showing all tables');
            }
          }
        })
        .catch(() => {
          if (!cancelled) {
            let localList: RestaurantCard[] = [];
            try {
              const saved = JSON.parse(localStorage.getItem('demo-created-restaurants') || '[]');
              localList = saved.map(toCard);
            } catch (e) { }

            setRestaurants([...localList, ...fallbackCards]);
            setUsingLiveData(false);
            setLocationStatus('Showing demo tables');
          }
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (cancelled) return;
          fetchRestaurants(position.coords.latitude, position.coords.longitude);
        },
        () => {
          if (cancelled) return;
          fetchRestaurants();
        }
      );
    } else {
      fetchRestaurants();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setSearchQuery(incomingSearch);
  }, [incomingSearch]);

  const filteredRestaurants = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let result = [...restaurants];

    if (query) {
      result = result.filter((restaurant) => {
        const searchable = [
          restaurant.name,
          restaurant.addressLine,
          restaurant.description,
          ...restaurant.cuisines,
        ]
          .join(' ')
          .toLowerCase();

        return searchable.includes(query);
      });
    }

    if (selectedCuisine) {
      result = result.filter((restaurant) =>
        restaurant.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())
        )
      );
    }

    if (activeFilter === 'High Rated') {
      result = result.filter(r => r.rating >= 4.5).sort((a, b) => b.rating - a.rating);
    }

    if (activeFilter === '50% Off Dine-in') {
      result = result.filter((restaurant) => restaurant.discount && restaurant.discount.includes('50%'));
    }

    if (priceFilter !== 'Any Price') {
      result = result.filter((restaurant) => restaurant.priceRange === priceFilter);
    }

    return result;
  }, [activeFilter, priceFilter, restaurants, searchQuery, selectedCuisine]);

  const clearFilters = () => {
    setActiveFilter('All');
    setPriceFilter('Any Price');
    setSelectedCuisine(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-16">
      <section className="border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto grid gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-800">
              <CalendarCheck className="h-4 w-4" />
              {locationStatus}
            </div>
            <div>
              <h1 className="max-w-2xl text-4xl font-black leading-tight text-zinc-950 md:text-5xl">
                Find the table first, then choose the food.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                Browse cuisine videos, filter restaurants, check table slots, and pay the booking
                amount in rupees.
              </p>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="grid gap-3 rounded-lg border border-zinc-200 bg-stone-50 p-3 md:grid-cols-[1fr_auto]"
            >
              <label className="sr-only" htmlFor="restaurant-search">
                Search restaurants
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  id="restaurant-search"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by restaurant, cuisine, or area"
                  className="h-12 w-full rounded-lg border border-zinc-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                />
              </div>
              <button
                type="button"
                onClick={clearFilters}
                className="h-12 rounded-lg bg-zinc-950 px-5 text-sm font-bold text-white transition hover:bg-amber-700"
              >
                Reset
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <div className="text-sm font-bold text-zinc-500">Booking fee</div>
              <div className="mt-2 text-3xl font-black text-zinc-950">
                {formatRupees(BOOKING_FEE_PER_GUEST)}
              </div>
              <p className="mt-2 text-sm text-zinc-600">per guest, paid at checkout</p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <div className="text-sm font-bold text-zinc-500">Listings</div>
              <div className="mt-2 text-3xl font-black text-zinc-950">{restaurants.length}</div>
              <p className="mt-2 text-sm text-zinc-600">
                {usingLiveData ? 'from your backend' : 'demo restaurants ready'}
              </p>
            </div>
            <div className="col-span-2 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1300&q=80"
                alt="Restaurant tables"
                className="h-52 w-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-zinc-950">Cuisines</h2>
            <p className="text-sm text-zinc-600">Tap a cuisine to filter the restaurant list.</p>
          </div>
          {selectedCuisine && (
            <button
              type="button"
              onClick={() => setSelectedCuisine(null)}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-bold text-zinc-700 transition hover:border-amber-600 hover:text-amber-700"
            >
              Clear cuisine
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cuisineVideos.map((cuisine, index) => {
            const isSelected = selectedCuisine === cuisine.name;

            return (
              <motion.button
                type="button"
                key={cuisine.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCuisine(isSelected ? null : cuisine.name)}
                className={`group relative min-h-52 overflow-hidden rounded-lg border text-left shadow-sm transition ${isSelected
                  ? 'border-amber-600 ring-2 ring-amber-100'
                  : 'border-zinc-200 hover:border-zinc-400'
                  }`}
              >
                <img
                  src={cuisine.image}
                  alt={`${cuisine.name} dishes`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-transparent" />
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-lg bg-white/90 text-zinc-950">
                  <Play className="h-5 w-5 fill-current" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xl font-black text-white">{cuisine.name}</div>
                  <p className="mt-1 text-sm leading-5 text-zinc-200">{cuisine.tone}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 border-y border-zinc-200 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-zinc-950">
              {selectedCuisine ? `${selectedCuisine} Restaurants` : 'Restaurants'}
            </h2>
            <p className="text-sm text-zinc-600">
              {filteredRestaurants.length} table-ready place
              {filteredRestaurants.length === 1 ? '' : 's'} found.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-bold text-zinc-700 outline-none transition hover:border-amber-600 focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            >
              <option value="Any Price">Any Price</option>
              <option value="₹">₹ (Budget)</option>
              <option value="₹₹">₹₹ (Mid-range)</option>
              <option value="₹₹₹">₹₹₹ (Premium)</option>
            </select>

            {['All', 'High Rated', '50% Off Dine-in'].map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${activeFilter === filter
                  ? 'border-zinc-950 bg-zinc-950 text-white'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:border-amber-600 hover:text-amber-700'
                  }`}
              >
                {filter === 'All' && <Filter className="mr-2 inline h-4 w-4" />}
                {filter}
              </button>
            ))}
          </div>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="grid min-h-72 place-items-center rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
            <div>
              <Search className="mx-auto h-10 w-10 text-zinc-400" />
              <h3 className="mt-4 text-xl font-black text-zinc-950">No tables matched</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Try another cuisine, area, or price filter.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-700"
              >
                Show all restaurants
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.article
                key={restaurant.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md"
              >
                <Link to={`/restaurant/${restaurant.id}`} className="block">
                  <div className="relative aspect-[5/3] overflow-hidden bg-zinc-100">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      {restaurant.discount && (
                        <span className="rounded-md bg-rose-600 px-2.5 py-1 text-xs font-black text-white">
                          {restaurant.discount}
                        </span>
                      )}
                      {restaurant.rating >= 4.8 && (
                        <span className="rounded-md bg-zinc-950/85 px-2.5 py-1 text-xs font-black text-white">
                          <Sparkles className="mr-1 inline h-3 w-3 text-amber-300" />
                          Top rated
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to={`/restaurant/${restaurant.id}`}
                        className="text-xl font-black leading-6 text-zinc-950 hover:text-amber-700"
                      >
                        {restaurant.name}
                      </Link>
                      <p className="mt-1 text-sm font-semibold text-zinc-500">
                        {restaurant.cuisines.join(' • ')}
                      </p>
                    </div>
                    <div className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-sm font-black text-amber-800">
                      <Star className="mr-1 inline h-4 w-4 fill-current" />
                      {restaurant.rating.toFixed(1)}
                    </div>
                  </div>

                  <p className="line-clamp-2 text-sm leading-6 text-zinc-600">
                    {restaurant.description}
                  </p>

                  <div className="grid gap-2 text-sm text-zinc-600">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-rose-600" />
                      {restaurant.addressLine}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      {restaurant.hours}
                    </span>
                    <span className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-amber-600" />
                      {priceTierLabel(restaurant.priceRange)} • booking{' '}
                      {formatRupees(restaurant.bookingFeePerGuest)}/guest
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-200 pt-4">
                    <span className="text-sm font-semibold text-zinc-500">
                      {restaurant.reviews} reviews
                    </span>
                    <Link
                      to={`/restaurant/${restaurant.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-amber-700"
                    >
                      Reserve
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
