import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function GET(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("proj-18");
        const userId = req.headers.get("x-user-id");
        if (!userId) {
            return NextResponse.json(
                { message: "Missing x-user-id header" },
                { status: 400 }
            );
        }
        const user = await db.collection("users").findOne(
            { userId },
            { projection: { userImage: 1, userName: 1 } }
        );
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({...user, action: req.headers.get("x-action")});
    } catch (e: unknown) {
        return NextResponse.json(
            { message: e instanceof Error ? e.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}
