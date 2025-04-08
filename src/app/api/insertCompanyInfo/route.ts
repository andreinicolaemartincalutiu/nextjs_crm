import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, Email, Region, Employees, DataYear, Profit, Loss, Turnover, Capital, Liabilities, Assets, IsActive } = body;

		if (!CompanyName || !TVA || !Shareholders || !CIF || !COM || !Headquarter || !Subsidiary || !MainActivity || !SecondaryActivity || !Interests || !Email || !Region || !Employees || !DataYear || !Profit || !Loss || !Turnover || !Capital || !Liabilities || !Assets || !IsActive) {
			return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
		}

		const result: any = await pool.query(
			"INSERT INTO CompanyInfo (CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, Email, Region, Employees, DataYear, Profit, Loss, Turnover, Capital, Liabilities, Assets, IsActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			[CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, Email, Region, Employees, DataYear, Profit, Loss, Turnover, Capital, Liabilities, Assets, IsActive]
		);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "Failed to insert company info" }, { status: 500 });
		}

		return NextResponse.json({ message: "Company info inserted successfully" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error inserting company info" }, { status: 500 });
	}
}
