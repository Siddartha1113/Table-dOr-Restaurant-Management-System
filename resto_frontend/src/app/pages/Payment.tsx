import React, { useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { format } from 'date-fns';
import {
  Building2,
  Calendar,
  ChevronRight,
  CreditCard,
  Lock,
  QrCode,
  ShieldCheck,
  Smartphone,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { BOOKING_FEE_PER_GUEST, formatRupees } from '../currency';

type PaymentMethod = 'phonepe' | 'gpay' | 'upi' | 'credit_card' | 'debit_card';

const paymentMethods: Array<{
  id: PaymentMethod;
  label: string;
  helper: string;
  icon: React.ElementType;
}> = [
  { id: 'phonepe', label: 'PhonePe', helper: 'Pay with PhonePe UPI', icon: Smartphone },
  { id: 'gpay', label: 'GPay', helper: 'Pay with Google Pay', icon: QrCode },
  { id: 'upi', label: "Other UPI's", helper: 'Use any UPI app', icon: Smartphone },
  { id: 'credit_card', label: 'Credit Card', helper: 'Visa, Mastercard, RuPay', icon: CreditCard },
  { id: 'debit_card', label: 'Debit Card', helper: 'Bank debit card', icon: CreditCard },
];

function getRestaurantName(restaurant: any) {
  return restaurant?.name || 'Restaurant';
}

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [method, setMethod] = useState<PaymentMethod>('phonepe');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!location.state) {
    return <Navigate to="/home" />;
  }

  const { restaurant, date, time, guests } = location.state as any;
  const bookingFeePerGuest =
    (location.state as any).bookingFeePerGuest > 1
      ? (location.state as any).bookingFeePerGuest
      : restaurant?.bookingFeePerGuest > 1
        ? restaurant.bookingFeePerGuest
        : BOOKING_FEE_PER_GUEST;
  const totalAmount = guests * bookingFeePerGuest;
  const isCard = method === 'credit_card' || method === 'debit_card';

  const selectedMethod = useMemo(
    () => paymentMethods.find((item) => item.id === method) || paymentMethods[0],
    [method]
  );

  const handlePayment = (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      navigate('/confirmation', {
        state: {
          restaurant,
          date,
          time,
          guests,
          bookingFeePerGuest,
          totalAmount,
          paymentMethod: selectedMethod.label,
        },
      });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="mb-5 flex items-center gap-2 text-zinc-950">
            <Building2 className="h-5 w-5 text-amber-600" />
            <h1 className="text-2xl font-black">Booking Summary</h1>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-zinc-100 pb-3">
              <span className="font-bold text-zinc-500">Restaurant</span>
              <span className="text-right font-black text-zinc-950">
                {getRestaurantName(restaurant)}
              </span>
            </div>
            <div className="flex justify-between gap-4 border-b border-zinc-100 pb-3">
              <span className="flex items-center gap-2 font-bold text-zinc-500">
                <Calendar className="h-4 w-4" />
                Date
              </span>
              <span className="font-black text-zinc-950">{format(new Date(date), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-zinc-100 pb-3">
              <span className="font-bold text-zinc-500">Time</span>
              <span className="font-black text-zinc-950">{time}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-zinc-100 pb-3">
              <span className="flex items-center gap-2 font-bold text-zinc-500">
                <Users className="h-4 w-4" />
                Guests
              </span>
              <span className="font-black text-zinc-950">
                {guests} {guests === 1 ? 'person' : 'people'}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-zinc-200 bg-stone-50 p-4">
            <div className="flex items-center justify-between text-sm text-zinc-600">
              <span>Booking fee</span>
              <span>
                {guests} × {formatRupees(bookingFeePerGuest)}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-2xl font-black text-zinc-950">
              <span>Total</span>
              <span className="text-amber-700">{formatRupees(totalAmount)}</span>
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-zinc-200 bg-white p-5"
        >
          <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-amber-700">
                <Lock className="h-4 w-4" />
                Secure Payment
              </div>
              <h2 className="mt-1 text-2xl font-black text-zinc-950">Payment Page</h2>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-black text-amber-800">
              INR
            </div>
          </div>

          <form onSubmit={handlePayment} className="mt-5 grid gap-6 lg:grid-cols-[0.85fr_1fr]">
            <div className="space-y-2">
              {paymentMethods.map((item) => {
                const Icon = item.icon;
                const selected = method === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id)}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      selected
                        ? 'border-amber-600 bg-amber-50 ring-2 ring-amber-100'
                        : 'border-zinc-200 bg-white hover:border-zinc-400'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-lg ${
                          selected ? 'bg-amber-600 text-white' : 'bg-zinc-100 text-zinc-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-black text-zinc-950">{item.label}</span>
                        <span className="block text-sm text-zinc-500">{item.helper}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-lg border border-zinc-200 bg-stone-50 p-5">
              <h3 className="text-lg font-black text-zinc-950">
                {isCard ? 'Card Details' : 'UPI Details'}
              </h3>

              {isCard ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="card-name" className="mb-2 block text-sm font-bold text-zinc-700">
                      Name on card
                    </label>
                    <input
                      id="card-name"
                      type="text"
                      className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                      placeholder="Card holder name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="card-number" className="mb-2 block text-sm font-bold text-zinc-700">
                      Card number
                    </label>
                    <input
                      id="card-number"
                      type="text"
                      inputMode="numeric"
                      className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="expiry" className="mb-2 block text-sm font-bold text-zinc-700">
                        Expiry
                      </label>
                      <input
                        id="expiry"
                        type="text"
                        className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="mb-2 block text-sm font-bold text-zinc-700">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="password"
                        inputMode="numeric"
                        className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="upi-id" className="mb-2 block text-sm font-bold text-zinc-700">
                      UPI ID
                    </label>
                    <input
                      id="upi-id"
                      type="text"
                      className="h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
                      placeholder={
                        method === 'phonepe'
                          ? 'yourname@ybl'
                          : method === 'gpay'
                            ? 'yourname@okaxis'
                            : 'yourname@upi'
                      }
                      required
                    />
                  </div>
                  <div className="grid place-items-center rounded-lg border border-dashed border-zinc-300 bg-white p-6 text-center">
                    <QrCode className="h-16 w-16 text-zinc-500" />
                    <p className="mt-3 text-sm font-bold text-zinc-700">Scan or enter UPI ID</p>
                  </div>
                </div>
              )}

              <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                <ShieldCheck className="mr-2 inline h-4 w-4" />
                Payment is simulated for this demo.
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 py-3 text-sm font-black text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
              >
                {isProcessing ? 'Processing...' : `Confirm ${formatRupees(totalAmount)}`}
                {!isProcessing && <ChevronRight className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
