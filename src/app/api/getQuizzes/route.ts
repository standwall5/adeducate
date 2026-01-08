import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import type { Quiz } from "@/lib/models/types";

export async function GET(
  request: Request,
): Promise<NextResponse<Quiz[] | { error: string }>> {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const recommended = searchParams.get("recommended");
  const limit = searchParams.get("limit");

  // Build query
  let query = supabase
    .from("quizzes")
    .select("*")
    .order("id", { ascending: true });

  // Apply filters
  if (recommended === "true") {
    query = query.eq("is_recommended", true);
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
      { error: error?.message ?? "Failed to fetch quizzes" },
      { status: 500 },
    );
  }

  return NextResponse.json(data as Quiz[]);
}
