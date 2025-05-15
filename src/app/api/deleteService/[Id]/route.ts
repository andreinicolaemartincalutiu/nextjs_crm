import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(req: NextRequest, { params }: { params: { Id: string } }) {
	try {
		const { Id } = params;
		if (!Id) {
			return NextResponse.json({ message: "Service ID is required", status: 400 }, { status: 400 });
		}
		const [response]: any = await pool.execute("DELETE FROM Service WHERE Id = ?", [Id]);

		if (response.affectedRows === 0) {
			return NextResponse.json({ message: "Error deleting service", status: 404 }, { status: 404 });
		}

		return NextResponse.json({ message: "Service deleted successfully", status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error deleting service", status: 500 }, { status: 500 });
	}
}