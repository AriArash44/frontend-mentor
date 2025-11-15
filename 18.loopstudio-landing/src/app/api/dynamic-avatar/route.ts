import { NextRequest, NextResponse } from 'next/server';

const images = [
    '/images/avatar/1.jpg',
    '/images/avatar/2.jpg',
    '/images/avatar/3.jpg',
    '/images/avatar/4.jpg'
];

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const randomIndex = Math.floor(Math.random() * images.length);
        const selectedImage = images[randomIndex];
        return NextResponse.redirect(new URL(selectedImage, request.url));
    } catch (error) {
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}