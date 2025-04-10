import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { Name, Description, Price } = body;

		if (!Name || !Description || !Price) {
			return NextResponse.json({ message: "Missing required fields", status: 400 });
		}

		const result: any = await pool.execute(
			"INSERT INTO Service (Name, Description, Price) VALUES (?, ?, ?)",
			[Name, Description, Price]
		);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "Failed to insert new service", status: 500 });
		}

		return NextResponse.json({ message: "Service inserted successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error inserting service info", status: 500 });
	}
}
