import pool from "@/lib/db";

export async function GET(request: Request) {
	try {
		const [rows] = await pool.query("CALL get_multiple_totals()");

		// if (rows[0].length === 0) {
		// 	return Response.json({ message: "Failed to insert new service" }, { status: 500 });
		// }

		return new Response(JSON.stringify(rows), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: "Error fetching users" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
