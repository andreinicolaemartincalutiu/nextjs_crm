import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: { timestamp: string } }) {
	try {
		const timestamp = new Date(params.timestamp);
		if (isNaN(timestamp.getTime())) {
			return NextResponse.json({ message: "Invalid timestamp", status: 400 }, { status: 400 });
		}
		const [response] = await pool.execute("SELECT * FROM Stats ORDER BY Date DESC FETCH NEXT 400 ROWS ONLY;");
		if (!Array.isArray(response)) {
			return NextResponse.json({ message: "Error fetching data", status: 404 }, { status: 404 });
		}
		return NextResponse.json({ response, status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error fetching data", status: 500 }, { status: 500 });
	}
}
