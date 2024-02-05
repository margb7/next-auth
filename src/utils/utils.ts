import { UserRole } from "@/app/lib/definitions";

export function getRoleFromString(str: string) {

    str = str.toLowerCase().trim();

    switch(str) {
        case "super_admin": return UserRole.SUPER_ADMIN
        case "admin": return UserRole.ADMIN
        default: return UserRole.USER
    }

} 