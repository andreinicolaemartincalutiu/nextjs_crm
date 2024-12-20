import pool from "@/lib/db";

export async function PUT(request: Request) {
	try {
		const { Email } = await request.json();

		if (!Email) {
			return new Response(JSON.stringify({ message: "Missing required fields" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		const result: any = await pool.query(
			"SELECT * FROM Employee WHERE Email = ?",
			[Email]
		);

		if (result[0].length === 0) {
			return new Response(JSON.stringify({ message: "User not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}

		const response = new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});

		return response;
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ message: "Error fetching users" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
