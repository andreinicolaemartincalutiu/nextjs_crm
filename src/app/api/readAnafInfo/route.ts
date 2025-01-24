import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { an, CIF } = await request.json();

	if (!an || !CIF) {
		return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
	}
	try {
		const response = await fetch(`https://webservicesp.anaf.ro/bilant?an=${an}&cui=${encodeURIComponent(CIF)}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			},
		});
		console.log(1);
		const data = await response.json();
		console.log(2);
		return NextResponse.json(data, { status: 200 });

	} catch (error: any) {
		return NextResponse.json({ message: "Error fetching Anaf data" }, { status: 500 });
	}
};
