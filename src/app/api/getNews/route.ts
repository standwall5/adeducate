import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET(request: Request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    // Build query
    let query = supabase
      .from("news_articles")
      .select("*")
      .order("published_at", { ascending: false });

    // Apply filters
    if (featured === "true") {
      query = query.eq("is_featured", true);
    }

    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        query = query.limit(limitNum);
      }
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: error.message ?? "Failed to fetch news articles" },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (e: unknown) {
    let message = "Unexpected error";
    if (e instanceof Error) {
      message = e.message;
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
