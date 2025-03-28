export type WeatherForecast = {
    time: string;
    temperature: number;
    humidity: number;
    windspeed: number;
    rain: number;
};

export async function GET(request: Request) {
    console.log(request);
    try {
        const lat = "19.07348";
        const long = "72.90143";
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,windspeed_10m&forecast_days=1&timezone=auto`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const hourly = data.hourly;
        const forecast: WeatherForecast[] = [];

        for (let i = 0; i < hourly.time.length; i++) {
            forecast.push({
                time: hourly.time[i],
                temperature: hourly.temperature_2m[i],
                humidity: hourly.relative_humidity_2m[i],
                windspeed: hourly.windspeed_10m[i],
                rain: hourly.precipitation_probability[i],
            });
        }
        console.log(forecast);
        return Response.json({ status: "success", message: "Successfully fetched hourly data", data: forecast });
    } catch (error) {
        console.log(error);
        return Response.json({ status: "error", message: "Error fetching hourly data", data: null });
    }
}
