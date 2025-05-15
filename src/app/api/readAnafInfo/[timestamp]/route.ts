import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { timestamp: string } }) {
	try {
		const timestamp = new Date(params.timestamp);
		const { an, CIF } = await req.json();

		if (isNaN(timestamp.getTime()) || !an || !CIF) {
			return NextResponse.json({ message: "Missing required fields", status: 400 }, { status: 400 });
		}

		const resp = await fetch(`https://webservicesp.anaf.ro/bilant?an=${an}&cui=${encodeURIComponent(CIF)}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			},
		});
		const response = await resp.json();
		return NextResponse.json({ response, status: 200 }, { status: 200 });

	} catch (error: any) {
		return NextResponse.json({ message: "Error fetching Anaf data", status: 500 }, { status: 500 });
	}
}
