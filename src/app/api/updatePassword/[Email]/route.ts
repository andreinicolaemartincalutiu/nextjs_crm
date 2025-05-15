import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest, { params }: { params: { Email: string } }) {
	try {
		const { Email } = params;
		const { Password } = await req.json();

		if (typeof Email !== "string" || !Password) {
			return NextResponse.json({ message: "Missing required information", status: 400 }, { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(Password, 10);

		const [response]: any = await pool.execute(
			"UPDATE Employee SET Password = ? WHERE Email = ?",
			[hashedPassword, Email]
		);

		if (response.affectedRows === 0) {
			return NextResponse.json({ message: "Error updating password", status: 404 }, { status: 404 });
		}

		return NextResponse.json({ message: "Password updated successfully", status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error updating password", status: 500 }, { status: 500 });
	}
}
