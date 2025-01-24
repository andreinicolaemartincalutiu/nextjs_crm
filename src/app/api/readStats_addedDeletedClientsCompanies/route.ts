import pool from "@/lib/db";

export async function GET() {
	try {
		const [rows] = await pool.query("SELECT * FROM Stats ORDER BY Date DESC FETCH NEXT 400 ROWS ONLY;");

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
