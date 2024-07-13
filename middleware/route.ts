// BY DEFAULT, ALL ROUTES IN THE APPLICATION ARE PROTECTED


/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const AUTH: string[] = [
    "/login",
    "/signup",
    "/reset-password",
    "/change-password"
];


/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const PUBLIC: string[] = [
    "/email-verification",
    "/",
    "/about"
]


/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";


/**
 * The prefix for API authentication routes
 * Routes that start with this prefix arae used for API authentication purposes
 * @type {string}
 */
export const AUTHAPI: string = "/api/auth";


/**
 * The prefix for ADMIN routes
 * Routes that start with this prefix are used for admin  purposes
 * @type {string}
 */
export const ADMIN: string = "/admin";