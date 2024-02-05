"use server";

import { redirect } from "next/navigation";
import { UserRole } from "../lib/definitions";
import Link from "next/link";
import { useServerRoleSession } from "../lib/auth_guard_server";
import { User } from "next-auth";

export default async function ProfilePage() {

    const session = await useServerRoleSession({
        onForbidden: () => redirect("/login"),
        onUnauthenticated: () => redirect("/login"),
        requiredRole: UserRole.USER,
    })

    const user = session!.user as User;

    return(
        <main className="flex flex-col bg-white min-h-screen">
            
            <div className="flex flex-col w-fill max-w-xl p-6">

                        <div className="flex flex-row justify-start">

                            <div className="flex flex-col">

                                <div className="text-2xl">{user.name}</div>
                                <div className="text-xs">{user.email}</div>
                                <div className="text-xs">{user.role}</div>

                            </div>
                            
                            

                        </div>

                        { user.role == UserRole.ADMIN || user.role == UserRole.SUPER_ADMIN &&

                            <Link href={"/admin"} className="mt-4 text-xs text-blue-500 rounded-xl">Panel admin</Link>

                        }   

            </div>

        </main>
    );

}

