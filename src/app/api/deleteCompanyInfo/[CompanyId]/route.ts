import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { CompanyId: string } }) {
	try {
		const { CompanyId } = params;

		if (!CompanyId) {
			return NextResponse.json({ message: "CompanyInfo ID is required", status: 400 });
		}

		const result: any = await pool.execute("DELETE FROM CompanyInfo WHERE CompanyId = ?", [CompanyId]);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "CompanyInfo not found", status: 404 });
		}

		return NextResponse.json({ message: "CompanyInfo deleted successfully", status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error deleting CompanyInfo", status: 500 });
	}
}