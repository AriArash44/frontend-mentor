import { NextRequest, NextResponse } from "next/server";
import clientPromise from "./lib/mongodb";

export default async function proxy(req: NextRequest) {
    const url = req.nextUrl.clone();
    if (url.pathname.startsWith("/api/get-profile-data")) {
        const sessionToken = req.cookies.get("sessionToken")?.value;
        const client = await clientPromise;
        const db = client.db("proj-18");
        const session = await db.collection("sessions").findOne({ sessionToken });
        if (session) {
            const userId = session.userId;
            const requestHeaders = new Headers(req.headers);
            requestHeaders.set("x-user-id", userId);
            requestHeaders.set("x-action", "logout");
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        }
        return NextResponse.json({
            userImage: "/images/unknown.png",
            userName: "Unknon",
            action: "login",
        });
    }
}

export const config = {
    matcher: ["/api/get-profile-data"],
};