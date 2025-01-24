import pool from "@/lib/db";
import { serialize } from "cookie";

export async function PUT(request: Request) {
	try {
		const { Email, Password, SessionID } = await request.json();

		if (!Email || !Password) {
			return new Response(JSON.stringify({ message: "Missing required fields" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const result: any = await pool.query(
			"SELECT * FROM Employee WHERE Email = ? AND Password = ?",
			[Email, Password]
		);

		if (result[0].length === 0) {
			return new Response(JSON.stringify({ message: "User not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}

		const response = new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});

		const token = SessionID;

		const cookie = serialize("enkot", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60, // 1 hour
			path: "/",
		});
		response.headers.append("Set-Cookie", cookie);

		return response;
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: "Error fetching users" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
