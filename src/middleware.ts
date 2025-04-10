import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from "jose";

const protectedRoutes = ['/home', '/clients', '/company_info', '/services', '/settings'];
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function isValidToken(token: string): Promise<boolean> {
	try {
		const { payload } = await jwtVerify(token, secret);
		return true;
	} catch (err) {
		console.warn("Invalid token:", err);
		return false;
	}
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (protectedRoutes.some(route => pathname.startsWith(route))) {
		const token = request.cookies.get("auth-token")?.value;

		if (!token || !(await isValidToken(token))) {
			const loginUrl = new URL("/", request.url);
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
