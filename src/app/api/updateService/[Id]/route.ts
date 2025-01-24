import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { Id: string } }) {
	const { Id } = params;
	const { Name, Description, Price } = await req.json();

	if (typeof Id !== "string") {
		return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
	}

	if (!Name || !Description || !Price) {
		return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
	}

	try {
		const result: any = await pool.query(
			"UPDATE Service SET Name = ?, Description = ?, Price = ? WHERE Id = ?",
			[Name, Description, Price, Id]
		);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "Service not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Service updated successfully" }, { status: 200 });
	} catch (error) {
		console.log("Error updating service:", error);
		return NextResponse.json({ message: "Error updating service" }, { status: 500 });
	}
}
