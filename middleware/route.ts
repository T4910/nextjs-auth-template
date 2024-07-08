// BY DEFAULT, ALL ROUTES IN THE APPLICATION ARE PROTECTED


/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const AUTH = [
    "/login",
    "/signup",
    "/email-verification"
];


/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const PUBLIC = [
    "/",
    "/about"
]


/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";


/**
 * The prefix for API authentication routes
 * Routes that start with this prefix arae used for API authentication purposes
 * @type {string}
 */
export const AUTHAPI = "/api/auth";