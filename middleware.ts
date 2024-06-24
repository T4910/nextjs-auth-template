import authConfig from "./middleware/auth.config"
import NextAuth from "next-auth"
import { 
    DEFAULT_LOGIN_REDIRECT,
    AUTH,
    PUBLIC,
    AUTHAPI
} from "./middleware/route";


const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(AUTHAPI);
    const isPublicroute = PUBLIC.includes(nextUrl.pathname);
    const isAuthRoute = AUTH.includes(nextUrl.pathname);

    if(isApiAuthRoute) return null;
    
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }

        return null; 
    }

    if(!isLoggedIn && !isPublicroute){
        return Response.redirect(new URL("/login", nextUrl));
    }

    return null;
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}