import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: { ClientId: string } }) {
	try {
		const { ClientId } = params;
		const { FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests, BirthDate, Details } = await req.json();

		if (typeof ClientId !== "string" ||
			FirstName == null ||
			LastName == null ||
			CI == null ||
			CNP == null ||
			CompanyId == null ||
			CompanyRole == null ||
			Address == null ||
			Email == null ||
			Phone == null ||
			Interests == null ||
			BirthDate == null ||
			Details == null) {
			return NextResponse.json({ message: "Missing required fields", status: 400 }, { status: 400 });
		}

		const [response]: any = await pool.execute(
			"UPDATE Client SET FirstName = ?, LastName = ?, CI = ?, CNP = ?, CompanyId = ?, CompanyRole = ?, Address = ?, Email = ?, Phone = ?, Interests = ?, BirthDate = ?, Details = ? WHERE ClientId = ?",
			[FirstName, LastName, CI, CNP, CompanyId, CompanyRole, Address, Email, Phone, Interests, BirthDate, Details, ClientId]
		);

		if (response.affectedRows === 0) {
			return NextResponse.json({ message: "Client not found", status: 404 }, { status: 404 });
		}

		return NextResponse.json({ message: "Client updated successfully", status: 200 }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error updating client", status: 500 }, { status: 500 });
	}
}
