import pool from "@/lib/db";

export async function GET(request: Request) {
	try {
		const [rows] = await pool.query("SELECT * FROM Stats");
		return new Response(JSON.stringify(rows), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ message: "Error fetching users" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
