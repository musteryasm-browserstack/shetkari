import { NextResponse } from "next/server";

if (!process.env.ROBOFLOW_API_KEY) {
  throw new Error("ROBOFLOW_API_KEY is not defined in environment variables");
}

const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
const PEST_MODEL_URL = `https://detect.roboflow.com/pest-detection-0sv8g/3?api_key=${ROBOFLOW_API_KEY}`;
const DISEASE_MODEL_URL = `https://detect.roboflow.com/crop-disease-identification/9?api_key=${ROBOFLOW_API_KEY}`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Send image to Pest Detection Model
    const pestResponse = await fetch(PEST_MODEL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: buffer,
    });

    // Send image to Crop Disease Model
    const diseaseResponse = await fetch(DISEASE_MODEL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: buffer,
    });

    if (!pestResponse.ok || !diseaseResponse.ok) {
      return NextResponse.json(
        { error: "Error analyzing image with Roboflow" },
        { status: 500 }
      );
    }

    const pestData = await pestResponse.json();
    const diseaseData = await diseaseResponse.json();

    // Extract confidence levels
    const maxConfidence = Math.max(
      pestData?.predictions[0]?.confidence || 0,
      diseaseData?.predictions[0]?.confidence || 0
    );

    // Prepare response
    const response = {
      type: "Combined Detection",
      location: "Multiple areas",
      confidence: maxConfidence,
      affectedArea: "Multiple regions",
      recommendation: "Apply integrated pest management strategies",
      details: {
        pest_detection: pestData.predictions || [],
        crop_disease: diseaseData.predictions || [],
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Roboflow Prediction Error:", error);
    return NextResponse.json(
      { error: "Error processing the image" },
      { status: 500 }
    );
  }
}
