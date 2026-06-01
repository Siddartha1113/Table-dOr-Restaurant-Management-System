import React from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { format } from 'date-fns';
import { Calendar, CheckCircle2, Clock, Home, ReceiptText, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { BOOKING_FEE_PER_GUEST, formatRupees } from '../currency';

export function Confirmation() {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/home" />;
  }

  const { restaurant, date, time, guests, paymentMethod } = location.state as any;
  const bookingFeePerGuest =
    (location.state as any).bookingFeePerGuest > 1
      ? (location.state as any).bookingFeePerGuest
      : restaurant?.bookingFeePerGuest > 1
        ? restaurant.bookingFeePerGuest
        : BOOKING_FEE_PER_GUEST;
  const totalAmount = (location.state as any).totalAmount || guests * bookingFeePerGuest;

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto rounded-lg border-2 border-zinc-950 bg-white p-6 text-center shadow-sm"
      >
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-lg bg-amber-50 text-amber-700">
          <CheckCircle2 className="h-12 w-12" />
        </div>

        <h1 className="mt-6 text-3xl font-black text-zinc-950">Thank you for booking</h1>
        <p className="mx-auto mt-3 max-w-xl text-zinc-600">
          Your table at <strong className="text-zinc-950">{restaurant.name}</strong> is confirmed.
        </p>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
              <Calendar className="h-4 w-4" />
              Date
            </div>
            <p className="mt-2 font-black text-zinc-950">{format(new Date(date), 'MMMM dd, yyyy')}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
              <Clock className="h-4 w-4" />
              Time
            </div>
            <p className="mt-2 font-black text-zinc-950">{time}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
              <Users className="h-4 w-4" />
              Guests
            </div>
            <p className="mt-2 font-black text-zinc-950">
              {guests} {guests === 1 ? 'guest' : 'guests'}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-stone-50 p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
              <ReceiptText className="h-4 w-4" />
              Payment
            </div>
            <p className="mt-2 font-black text-zinc-950">
              {formatRupees(totalAmount)} • {paymentMethod || 'Paid'}
            </p>
          </div>
        </div>

        <Link
          to="/home"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 py-3 text-sm font-black text-white transition hover:bg-amber-700 sm:w-auto sm:px-8"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
