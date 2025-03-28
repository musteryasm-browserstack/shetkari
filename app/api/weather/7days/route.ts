export type DailyForecast = {
    date: string;
    temperatureMax: number;
    temperatureMin: number;
};

export async function POST(request: Request) {
    const body = await request.json();
    const { lat, lon } = body;
    // const lat = "19.07348";
    // const lon = "72.90143";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,windspeed_10m_max,precipitation_probability_mean&forecast_days=7&timezone=auto`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`);
        }

        const data = await response.json();
        const daily = data.daily;

        const forecast: DailyForecast[] = [];

        for (let i = 0; i < daily.time.length; i++) {
            forecast.push({
                date: daily.time[i],
                temperatureMax: daily.temperature_2m_max[i],
                temperatureMin: daily.temperature_2m_min[i],
            });
        }

        return Response.json({
            status: "success",
            message: "7-day forecast fetched",
            data: forecast
        });
    } catch (error: unknown) {
        console.error("Error fetching 7-day forecast:", (error as Error).message);
        return Response.json({
            status: "error",
            message: "Failed to fetch 7-day forecast",
            data: null
        });
    }
}