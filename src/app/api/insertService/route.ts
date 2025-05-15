import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
	try {
		const { Name, Description, Price } = await req.json();
		if (Name == null || Description == null || Price == null) {
			return NextResponse.json({ message: "Missing required fields", status: 400 }, { status: 400 });
		}

		const [response]: any = await pool.execute(
			"INSERT INTO Service (Name, Description, Price) VALUES (?, ?, ?)",
			[Name, Description, Price]
		);

		if (response.affectedRows === 0) {
			return NextResponse.json({ message: "Failed to insert new service", status: 404 }, { status: 404 });
		}
		return NextResponse.json({ message: "Service inserted successfully", status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error inserting service info", status: 500 }, { status: 500 });
	}
}
