import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(req: NextRequest, { params }: { params: { ClientId: string } }) {
	try {
		const { ClientId } = params;

		if (!ClientId) {
			return NextResponse.json({ message: "Client ID is required", status: 400 }, { status: 400 });
		}

		const [response]: any = await pool.execute("DELETE FROM Client WHERE ClientId = ?", [ClientId]);

		if (response.affectedRows === 0) {
			return NextResponse.json({ message: "Client not found", status: 404 }, { status: 404 });
		}

		return NextResponse.json({ message: "Client deleted successfully", status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error deleting client", status: 500 }, { status: 500 });
	}
}
