//todo: must connected to github oAuth system, get username and image, and save them into the mongodb object, also set response cookie whoich is in session list

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    return NextResponse.json({ success: true, user: body.username });
}
