import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = ['/home', '/clients', '/company_info', '/services', '/settings'];

export function middleware(request: NextRequest) {
	const token = request.cookies.get('enkot'); // Replace with your cookie name

	// Check if the route is protected
	if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
		if (!token) {
			// Redirect to login if no valid token is found
			const loginUrl = new URL('/', request.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	// Proceed as normal if token exists
	return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
	matcher: ['/home/:path*', '/clients/:path*', '/company_info/:path*', '/services/:path*', '/settings/:path*'], // Define specific protected routes here
};
