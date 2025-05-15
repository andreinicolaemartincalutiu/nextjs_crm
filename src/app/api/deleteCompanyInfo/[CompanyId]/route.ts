import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(req: NextRequest, { params }: { params: { CompanyId: string } }) {
	try {
		const { CompanyId } = params;

		if (!CompanyId) {
			return NextResponse.json({ message: "CompanyInfo ID is required", status: 400 }, { status: 400 });
		}

		const [response]: any = await pool.execute("DELETE FROM CompanyInfo WHERE CompanyId = ?", [CompanyId]);

		if (response.affectedRows === 0) {
			return NextResponse.json({ message: "CompanyInfo not found", status: 404 }, { status: 404 });
		}

		return NextResponse.json({ message: "CompanyInfo deleted successfully", status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error deleting CompanyInfo", status: 500 }, { status: 500 });
	}
}