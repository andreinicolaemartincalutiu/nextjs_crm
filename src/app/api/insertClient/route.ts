import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
	const { FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests, BirthDate, Details } = await req.json();

	if (FirstName == null ||
		LastName == null ||
		CI == null ||
		CNP == null ||
		CompanyId == null ||
		CompanyRole == null ||
		Address == null ||
		Email == null ||
		Phone == null ||
		Interests == null ||
		BirthDate == null ||
		Details == null) {
		return NextResponse.json({ message: "Missing required fields", status: 400 }, { status: 400 });
	}

	try {
		const [response]: any = await pool.execute(
			"INSERT INTO Client (FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests, BirthDate, Details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests, BirthDate, Details]
		);

		if (response.affectedRows === 0) {
			return NextResponse.json({ message: "Failed to insert company info", status: 404 }, { status: 404 });
		}

		return NextResponse.json({ message: "Company info inserted successfully", status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error inserting company info", status: 500 }, { status: 500 });
	}
}
