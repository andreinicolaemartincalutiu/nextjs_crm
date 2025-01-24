import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { Id: string } }) {
	try {
		const { Id } = params;

		if (!Id) {
			return NextResponse.json({ message: "Service ID is required" }, { status: 400 });
		}

		const result: any = await pool.query("DELETE FROM Service WHERE Id = ?", [Id]);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "Service not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Service deleted successfully" }, { status: 200 });
	} catch (error) {
		console.log("Error deleting service:", error);
		return NextResponse.json({ message: "Error deleting service" }, { status: 500 });
	}
}