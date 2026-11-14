import { NextResponse } from "next/server";

// Deliberately disabled. Enable only after a provider checkout session and signed webhook verification exist.
export async function POST() {
  return NextResponse.json({
    error: "Checkout is not configured.",
    code: "PAYMENTS_NOT_ENABLED",
    nextStep: "Integrate a payment provider and verify signed webhooks before enabling purchases."
  }, { status: 503 });
}
