import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
	const response = NextResponse.json({ message: "Logout successful" });

	// Set the cookie to invalidate
	try {
		response.headers.set(
			"Set-Cookie",
			serialize("enkot", "", {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: -1, // Invalidate the cookie
				path: "/",
			})
		);
	} catch {
		return NextResponse.json({ message: "Failed to logout user" }, { status: 500 });
	}

	return response;
}

export function OPTIONS() {
	return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
