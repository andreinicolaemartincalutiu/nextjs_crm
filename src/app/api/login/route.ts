import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
	try {
		const { Email, Password } = await req.json();
		console.log(Password);
		if (!Email || !Password) {
			return NextResponse.json({ message: "Missing required fields", status: 400 }, { status: 400 });
		}

		const [response]: any = await pool.execute("SELECT * FROM Employee WHERE Email = ?", [Email]);
		const user = (response as any[])[0];

		if (!user) {
			return NextResponse.json({ message: "User not found", status: 404 }, { status: 404 });
		}

		const isMatch = await bcrypt.compare(Password, user.Password);
		if (!isMatch) {
			return NextResponse.json({ message: "Invalid password", status: 401 }, { status: 401 });
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
		const resp = NextResponse.json({ response, status: 200 }, { status: 200 });
		resp.headers.set("Set-Cookie", cookie);
		return resp;

	} catch (error) {
		return NextResponse.json({ message: "Connection failed", status: 500 }, { status: 500 });
	}
}
