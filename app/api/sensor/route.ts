import { pool } from "@/db";
// import { response } from "express";

export async function POST(request: Request) {
    const body = await request.json();
    const { api_key, sensor, location, value1, value2, value3 } = body;
    console.log("Received Data:", { sensor, location, value1, value2, value3 });

    // Replace with your actual API key
    const VALID_API_KEY = "tPmAT5Ab3j7F9";
    console.log("API Key: ", process.env.VALID_API_KEY);

    if (api_key !== VALID_API_KEY) {
        return Response.json({ message: "Invalid API Key" });
    }

    if (!sensor || !location || !value1 || !value2 || !value3) {
        return Response.json({ message: "Missing required parameters" });
    }

    const query = `
        INSERT INTO sensor_data (sensor, location, value1, value2, value3)
        VALUES ($$${sensor}$$, $$${location}$$, $$${value1}$$, $$${value2}$$4, $$${value3}$$)
        RETURNING *;
    `;
    console.log(query);

    try {
        const { rows } = await pool.query(query);
        if (rows) {
            console.log(rows, "Data inserted successfully!");
            return Response.json({ message: "Data received successfully" });
        }
    } catch (error) {
        console.log(error);
    }
};

//for realtime query
export async function GET() {
    const query = `
        SELECT * FROM sensor_data
        ORDER BY created_at DESC
        LIMIT 1;
    `;

    try {
        const { rows } = await pool.query(query);
        if (rows.length > 0) {
            return Response.json(rows[0]);
        } else {
            return Response.json({ message: "No data found" });
        }
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Error fetching data" });
    }
}