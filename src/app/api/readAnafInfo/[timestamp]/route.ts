import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { timestamp: string } }) {
	const timestamp = new Date(params.timestamp);
	if (isNaN(timestamp.getTime())) {
		return NextResponse.json({ message: "Invalid timestamp", status: 400 });
	}

	const { an, CIF } = await req.json();

	if (!an || !CIF) {
		return NextResponse.json({ message: "Missing required fields", status: 400 });
	}
	try {
		const response = await fetch(`https://webservicesp.anaf.ro/bilant?an=${an}&cui=${encodeURIComponent(CIF)}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			},
		});
		const data = await response.json();
		return NextResponse.json(data, { status: 200 });

	} catch (error: any) {
		return NextResponse.json({ message: "Error fetching Anaf data", status: 500 });
	}
};
