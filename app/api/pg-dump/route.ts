import { NextResponse } from "next/server";
import { database, ref, get } from "@/firebaseConfig";
import { pool } from "@/db";
import { FirebaseDataType } from "@/lib/types";

export async function GET() {
    try {
        // Fetch data from Firebase
        const snapshot = await get(ref(database, "UsersData/47vOEuWZ1LhkzFnizjh4EMwe0Ci2"));
        if (!snapshot.exists()) {
            return NextResponse.json({ message: "No data available" }, { status: 404 });
        }

        const data: FirebaseDataType = snapshot.val();
        console.log("Fetched Data:", data);

        // Insert into PostgreSQL
        const query = `
            INSERT INTO sensor_data (deviceid, humidity, latitude, longitude, moisture, ph, pump, temperature, ultrasonic)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [
            data.deviceid, data.humidity, data.latitude, data.longitude,
            data.moisture, data.ph, data.pump, data.temperature, data.ultrasonic
        ]);

        console.log("Inserted Data:", rows);

        if (data.ultrasonic <= 200) {
            return NextResponse.json({
                status: "success",
                message: "",
                data: data,
                alert: true,
                alertType: "alert",
                alertTitle: "Low Water Level",
                alertDescription: "Water level reached below 200ml"
            });
        }
        else if (data.temperature >= 60) {
            return NextResponse.json({
                status: "success",
                message: "",
                alert: true,
                alertType: "alert",
                alertTitle: "Unusually high temperature observed",
                alertDescription: "Temperature Recorded: " + data.temperature + "°C"
            });
        }
        else {
            return NextResponse.json(rows);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
