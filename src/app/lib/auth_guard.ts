"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { UserRole } from "./definitions";
import { User } from "next-auth";

/**
 * 
 * @param requiredRole: especifica que rol mínimo se necesita para acceder. Si por ejemplo se utiliza `UserRole.USER` 
 * pueden acceder todos los usuarios con sesión iniciada además de administradores y super-administradores.  
 * @param onForbidden: se llama en caso de que el usuario no posea el rol necesario para acceder.  
 * @param onUnauthenticated: se llama en caso de que el usuario no tenga una sesión activa.
 * @returns devuelve la sesión con datos de la sesión del usuario
 */
export const useRoleSession = ({requiredRole, onForbidden, onUnauthenticated}: {requiredRole: UserRole, onForbidden: Function, onUnauthenticated?: Function | null}) => {
    let sessionData = useSession({
        required: true,
        onUnauthenticated: () => {
            if(onUnauthenticated != null) {
                
                onUnauthenticated()

            } else {
                
                redirect("/login");
            
            }
        }
    });

    if(sessionData.status == "authenticated") {

        let user = sessionData.data.user as User;

        // Los super usuarios pueden acceder a todas las rutas
        if(user.role == UserRole.SUPER_ADMIN) {
            return sessionData;
        }

        // Bloquear resto de usuarios en caso de necesitar permiso de superadmin
        if(requiredRole == UserRole.SUPER_ADMIN) {
            onForbidden();
        }

        if(user.role == UserRole.ADMIN) {
            return sessionData;
        }

        if(requiredRole == UserRole.ADMIN ) {
            onForbidden();
        }

    }

    return sessionData;
}