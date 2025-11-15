import { NextResponse } from "next/server";
import { setLoginFlag, getLoginFlag } from "@/src/utils/sessionFlag";

export async function POST() {
    const current = getLoginFlag();
    setLoginFlag(!current);
    return NextResponse.json({ isLoggedIn: !current });
}