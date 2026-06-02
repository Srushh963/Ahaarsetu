import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (!body.userId || !body.email || !body.role) {
      return NextResponse.json({ error: "Missing required fields (userId, email, role)" }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: body.userId,
        role: body.role,
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        donor_type: body.donorType,
        vehicle_type: body.vehicleType,
        availability: body.availability,
        reg_id: body.regId,
        capacity: body.capacity
      });

    if (error) {
      console.error("Profile upsert error via Admin Client:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("create-profile route exception:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
