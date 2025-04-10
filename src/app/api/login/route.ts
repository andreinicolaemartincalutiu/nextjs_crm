import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { SignJWT } from "jose";

export async function POST(request: Request) {
	try {
		const { Email, Password } = await request.json();

		if (!Email || !Password) {
			return NextResponse.json({ message: "Missing required fields", status: 400 });
		}

		const [result]: any = await pool.execute(
			"SELECT * FROM Employee WHERE Email = ? AND Password = ?",
			[Email, Password]
		);

		const user = (result as any[])[0];

		if (!user) {
			return NextResponse.json({ message: "User not found", status: 404 });
		}

		const token = new TextEncoder().encode(process.env.JWT_SECRET);
		const jwt = await new SignJWT({ email: user.Email })
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime("1h")
			.sign(token);

		const cookie = serialize("auth-token", jwt, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60, // 1 hour
			path: "/",
			sameSite: "lax",
		});
		const response = NextResponse.json(result, { status: 200 });
		response.headers.set("Set-Cookie", cookie);
		return response;

	} catch (error) {
		return NextResponse.json({ message: "Connection failed", status: 500 });
	}
};
