import { NextRequest, NextResponse } from 'next/server';
import pool from "@/lib/db";

interface QueryResult {
	TotalClientSMS: number;
	TotalClientEmail: number;
	TotalCompanyEmail: number;
}

export async function GET(req: NextRequest, { params }: { params: { timestamp: string } }) {
	try {
		const timestamp = new Date(params.timestamp);
		if (isNaN(timestamp.getTime())) {
			return NextResponse.json({ message: "Invalid timestamp", status: 400 }, { status: 400 });
		}

		const [rows] = await pool.execute("SELECT SQL_NO_CACHE COALESCE(SUM(clientSMS), 0) AS TotalClientSMS, COALESCE(SUM(clientEmail), 0) AS TotalClientEmail, COALESCE(SUM(companyEmail), 0) AS TotalCompanyEmail FROM Status WHERE Date = CURDATE();");
		const response: QueryResult[] = rows as QueryResult[];

		const resp = NextResponse.json({ response, status: 200 }, {
			status: 200,
			headers: {
				"Cache-Control": "no-store, max-age=0, no-cache, must-revalidate, proxy-revalidate",
				"Pragma": "no-cache",
				"Expires": "0"
			},
		});
		resp.headers.set("Cache-Control", "no-store, max-age=0, no-cache, must-revalidate, proxy-revalidate");
		resp.headers.set("Pragma", "no-cache");
		resp.headers.set("Expires", "0");
		return resp;
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		const errorResponse = NextResponse.json({
			message: errorMessage,
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
}
