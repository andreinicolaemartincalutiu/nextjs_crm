import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
	const { FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests, BirthDate, Details } = await req.json();

	if (!FirstName || !LastName || !CI || !CNP || !CompanyId || !CompanyRole || !Address || !Email || !Phone || !Interests || !BirthDate || !Details) {
		return NextResponse.json({ message: "Missing required fields", status: 400 });
	}

	try {
		const result: any = await pool.execute(
			"INSERT INTO Client (FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests, BirthDate, Details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests, BirthDate, Details]
		);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "Failed to insert company info", status: 500 });
		}

		return NextResponse.json({ message: "Company info inserted successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error inserting company info", status: 500 });
	}
}
