import { NextResponse } from "next/server";
import { createListing, getPublishedListings } from "../../../../lib/marketplace/listings";

export async function GET() {
  try {
    return NextResponse.json({ listings: await getPublishedListings() });
  } catch {
    return NextResponse.json({ error: "Marketplace is unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = await createListing(body);
  if (!result.ok) {
    const status = result.error.startsWith("Sign in") ? 401 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }
  return NextResponse.json(result, { status: 201 });
}
