// Billing utilities
// Will be expanded when Stripe/PayPal integration is added

export async function startCheckout(plan: "glow" | "elite") {
  // In the future, this will create a Stripe checkout session
  return {
    success: true,
    redirect: `/checkout?plan=${plan}`,
  };
}

export function formatPrice(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
