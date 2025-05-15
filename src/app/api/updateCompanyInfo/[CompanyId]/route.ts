import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: { CompanyId: string } }) {
	try {
		const { CompanyId } = params;
		const { CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, Email,
			Region, Employees, DataYear, Profit, Loss, Turnover, Capital, Liabilities, Assets, IsActive } = await req.json();

		if (typeof CompanyId !== "string" ||
			CompanyName == null ||
			TVA == null ||
			Shareholders == null ||
			CIF == null ||
			COM == null ||
			Headquarter == null ||
			Subsidiary == null ||
			MainActivity == null ||
			SecondaryActivity == null ||
			Interests == null ||
			Email == null ||
			Region == null ||
			Employees == null ||
			DataYear == null ||
			Profit == null ||
			Loss == null ||
			Turnover == null ||
			Capital == null ||
			Liabilities == null ||
			Assets == null ||
			IsActive == null) {
			return NextResponse.json({ message: "Missing required fields", status: 400 }, { status: 400 });
		}

		const [response]: any = await pool.execute(
			"UPDATE CompanyInfo SET CompanyName = ?, TVA = ?, Shareholders = ?, CIF = ?, COM = ?, Headquarter = ?, Subsidiary = ?, MainActivity = ?, SecondaryActivity = ?, Interests = ?, Email = ?, Region = ?, Employees = ?, DataYear = ?, Profit = ?, Loss = ?, Turnover = ?, Capital = ?, Liabilities = ?, Assets = ?, IsActive = ? WHERE CompanyId = ?",
			[CompanyName, TVA, Shareholders, CIF, COM, Headquarter, Subsidiary, MainActivity, SecondaryActivity, Interests, Email, Region, Employees, DataYear, Profit, Loss, Turnover, Capital, Liabilities, Assets, IsActive, CompanyId]
		);

		if (response.affectedRows === 0) {
			return NextResponse.json({ message: "Company info not found", status: 404 }, { status: 404 });
		}

		return NextResponse.json({ message: "Company info updated successfully", status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error updating company info", status: 500 }, { status: 500 });
	}
}
