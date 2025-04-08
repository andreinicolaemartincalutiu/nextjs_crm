import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { firstName, lastName, clientSMS, clientEmail, companyEmail } = body;

		if (!firstName || !lastName || !clientSMS || !clientEmail || !companyEmail) {
			return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
		}

		let currentDate = getCurrentDate();
		const result: any = await pool.query("CALL insert_update_status(?, ?, ?, ?, ?, ?)", [currentDate, firstName, lastName, clientSMS, clientEmail, companyEmail]);

		if (result[0].length === 0) {
			return NextResponse.json({ message: "Failed to insert new service" }, { status: 500 });
		}

		return NextResponse.json({ message: "Service inserted successfully" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error inserting service info" }, { status: 500 });
	}
}

function getCurrentDate() {
	const today = new Date();

	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading 0
	const day = String(today.getDate()).padStart(2, "0"); // Add leading 0

	return `${year}-${month}-${day}`;
}
