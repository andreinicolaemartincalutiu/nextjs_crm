import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: { Id: string } }) {
	try {
		const { Id } = params;
		const { Name, Description, Price } = await req.json();

		if (typeof Id !== "string" || Name == null || Description == null || Price == null) {
			return NextResponse.json({ message: "Missing required fields", status: 400 }, { status: 400 });
		}

		const [response]: any = await pool.execute(
			"UPDATE Service SET Name = ?, Description = ?, Price = ? WHERE Id = ?",
			[Name, Description, Price, Id]
		);

		if (response.affectedRows === 0) {
			return NextResponse.json({ message: "Error updating service", status: 404 }, { status: 404 });
		}

		return NextResponse.json({ message: "Service updated successfully", status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error updating service", status: 500 }, { status: 500 });
	}
}
