import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { an, CIF } = await request.json();

    if (!an || !CIF) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    try {
        const response = await fetch(`https://webservicesp.anaf.ro/bilant?an=${an}&cui=${encodeURIComponent(CIF)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${process.env.THIRD_PARTY_API_KEY || ''}`,
            },
        });
        console.log(1);
        const data = await response.json();
        console.log(2);
        return NextResponse.json(data, { status: 200 });
        // await fetch(`https://webservicesp.anaf.ro/bilant?an=${an}&cui=${encodeURIComponent(CIF)}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // Authorization: `Bearer ${process.env.THIRD_PARTY_API_KEY || ''}`,
        //     },
        // }).then(response => response.json())
        //     .then(data => {
        //         console.log(2);
        //         return NextResponse.json(data, {
        //             status: 200
        //         });
        //     })
    } catch (error: any) {
        return NextResponse.json({ message: "Error fetching Anaf data" }, { status: 500 });
    }
};

// Example third-party API call
        // const response = await fetch(`https://webservicesp.anaf.ro/bilant?an=${an}&cui=${encodeURIComponent(CIF)}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // Authorization: `Bearer ${process.env.THIRD_PARTY_API_KEY || ''}`,
        //     },
        // });
        // console.log(1);

        // if (!response.ok) {
        //     throw new Error(`Failed to fetch: ${response.statusText}`);
        // }
        // console.log(2);

        // const data = await response.json();
        // console.log(3);

        // return new Response(JSON.stringify(data), {
        //     status: 200,
        //     headers: { "Content-Type": "application/json" },
        // });