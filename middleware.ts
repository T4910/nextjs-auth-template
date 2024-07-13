import authConfig from "./middleware/auth.config"
import NextAuth from "next-auth"
import { 
    DEFAULT_LOGIN_REDIRECT,
    AUTH,
    PUBLIC,
    AUTHAPI,
    ADMIN
} from "./middleware/route";
import { getRole } from "./lib/auth";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth;
    const role = await getRole();

    const isApiAuthRoute = nextUrl.pathname.startsWith(AUTHAPI);
    const isPublicroute = PUBLIC.includes(nextUrl.pathname);
    const isAuthRoute = AUTH.includes(nextUrl.pathname);
    const isAdminRoute = nextUrl.pathname.startsWith(ADMIN);
    const isAdmin = role === "ADMIN";

    if(isApiAuthRoute) return;

    if(isAdminRoute){
        if(!isAdmin) return Response.redirect(new URL("/login", nextUrl));
        return;
    }

    if(isAuthRoute){
        if(isLoggedIn){ 
            if(isAdmin) return Response.redirect(new URL(ADMIN, nextUrl));
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return; 
    }

    if(!isLoggedIn && !isPublicroute){
        return Response.redirect(new URL("/login", nextUrl));
    }

    return;
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}