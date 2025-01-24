import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
	try {
		const [rows] = await pool.query("SELECT * FROM CompanyInfo");
		return NextResponse.json(rows, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error fetching company info" }, { status: 500 });
	}
}
