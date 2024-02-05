"use client";

import { signIn } from "next-auth/react";

export async function fetchUserSignUp(name: string, email: string, password: string) {

    const res = await fetch("http://localhost:3000/api/v1/auth/register", {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name, email, password})})

    if(!res.ok) {
        window.location.href = window.location.href + "?error=true"
        return;
    }

    await signIn("credentials", {email, password, callbackUrl: "/profile"})
}