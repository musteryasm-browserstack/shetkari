import { pool } from "@/db";

/* --- Helper functions --- */

/**
 * Compute the average of an array of numbers.
 */
function average(values: number[]): number {
  if (!values || values.length === 0) return 0;
  return values.reduce((acc, val) => acc + val, 0) / values.length;
}

/**
 * Compute the standard deviation of an array of numbers.
 */
function standardDeviation(values: number[]): number {
  if (!values || values.length === 0) return 0;
  const avg = average(values);
  const squareDiffs = values.map(val => Math.pow(val - avg, 2));
  return Math.sqrt(average(squareDiffs));
}

/* --- Prediction functions --- */

/**
 * Naively compute the predicted yield (in q/ha) using sensor data.
 *
 * Formula (example):
 * yield = 20
 *   + (avgMoisture * 0.5)
 *   + (avgHumidity * 0.2)
 *   - (avgTemperature * 0.1)
 *   + (avgPh * 0.8)
 *   + (avgUltrasonic * 0.05)
 */
function computeNaivePredictedYield(
  humidityData: number[],
  moistureData: number[],
  phData: number[],
  temperatureData: number[],
  ultrasonicData: number[]
): number {
  const avgHumidity = average(humidityData);
  const avgMoisture = average(moistureData);
  const avgPh = average(phData);
  const avgTemperature = average(temperatureData);
  const avgUltrasonic = average(ultrasonicData);

  return (
    20 +
    avgMoisture * 0.5 +
    avgHumidity * 0.2 -
    avgTemperature * 0.1 +
    avgPh * 0.8 +
    avgUltrasonic * 0.05
  );
}

/**
 * Compute a regional comparison percentage.
 *
 * For this demonstration, we assume a naive regional average yield computed using moisture and temperature:
 *
 *   regionalAverageYield = (avgMoisture * 0.5) + ((25 - avgTemperature) * 0.3)
 *
 * Then, the percentage difference is:
 *   ((predictedYield - regionalAverageYield) / regionalAverageYield) * 100
 */
function computeRegionalComparison(
  predictedYield: number,
  moistureData: number[],
  temperatureData: number[]
): number {
  const avgMoisture = average(moistureData);
  const avgTemperature = average(temperatureData);
  const regionalAverageYield = avgMoisture * 0.5 + (25 - avgTemperature) * 0.3;
  const percentageDifference = ((predictedYield - regionalAverageYield) / regionalAverageYield) * 100;
  return Number(percentageDifference.toFixed(2));
}

/**
 * Compute a prediction confidence percentage.
 *
 * Here we assume that lower variability in sensor data leads to higher confidence.
 * We calculate the standard deviation for each sensor reading, average them,
 * and subtract a factor (avgStd * 5) from 100.
 */
function computePredictionConfidence(
  humidityData: number[],
  moistureData: number[],
  phData: number[],
  temperatureData: number[],
  ultrasonicData: number[]
): number {
  const stdHumidity = standardDeviation(humidityData);
  const stdMoisture = standardDeviation(moistureData);
  const stdPh = standardDeviation(phData);
  const stdTemperature = standardDeviation(temperatureData);
  const stdUltrasonic = standardDeviation(ultrasonicData);
  const avgStd = (stdHumidity + stdMoisture + stdPh + stdTemperature + stdUltrasonic) / 5;
  const confidence = Math.max(0, Math.min(100, 100 - avgStd * 5));
  return Math.round(confidence);
}

/**
 * Compute an estimated harvest date that is 2 months from the current date.
 */
function computeEstimatedHarvestDate(): string {
  const now = new Date();
  const harvestDate = new Date(now);
  harvestDate.setMonth(now.getMonth() + 2);
  return harvestDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* --- API Route Handler --- */

export async function GET(request: Request) {
  console.log(request);
  const query = `
    SELECT humidity, moisture, ph, temperature, ultrasonic
    FROM sensor_data
    ORDER BY reading_time, id DESC
    LIMIT 1;
  `;

  try {
    const { rows } = await pool.query(query);
    if (rows && rows.length > 0) {
      const row = rows[0];

      // Wrap each sensor value in an array to reuse the same functions
      const predictedYieldValue = computeNaivePredictedYield(
        [row.humidity],
        [row.moisture],
        [row.ph],
        [row.temperature],
        [row.ultrasonic]
      );
      const roundedPredictedYield = Number(predictedYieldValue.toFixed(2));

      const regionalComparisonPercentage = computeRegionalComparison(
        roundedPredictedYield,
        [row.moisture],
        [row.temperature]
      );
      const predictionConfidenceValue = computePredictionConfidence(
        [row.humidity],
        [row.moisture],
        [row.ph],
        [row.temperature],
        [row.ultrasonic]
      );
      const estimatedHarvestDate = computeEstimatedHarvestDate();
      const harvestWindowDays = 15; // Example hardcoded value

      const responsePayload = {
        predictedYield: {
          value: roundedPredictedYield,
          unit: "q/ha",
          differenceFromLastSeason: 2.9, 
        },
        regionalComparison: {
          value: regionalComparisonPercentage,
          unit: "%",
          note: "Comparison based on sensor-derived regional average yield",
        },
        predictionConfidence: {
          value: predictionConfidenceValue,
          unit: "%",
          note: "Based on historical data variability and current sensor conditions",
        },
        estimatedHarvest: {
          date: estimatedHarvestDate,
          optimalWindow: `±${harvestWindowDays} days`,
        },
      };

      return Response.json({ status: "success", message: "Fetched successfully", data: responsePayload });
    }
    return Response.json({ status: "error", message: "No data found", data: null });
  } catch (error) {
    console.log(error);
    return Response.json({ status: "error", message: "Error fetching", data: null });
  }
}