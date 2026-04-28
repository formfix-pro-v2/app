import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Stripe price config for each plan
export const STRIPE_PLANS = {
  glow: {
    name: "Velora Glow - 30 Day Program",
    price: 2900, // in cents (€29.00)
    currency: "eur",
  },
  elite: {
    name: "Velora Elite - 90 Day Program",
    price: 7900, // in cents (€79.00)
    currency: "eur",
  },
} as const;
