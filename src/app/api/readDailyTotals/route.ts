import db from "@/lib/db";
import { NextResponse } from 'next/server';

interface QueryResult {
	TotalClientSMS: number;
	TotalClientEmail: number;
	TotalCompanyEmail: number;
}

export async function GET() {
	try {
		const [rows] = await db.query("SELECT SQL_NO_CACHE COALESCE(SUM(clientSMS), 0) AS TotalClientSMS, COALESCE(SUM(clientEmail), 0) AS TotalClientEmail, COALESCE(SUM(companyEmail), 0) AS TotalCompanyEmail FROM Status WHERE Date = CURDATE();");

		console.log(rows)

		const result: QueryResult[] = rows as QueryResult[];

		const response = NextResponse.json(result, { status: 200 });
		response.headers.set("Cache-Control", "no-store");
		return response;
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		const errorResponse = NextResponse.json({ error: errorMessage }, { status: 500 });
		errorResponse.headers.set("Cache-Control", "no-store");
		return errorResponse;
	}
};
