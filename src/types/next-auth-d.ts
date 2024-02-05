import { DefaultSession } from "next-auth";
import { UserRole } from "../app/lib/definitions";

declare module "next-auth" {

  interface Session {
    user: {
      token?: string;
    } & DefaultSession["user"];
  }
  
}

declare module "next-auth" {
    interface User {
        id: string;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        token?: string;
        role?: UserRole;
    }
}