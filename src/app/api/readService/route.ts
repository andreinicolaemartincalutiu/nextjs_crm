import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db";

export async function GET() {
	try {
		const [rows] = await pool.query("SELECT * FROM Service");
		return NextResponse.json(rows, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error fetching services" }, { status: 500 });
	}
}
