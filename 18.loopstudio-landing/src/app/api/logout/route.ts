//todo: must remlove the user data from mongo user object and session data from session object

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    return NextResponse.json({ success: true, user: body.username });
}
