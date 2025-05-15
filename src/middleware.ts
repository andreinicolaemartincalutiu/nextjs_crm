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

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (protectedRoutes.some(route => pathname.startsWith(route))) {
		const token = req.cookies.get("auth-token")?.value;

		if (!token || !(await isValidToken(token))) {
			const loginUrl = new URL("/", req.url);
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
