import { useEffect, useState } from "react";
import { SunMedium, CloudRain, BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BACKEND_URL } from "@/lib/constants";
import axios from "axios";

export default function WeatherForecast() {
    const [weatherTab, setWeatherTab] = useState("today");
    interface HourlyWeather {
        time: string;
        temperature: number;
        humidity: number;
        windspeed: number;
        rain: number;
    }

    interface WeeklyWeather {
        date: string;
        temperatureMax: number;
    }

    const [hourlyData, setHourlyData] = useState<HourlyWeather[]>([]);
    const [weeklyData, setWeeklyData] = useState<WeeklyWeather[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const hourlyRes = await axios.post(`${BACKEND_URL}/api/weather/hourly`, {
                    lat: "19.17548322423318", lon: "72.95186986886482"
                });
                const weeklyRes = await axios.post(`${BACKEND_URL}/api/weather/7days`, {
                    lat: "19.17548322423318", lon: "72.95186986886482"
                });
                if (hourlyRes.data.status === "success") {
                    setHourlyData(hourlyRes.data.data);
                }
                if (weeklyRes.data.status === "success") {
                    setWeeklyData(weeklyRes.data.data);
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    if (loading) {
        return <div className="text-center text-muted-foreground">Loading weather data...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <Card className="lg:col-span-3 w-full">
            <CardHeader>
                <CardTitle>Weather Forecast</CardTitle>
                <CardDescription>Localized predictions for your farm</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="today" value={weatherTab} onValueChange={setWeatherTab}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="today">Today</TabsTrigger>
                        <TabsTrigger value="week">This Week</TabsTrigger>
                        <TabsTrigger value="month">Monthly</TabsTrigger>
                    </TabsList>

                    {/* Today's Weather */}
                    <TabsContent value="today" className="space-y-4 mt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold">{hourlyData[0]?.temperature}°C</span>
                                <span className="text-muted-foreground">Humidity: {hourlyData[0]?.humidity}%</span>
                            </div>
                            <div className="text-right">
                                <SunMedium className="h-10 w-10 text-yellow-500 inline-block" />
                                <div className="text-muted-foreground">Sunny</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                            <div className="text-center">
                                <div className="text-sm font-medium">Wind</div>
                                <div className="text-2xl font-semibold">{hourlyData[0]?.windspeed} km/h</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-medium">Rain</div>
                                <div className="text-2xl font-semibold">{hourlyData[0]?.rain}%</div>
                            </div>
                        </div>
                        <div className="pt-4 border-t">
                            <div className="text-sm font-medium mb-2">Hourly Forecast</div>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {hourlyData.map((hour, i) => (
                                    <div key={i} className="flex flex-col items-center p-2 min-w-[70px] rounded-md border">
                                        <span className="text-sm">{hour.time.split("T")[1]}</span>
                                        <SunMedium className="h-5 w-5 my-1 text-yellow-500" />
                                        <span className="text-sm font-semibold">{hour.temperature}°C</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Weekly Forecast */}
                    <TabsContent value="week" className="mt-4">
                        <div className="space-y-4">
                            {weeklyData.map((day, i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-2">
                                    <span className="font-medium">{new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}</span>
                                    <div className="flex items-center gap-2">
                                        {day.temperatureMax > 35 ? (
                                            <SunMedium className="h-5 w-5 text-yellow-500" />
                                        ) : (
                                            <CloudRain className="h-5 w-5 text-blue-500" />
                                        )}
                                        <span>{day.temperatureMax > 35 ? "Sunny" : "Rainy"}</span>
                                    </div>
                                    <span className="font-semibold">{day.temperatureMax}°C</span>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Monthly Forecast Placeholder */}
                    <TabsContent value="month" className="mt-4">
                        <div className="h-[220px] flex items-center justify-center border rounded-md">
                            <BarChart3 className="h-16 w-16 text-muted-foreground/60" />
                            <div className="ml-4 text-center">
                                <p className="text-muted-foreground">Monthly precipitation forecast</p>
                                <p className="text-sm text-muted-foreground">85mm expected this month</p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
