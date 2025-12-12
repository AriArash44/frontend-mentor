"use client";
import { signIn, signOut } from "next-auth/react";

export function AuthButton({ action }: { action: string }) {
    if (action === "login") {
        return <button onClick={() => signIn("github")}>Login with GitHub</button>;
    }
    return <button onClick={() => signOut()}>Logout</button>;
}
