import db from "@/lib/db";
import { NextResponse } from 'next/server';

interface QueryResult {
	TotalClientSMS: number;
	TotalClientEmail: number;
	TotalCompanyEmail: number;
}

export async function GET(req: Request, { params }: { params: { timestamp: string } }) {

	const timestamp = new Date(params.timestamp);
	if (isNaN(timestamp.getTime())) {
		return NextResponse.json({ message: "Invalid timestamp", status: 400 });
	}

	try {
		const [rows] = await db.execute("SELECT SQL_NO_CACHE COALESCE(SUM(clientSMS), 0) AS TotalClientSMS, COALESCE(SUM(clientEmail), 0) AS TotalClientEmail, COALESCE(SUM(companyEmail), 0) AS TotalCompanyEmail FROM Status WHERE Date = CURDATE();");

		const result: QueryResult[] = rows as QueryResult[];

		const response = NextResponse.json(result, {
			status: 200,
			headers: {
				"Cache-Control": "no-store, max-age=0, no-cache, must-revalidate, proxy-revalidate",
				"Pragma": "no-cache",
				"Expires": "0"
			},
		});
		response.headers.set("Cache-Control", "no-store, max-age=0, no-cache, must-revalidate, proxy-revalidate");
		response.headers.set("Pragma", "no-cache");
		response.headers.set("Expires", "0");
		return response;
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		const errorResponse = NextResponse.json({ 
			error: errorMessage,
			status: 500,
			headers: {
				"Cache-Control": "no-store, max-age=0, no-cache, must-revalidate, proxy-revalidate",
				"Pragma": "no-cache",
				"Expires": "0"
			},
		});
		errorResponse.headers.set("Cache-Control", "no-store, max-age=0, no-cache, must-revalidate, proxy-revalidate");
		errorResponse.headers.set("Pragma", "no-cache");
		errorResponse.headers.set("Expires", "0");
		return errorResponse;
	}
};
