import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    // Verify the request has the admin cookie
    const cookieHeader = req.headers.get("cookie") || "";
    const isAdminAuth = cookieHeader.includes("admin_auth=true");

    if (!isAdminAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { ngoId } = await req.json();

    if (!ngoId) {
      return NextResponse.json({ error: "Missing ngoId" }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ is_verified: true })
      .eq("id", ngoId);

    if (error) {
      console.error("Admin approve NGO error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("approve-ngo route exception:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
