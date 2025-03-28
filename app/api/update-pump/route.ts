import { NextResponse } from "next/server";
import { database, ref, get, update } from "@/firebaseConfig";
import { FirebaseDataType } from "@/lib/types";

export async function PUT(request: Request) {
    const body = await request.json();
    const { pump } = body;

    try {
        // Fetch data from Firebase
        const snapshot = await get(ref(database, "UsersData/47vOEuWZ1LhkzFnizjh4EMwe0Ci2"));
        if (!snapshot.exists()) {
            return NextResponse.json({ message: "No data available" }, { status: 404 });
        }

        const data: FirebaseDataType = snapshot.val();
        console.log("Fetched Data:", data);

        if (data.moisture > 80) {
            // Reference to the specific Firebase path
            const pumpRef = ref(database, "UsersData/47vOEuWZ1LhkzFnizjh4EMwe0Ci2");

            // Update only the 'pump' value
            await update(pumpRef, { pump: 0 });
            return NextResponse.json({ status: "success", message: "Moisture value greater than 80%. Pump already in motion.", pump });
        }

        // Validate that the pump value is between 1 and 10
        if (typeof pump !== "number" || pump < 1 || pump > 10) {
            return NextResponse.json({ error: "Invalid pump value. Must be between 1 and 10." }, { status: 400 });
        }

        // Reference to the specific Firebase path
        const pumpRef = ref(database, "UsersData/47vOEuWZ1LhkzFnizjh4EMwe0Ci2");

        // Update only the 'pump' value
        await update(pumpRef, { pump });

        return Response.json({ status: "success", message: "Pump value updated successfully", pump });
    } catch (error) {
        return Response.json({ status: "error", error: "Internal Server Error" }, { status: 500 });
    }

}