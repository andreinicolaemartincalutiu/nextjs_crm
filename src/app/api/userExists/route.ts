import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(request: Request) {
	try {
		const { Email } = await request.json();

		if (!Email) {
			return NextResponse.json({ message: "Missing required fields", status: 400 });
		}

		const result: any = await pool.execute(
			"SELECT * FROM Employee WHERE Email = ?",
			[Email]
		);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "User not found", status: 404 });
		}

		const response = NextResponse.json(result, { status: 200 });

		return response;
	} catch (error) {
		return NextResponse.json({ message: "Error fetching users", status: 500 });
	}
};
