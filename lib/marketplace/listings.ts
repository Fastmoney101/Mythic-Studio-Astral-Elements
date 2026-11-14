import { z } from "zod";
import { createClient } from "../supabase/server";

export const listingInputSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().min(10).max(3000),
  category: z.enum(["spirit", "artwork", "sound", "template", "other"]),
  price_cents: z.number().int().min(0).max(100000000),
  currency: z.string().trim().length(3).default("USD")
}).strict();

export async function getPublishedListings(limit = 30) {
  const supabase = await createClient();
  const safeLimit = Math.max(1, Math.min(limit, 100));
  const { data, error } = await supabase.from("marketplace_listings")
    .select("id, creator_id, title, description, category, price_cents, currency, created_at")
    .eq("status", "published").order("created_at", { ascending: false }).limit(safeLimit);
  if (error) throw new Error("Unable to load marketplace listings.");
  return data ?? [];
}

export async function createListing(input: unknown) {
  const parsed = listingInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Invalid listing details." };

  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return { ok: false as const, error: "Sign in to create a listing." };

  const { data, error } = await supabase.from("marketplace_listings")
    .insert({ creator_id: authData.user.id, ...parsed.data, status: "draft" })
    .select("id, title, status").single();
  if (error) return { ok: false as const, error: "Listing could not be saved." };
  return { ok: true as const, listing: data };
}
