import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import type { Module } from "@/lib/models/types";

export async function GET(
  request: Request,
): Promise<NextResponse<Module[] | { error: string }>> {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const recommended = searchParams.get("recommended");
  const difficulty = searchParams.get("difficulty");
  const topic = searchParams.get("topic");
  const limit = searchParams.get("limit");

  // Build query
  let query = supabase
    .from("modules")
    .select("*")
    .order("id", { ascending: true });

  // Apply filters
  if (recommended === "true") {
    query = query.eq("is_recommended", true);
  }

  if (difficulty) {
    query = query.eq("difficulty", difficulty);
  }

  if (topic) {
    query = query.eq("topic", topic);
  }

  if (limit) {
    const limitNum = parseInt(limit, 10);
    if (!isNaN(limitNum)) {
      query = query.limit(limitNum);
    }
  }

  const { data, error } = await query;

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to fetch modules" },
      { status: 500 },
    );
  }

  return NextResponse.json(data as Module[]);
}
