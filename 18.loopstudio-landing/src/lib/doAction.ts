"use server";
import { revalidatePath } from "next/cache";

export async function doAction(action: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${action}`, {
        method: "POST",
        cache: "no-store",
    });
    revalidatePath("/");
}
