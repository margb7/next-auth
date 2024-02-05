import NextAuth, { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials"


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/signout"
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
        credentials: {
            email: {},
            password: {} 
        },
        async authorize(credentials, req) {
            
            if(!credentials) {
                return null;
            }

            const {email, password} = credentials as {
                email: string,
                password: string
            }

            const res = await fetch("http://localhost:3000/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}) 
            })

            if(!res.ok) {
                return null;
            }

            const user = await res.json();

            return user;
        },
    },)
  ],
  debug: true,
  callbacks: {
    jwt: async ({token, user}: {token: any, user: User}) => {
        
        if(user) {

            token.email = user.email;
            token.token = user.token;
            token.accessToken = user.token;
            token.name = user.name;
            token.role = user.role;
            token.id = user.id;
        
        }

        return token;
    },
    session: async ({ session, token}) => {
        session.user = { ...token };
        return session;
    },
    redirect: async ({url, baseUrl}) => {
        return url.startsWith(baseUrl)? url : baseUrl + "/profile";
    }
  },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}