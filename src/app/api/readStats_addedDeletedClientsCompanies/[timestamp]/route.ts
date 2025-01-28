import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { timestamp: string } }) {
	const timestamp = new Date(params.timestamp);
	if (isNaN(timestamp.getTime())) {
		return new NextResponse("Invalid timestamp", { status: 400 });
	}

	try {
		const [rows] = await pool.query("SELECT * FROM Stats ORDER BY Date DESC FETCH NEXT 400 ROWS ONLY;");

		return new Response(JSON.stringify(rows), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: "Error fetching users" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
