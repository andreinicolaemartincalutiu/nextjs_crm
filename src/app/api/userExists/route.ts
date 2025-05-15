import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: NextRequest) {
	try {
		const { Email } = await req.json();

		if (!Email) {
			return NextResponse.json({ message: "Missing required fields", status: 400 }, { status: 400 });
		}

		const [response]: any = await pool.execute(
			"SELECT * FROM Employee WHERE Email = ?",
			[Email]
		);

		if (response.affectedRows === 0) {
			return NextResponse.json({ message: "User not found", status: 404 }, { status: 404 });
		}

		return NextResponse.json({ response, status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error fetching users", status: 500 }, { status: 500 });
	}
}
