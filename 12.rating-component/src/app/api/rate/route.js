import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { rate } = await request.json();
        return NextResponse.json({"message": `You selected ${rate} out of 5`})
    } catch(e) {
        return NextResponse.json({"message": e.message}, { status: 500 });
    }
}