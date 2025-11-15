
import { NextRequest, NextResponse } from "next/server";
import { getLoginFlag } from "./utils/sessionFlag";

export default function proxy(req: NextRequest) {
    const url = req.nextUrl.clone();
    if (url.pathname.startsWith("/api/dynamic-avatar")) {
        if (!getLoginFlag()) {
            url.pathname = "/images/avatar/unknown.png";
            return NextResponse.rewrite(url);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/api/dynamic-avatar"],
};