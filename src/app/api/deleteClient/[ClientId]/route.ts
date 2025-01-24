import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(request: Request, { params }: { params: { ClientId: string } }) {
	try {
		const { ClientId } = params;

		if (!ClientId) {
			return NextResponse.json({ message: "Client ID is required" }, { status: 400 });
		}

		const result: any = await pool.query("DELETE FROM Client WHERE ClientId = ?", [ClientId]);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "Client not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Client deleted successfully" }, { status: 200 });
	} catch (error) {
		console.log("Error deleting client:", error);
		return NextResponse.json({ message: "Error deleting client" }, { status: 500 });
	}
}
