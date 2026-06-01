export const BOOKING_FEE_PER_GUEST = 75;

export function formatRupees(amount: number | string | undefined | null) {
  const value = Number(amount || 0);
  return `₹${new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value)}`;
}

export function rupeeTier(priceRange?: string) {
  const tierCount = (priceRange?.match(/[₹$]/g) || []).length || 2;
  return '₹'.repeat(Math.min(Math.max(tierCount, 1), 4));
}

export function priceTierLabel(priceRange?: string) {
  const tier = rupeeTier(priceRange).length;
  const labels: Record<number, string> = {
    1: 'Value',
    2: 'Casual',
    3: 'Premium',
    4: 'Fine dining',
  };

  return `${rupeeTier(priceRange)} ${labels[tier]}`;
}
