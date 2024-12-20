import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { Email: string } }) {
	const { Email } = params;
	const { Password } = await req.json();

	if (typeof Email !== "string") {
		return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
	}

	if (!Password) {
		return NextResponse.json({ message: "Missing required information" }, { status: 400 });
	}

	try {
		const result: any = await pool.query(
			"UPDATE Employee SET Password = ? WHERE Email = ?",
			[Password, Email]
		);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error updating password:", error);
		return NextResponse.json({ message: "Error updating password" }, { status: 500 });
	}
}
