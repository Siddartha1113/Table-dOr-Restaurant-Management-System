import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { format } from 'date-fns';
import {
  Calendar,
  Camera,
  Check,
  Clock,
  Info,
  MapPin,
  Star,
  Tag,
  Utensils,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import api from '../../api';
import { BOOKING_FEE_PER_GUEST, formatRupees, priceTierLabel } from '../currency';
import { defaultRestaurantImage, restaurants as fallbackRestaurants } from '../data';

type Tab = 'overview' | 'menu' | 'photos';

function normalizeRestaurant(restaurant: any) {
  const photos =
    restaurant.photos?.length > 0
      ? restaurant.photos.map((p: any) => ({
          ...p,
          url: p.url?.startsWith('http') ? p.url : `http://localhost:5000${p.url}`
        }))
      : (restaurant.images || []).map((url: string) => ({ url }));

  return {
    ...restaurant,
    _id: restaurant._id || restaurant.id,
    cuisine: Array.isArray(restaurant.cuisine)
      ? restaurant.cuisine
      : [restaurant.cuisine || 'Various'],
    photos: photos.length ? photos : [{ url: defaultRestaurantImage }],
    averageRating: restaurant.averageRating || restaurant.rating || 4.6,
    totalReviews: restaurant.totalReviews || restaurant.reviews || 0,
    bookingFeePerGuest:
      restaurant.bookingFeePerGuest > 1 ? restaurant.bookingFeePerGuest : BOOKING_FEE_PER_GUEST,
    priceRange: restaurant.priceRange || '₹₹',
    operatingHours: restaurant.operatingHours?.length ? restaurant.operatingHours : [],
    slots: restaurant.slots?.length ? restaurant.slots : [],
    menu: restaurant.menu?.length ? restaurant.menu : [],
  };
}

function fallbackSlots(restaurant: any) {
  let slots = restaurant?.slots;
  if (!slots || !slots.length) {
    slots = [];
    for (let h = 11; h <= 23; h++) {
      for (let m of ['00', '15', '30', '45']) {
        if (h === 23 && m !== '00') continue;
        slots.push({ time: `${h.toString().padStart(2, '0')}:${m}`, totalSeats: 20 });
      }
    }
  }

  return slots.map((slot: any) => ({
    time: slot.time,
    totalSeats: slot.totalSeats || 20,
    bookedSeats: 0,
    availableSeats: slot.totalSeats || 20,
    isAvailable: true,
  }));
}

function formatAddress(restaurant: any) {
  if (!restaurant?.address) return 'Hyderabad';
  if (typeof restaurant.address === 'string') return restaurant.address;
  return [restaurant.address.street, restaurant.address.city, restaurant.address.state]
    .filter(Boolean)
    .join(', ');
}

function formatHours(hours: any) {
  if (!hours?.isOpen) return 'Closed';
  return `${hours.openTime || '11:30'} - ${hours.closeTime || '22:30'}`;
}

export function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState('');
  const [slots, setSlots] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get(`/restaurants/${id}`)
      .then((res) => {
        if (!cancelled) {
          const loaded = normalizeRestaurant(res.data.restaurant);
          setRestaurant(loaded);
          setSlots(fallbackSlots(loaded));
        }
      })
      .catch((err: any) => {
        if (cancelled) return;
        const fallback = fallbackRestaurants.find((item) => item.id === id || item._id === id);

        if (fallback) {
          const loaded = normalizeRestaurant(fallback);
          setRestaurant(loaded);
          setSlots(fallbackSlots(loaded));
        } else {
          setError(err?.response?.data?.message || 'Restaurant not found.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!id || !restaurant) return;

    api
      .get(`/restaurants/${id}/availability`, { params: { date } })
      .then((res) => {
        const apiSlots = res.data.slots || [];
        setSlots(apiSlots.length ? apiSlots : fallbackSlots(restaurant));
      })
      .catch(() => {
        setSlots(fallbackSlots(restaurant));
      });
  }, [date, id, restaurant]);

  const menuItems = useMemo(() => {
    if (!restaurant) return [];

    const existing = restaurant.menu || [];
    const templates: Record<string, string[]> = {
      indian: ['Samosa', 'Dal Makhani', 'Rogan Josh', 'Palak Paneer', 'Gulab Jamun'],
      italian: ['Bruschetta', 'Penne Alfredo', 'Pesto Pasta', 'Affogato', 'Caprese Salad'],
      asian: ['Miso Soup', 'Gyoza', 'Tempura', 'Udon Noodles', 'Yakitori'],
      japanese: ['Miso Soup', 'Gyoza', 'Tempura', 'Udon Noodles', 'Yakitori'],
      mexican: ['Nachos', 'Quesadilla', 'Salsa Trio', 'Elote', 'Flan'],
    };
    const cuisineKey = restaurant.cuisine[0]?.toLowerCase() || 'indian';
    const extras = templates[cuisineKey] || templates.indian;
    const names = new Set(existing.map((item: any) => item.name?.toLowerCase()));
    const generated = extras
      .filter((name) => !names.has(name.toLowerCase()))
      .map((name, index) => ({
        name,
        description: "Chef's special preparation",
        price: 140 + index * 55,
        category: 'main',
      }));

    return [...existing, ...generated].slice(0, 10);
  }, [restaurant]);

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-stone-50 p-8 text-center text-zinc-600">
        Loading restaurant...
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="grid min-h-[60vh] place-items-center bg-stone-50 p-8 text-center text-rose-600">
        {error || 'Restaurant not found.'}
      </div>
    );
  }

  const address = formatAddress(restaurant);
  const heroPhoto = restaurant.photos[0]?.url || defaultRestaurantImage;
  const availableSlot = slots.find((slot) => slot.time === time);
  const canBook = Boolean(time) && (!availableSlot || availableSlot.availableSeats >= guests);
  const totalAmount = guests * restaurant.bookingFeePerGuest;

  const handleBooking = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canBook) return;

    navigate('/payment', {
      state: {
        restaurant,
        date,
        time,
        guests,
        bookingFeePerGuest: restaurant.bookingFeePerGuest,
      },
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-16">
      <section className="border-b border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
            <img src={heroPhoto} alt={restaurant.name} className="h-72 w-full object-cover lg:h-full" />
          </div>

          <div className="flex flex-col justify-between gap-6 py-2">
            <div>
              <div className="mb-4 inline-flex rounded-lg border-2 border-zinc-950 px-6 py-2 text-center text-sm font-black uppercase text-zinc-950">
                {restaurant.name}
              </div>
              <h1 className="text-4xl font-black leading-tight text-zinc-950 md:text-5xl">
                {restaurant.cuisine.join(' • ')} table booking
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
                {restaurant.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' ' + address)}`} 
                target="_blank" 
                rel="noreferrer"
                className="block rounded-lg border border-zinc-200 bg-stone-50 p-4 transition-all hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-500 group-hover:text-amber-700 transition-colors">
                    <MapPin className="h-4 w-4 text-rose-600" />
                    Address
                  </div>
                  <span className="text-xs font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">View Map &rarr;</span>
                </div>
                <p className="mt-2 font-bold text-zinc-950">{address}</p>
              </a>
              <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
                  <Star className="h-4 w-4 text-amber-500 fill-current" />
                  Rating
                </div>
                <p className="mt-2 font-bold text-zinc-950">
                  {restaurant.averageRating.toFixed(1)} from {restaurant.totalReviews} reviews
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
                  <Tag className="h-4 w-4 text-amber-600" />
                  Price
                </div>
                <p className="mt-2 font-bold text-zinc-950">{priceTierLabel(restaurant.priceRange)}</p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
                  <Info className="h-4 w-4 text-amber-600" />
                  Booking
                </div>
                <p className="mt-2 font-bold text-zinc-950">
                  {formatRupees(restaurant.bookingFeePerGuest)} per guest
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto grid gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
            {(['overview', 'menu', 'photos'] as Tab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg border px-4 py-2 text-sm font-bold capitalize transition ${activeTab === tab
                  ? 'border-zinc-950 bg-zinc-950 text-white'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:border-amber-600 hover:text-amber-700'
                  }`}
              >
                {tab === 'overview' && <Info className="mr-2 inline h-4 w-4" />}
                {tab === 'menu' && <Utensils className="mr-2 inline h-4 w-4" />}
                {tab === 'photos' && <Camera className="mr-2 inline h-4 w-4" />}
                {tab}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-zinc-200 bg-white p-5"
          >
            {activeTab === 'overview' && (
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-black text-zinc-950">Restaurant Details</h2>
                  <p className="mt-3 leading-7 text-zinc-600">{restaurant.description}</p>
                  <div className="mt-5 grid gap-3 text-sm text-zinc-700">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-amber-600" />
                      Instant slot selection
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-amber-600" />
                      Menu prices in rupees
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-amber-600" />
                      UPI, credit card, and debit card checkout
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-black text-zinc-950">
                    <Clock className="h-5 w-5 text-amber-600" />
                    Open & Closing Hours
                  </h3>
                  <div className="space-y-2">
                    {(restaurant.operatingHours.length
                      ? restaurant.operatingHours
                      : [
                        { day: 'monday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
                        { day: 'tuesday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
                        { day: 'wednesday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
                        { day: 'thursday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
                        { day: 'friday', isOpen: true, openTime: '11:30', closeTime: '23:00' },
                        { day: 'saturday', isOpen: true, openTime: '11:30', closeTime: '23:00' },
                        { day: 'sunday', isOpen: true, openTime: '11:30', closeTime: '22:30' },
                      ]).map((hour: any) => (
                        <div
                          key={hour.day}
                          className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm"
                        >
                          <span className="font-bold capitalize text-zinc-700">{hour.day}</span>
                          <span className="text-zinc-600">{formatHours(hour)}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div>
                <h2 className="mb-4 text-2xl font-black text-zinc-950">Menu</h2>
                <div className="grid gap-3">
                  {menuItems.map((item: any, index: number) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="grid gap-3 rounded-lg border border-zinc-200 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                    >
                      {item.image && (
                        <div className="h-16 w-16 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
                           <img 
                             src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} 
                             alt={item.name} 
                             className="h-full w-full object-cover" 
                           />
                        </div>
                      )}
                      <div>
                        <h3 className="font-black text-zinc-950">{item.name}</h3>
                        <p className="mt-1 text-sm text-zinc-600">
                          {item.description || "Chef's special preparation"}
                        </p>
                      </div>
                      <div className="text-lg font-black text-amber-700">
                        {formatRupees(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div>
                <h2 className="mb-4 text-2xl font-black text-zinc-950">Photos</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {restaurant.photos.map((photo: any, index: number) => (
                    <div key={`${photo.url}-${index}`} className="overflow-hidden rounded-lg border border-zinc-200">
                      <img
                        src={photo.url || defaultRestaurantImage}
                        alt={photo.caption || `${restaurant.name} photo ${index + 1}`}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-5">
            <h2 className="text-xl font-black text-zinc-950">Map</h2>
            <div className="relative mt-4 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80"
                alt="Map view"
                className="h-44 w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 grid place-items-center">
                <button
                  type="button"
                  onClick={() => {
                   window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' ' + address)}`, '_blank');
                  }}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-black text-zinc-950 shadow"
                >
                  <MapPin className="mr-2 inline h-4 w-4 text-rose-600" />
                  Open map
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-600">{address}</p>
          </div>

          <div className="sticky top-24 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-zinc-950">Booking Table</h2>
            <p className="mt-1 text-sm text-zinc-600">Choose date, time, and number of guests.</p>

            <form onSubmit={handleBooking} className="mt-5 space-y-4">
              <div>
                <label htmlFor="booking-date" className="mb-2 block text-sm font-bold text-zinc-700">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                  <input
                    id="booking-date"
                    type="date"
                    min={format(new Date(), 'yyyy-MM-dd')}
                    value={date}
                    onChange={(event) => {
                      setDate(event.target.value);
                      setTime('');
                    }}
                    className="h-12 w-full rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="guest-count" className="mb-2 block text-sm font-bold text-zinc-700">
                  Number
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                  <select
                    id="guest-count"
                    value={guests}
                    onChange={(event) => setGuests(Number(event.target.value))}
                    className="h-12 w-full appearance-none rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((guestCount) => (
                      <option key={guestCount} value={guestCount}>
                        {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-700">Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot) => {
                    let isPast = false;
                    if (date === format(new Date(), 'yyyy-MM-dd')) {
                      const [slotH, slotM] = slot.time.split(':').map(Number);
                      const now = new Date();
                      if (slotH < now.getHours() || (slotH === now.getHours() && slotM <= now.getMinutes())) {
                        isPast = true;
                      }
                    }

                    const disabled = !slot.isAvailable || slot.availableSeats < guests || isPast;
                    const selected = time === slot.time;

                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={disabled}
                        onClick={() => setTime(slot.time)}
                        className={`rounded-lg border px-2 py-2 text-sm font-bold transition ${selected
                          ? 'border-amber-700 bg-amber-600 text-white'
                          : 'border-zinc-300 bg-white text-zinc-700 hover:border-amber-600 hover:text-amber-700'
                          } ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
                <div className="flex items-center justify-between text-sm text-zinc-600">
                  <span>Booking fee</span>
                  <span>
                    {guests} × {formatRupees(restaurant.bookingFeePerGuest)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-lg font-black text-zinc-950">
                  <span>Total</span>
                  <span>{formatRupees(totalAmount)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!canBook}
                className="w-full rounded-lg bg-zinc-950 px-4 py-3 text-sm font-black text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
              >
                Booking Table
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
