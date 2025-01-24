import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { CompanyId: string } }) {
	const { CompanyId } = params;
	const { CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, Email, Region, Employees } = await req.json();

	if (typeof CompanyId !== "string") {
		return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
	}

	if (!CompanyName || !TVA || !Shareholders || !CIF || !COM || !Headquarter || !Subsidiary || !MainActivity || !SecondaryActivity || !Interests || !Email || !Region || !Employees) {
		return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
	}

	try {
		const result: any = await pool.query(
			"UPDATE CompanyInfo SET CompanyName = ?, TVA = ?, Shareholders = ?, CIF = ?, COM = ?, Headquarter = ?, Subsidiary = ?, MainActivity = ?, SecondaryActivity = ?, Interests = ?, Email = ?, Region = ?, Employees = ? WHERE CompanyId = ?",
			[CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, Email, Region, Employees, CompanyId]
		);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "Company info not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Company info updated successfully" }, { status: 200 });
	} catch (error) {
		console.log("Error updating company info:", error);
		return NextResponse.json({ message: "Error updating company info" }, { status: 500 });
	}
}
