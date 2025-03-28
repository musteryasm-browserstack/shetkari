import { NextApiRequest, NextApiResponse } from "next";
import { Roboflow } from "roboflow";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

if (!process.env.ROBOFLOW_API_KEY) {
  throw new Error("ROBOFLOW_API_KEY is not defined in the environment variables");
}
const rf = new Roboflow({ apiKey: process.env.ROBOFLOW_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to parse the file" });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = file.filepath;

    try {
      // Select Roboflow models
      const pestProject = rf.workspace().project("pest-detection-0sv8g");
      const pestModel = pestProject.version(3).model;

      const diseaseProject = rf.workspace().project("crop-disease-identification");
      const diseaseModel = diseaseProject.version(9).model;

      // Perform predictions
      const pestResult = await pestModel.predict(filePath, { confidence: 10 });
      const diseaseResult = await diseaseModel.predict(filePath, { confidence: 40 });

      // Parse results
      const response = {
        pest_detection: pestResult.json(),
        crop_disease: diseaseResult.json(),
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Roboflow Prediction Error:", error);
      res.status(500).json({ error: "Error processing the image" });
    } finally {
      // Cleanup temporary file
      fs.unlinkSync(filePath);
    }
  });
}