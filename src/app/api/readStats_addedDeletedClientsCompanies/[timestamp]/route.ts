import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { timestamp: string } }) {
	const timestamp = new Date(params.timestamp);
	if (isNaN(timestamp.getTime())) {
		return NextResponse.json({ message: "Invalid timestamp", status: 400 });
	}

	try {
		const [rows] = await pool.execute("SELECT * FROM Stats ORDER BY Date DESC FETCH NEXT 400 ROWS ONLY;");

		return NextResponse.json(rows, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error fetching users", status: 500 });
	}
};
