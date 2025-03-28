import { pool } from "@/db";

export async function GET(request: Request) {
    console.log(request);
    const query = `
        SELECT id, ultrasonic, reading_time
        FROM sensor_data
        ORDER BY reading_time, id DESC;
    `;

    try {
        const { rows } = await pool.query(query);
        if (rows) {
            return Response.json({ status: "success", message: "Fetched successfully", data: rows });
        }
    } catch (error) {
        console.log(error);
        return Response.json({ status: "error", message: "Error fetching", data: null });
    }
}