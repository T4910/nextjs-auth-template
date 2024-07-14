import { getRole } from "@/lib/auth";
import { Roles } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const role = await getRole();

    if(role === Roles.ADMIN) return new NextResponse(null, { status: 200 });

    return new NextResponse(null, { status: 403 });
}