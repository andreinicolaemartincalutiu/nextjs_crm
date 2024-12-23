import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, Email, Region, Employees } = body;

		if (!CompanyName || !TVA || !Shareholders || !CIF || !COM || !Headquarter || !Subsidiary || !MainActivity || !SecondaryActivity || !Interests || !Email || !Region || !Employees) {
			return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
		}

		const result: any = await pool.query(
			"INSERT INTO CompanyInfo (CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, Email, Region, Employees) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, Email, Region, Employees]
		);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "Failed to insert company info" }, { status: 500 });
		}

		return NextResponse.json({ message: "Company info inserted successfully" }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Error inserting company info" }, { status: 500 });
	}
}
