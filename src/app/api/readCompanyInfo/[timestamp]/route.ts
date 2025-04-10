import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request, { params }: { params: { timestamp: string } }) {
	const timestamp = new Date(params.timestamp);
	if (isNaN(timestamp.getTime())) {
		return NextResponse.json({ message: "Invalid timestamp", status: 400 });
	}

	try {
		const [rows] = await pool.execute("SELECT * FROM CompanyInfo");
		return NextResponse.json(rows, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error fetching company info", status: 500 });
	}
}
