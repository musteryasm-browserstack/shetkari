"use client"

import { useState } from "react"
import {
    AlertTriangle,
    BarChart3,
    Calendar,
    Cloud,
    CloudDrizzle,
    CloudFog,
    CloudLightning,
    CloudRain,
    CloudSnow,
    Compass,
    Download,
    Droplet,
    FileStack,
    Leaf,
    MapPin,
    Smartphone,
    Sun,
    Wind,
    Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Sample weather data
const weatherData = {
    current: {
        temp: 32,
        feelsLike: 34,
        humidity: 65,
        wind: 8,
        pressure: 1012,
        visibility: 10,
        uvIndex: 7,
        condition: "Mostly Sunny",
        icon: "sun",
        precipitation: 10,
    },
    hourly: [
        { time: "9AM", temp: 30, icon: "sun", precipitation: 0 },
        { time: "12PM", temp: 32, icon: "sun", precipitation: 0 },
        { time: "3PM", temp: 33, icon: "sun", precipitation: 10 },
        { time: "6PM", temp: 31, icon: "cloud", precipitation: 20 },
        { time: "9PM", temp: 28, icon: "cloud", precipitation: 30 },
        { time: "12AM", temp: 26, icon: "cloud-rain", precipitation: 40 },
    ],
    daily: [
        { day: "Today", high: 32, low: 24, icon: "sun", precipitation: 10 },
        { day: "Tomorrow", high: 34, low: 25, icon: "sun", precipitation: 0 },
        { day: "Wed", high: 33, low: 26, icon: "cloud", precipitation: 20 },
        { day: "Thu", high: 30, low: 24, icon: "cloud-rain", precipitation: 60 },
        { day: "Fri", high: 28, low: 22, icon: "cloud-rain", precipitation: 70 },
        { day: "Sat", high: 29, low: 23, icon: "cloud", precipitation: 30 },
        { day: "Sun", high: 31, low: 24, icon: "sun", precipitation: 10 },
    ],
    alerts: [
        {
            type: "Heat Advisory",
            severity: "moderate",
            description: "Heat index values up to 105°F expected. Take precautions if working outdoors.",
            validUntil: "Today, 8:00 PM",
        },
        {
            type: "Thunderstorm Watch",
            severity: "minor",
            description: "Isolated thunderstorms possible in the evening hours.",
            validUntil: "Tomorrow, 2:00 AM",
        },
    ],
    agriculturalImpact: {
        irrigation: "Consider increasing irrigation frequency due to high temperatures.",
        pests: "Increased risk of aphid activity due to warm and dry conditions.",
        crops: "Heat stress may affect flowering in sensitive crops. Consider shade cloth for vulnerable plants.",
        soilMoisture: "Rapid soil moisture depletion expected. Monitor soil moisture levels closely.",
    },
}

// Weather icon mapping
const WeatherIcon = ({ type, className = "h-6 w-6" }: { type: string; className?: string }) => {
    switch (type) {
        case "sun":
            return <Sun className={`${className} text-yellow-500`} />
        case "cloud":
            return <Cloud className={`${className} text-gray-400`} />
        case "cloud-rain":
            return <CloudRain className={`${className} text-blue-500`} />
        case "cloud-lightning":
            return <CloudLightning className={`${className} text-purple-500`} />
        case "cloud-snow":
            return <CloudSnow className={`${className} text-blue-200`} />
        case "cloud-drizzle":
            return <CloudDrizzle className={`${className} text-blue-400`} />
        case "cloud-fog":
            return <CloudFog className={`${className} text-gray-300`} />
        default:
            return <Sun className={`${className} text-yellow-500`} />
    }
}

export default function WeatherAdvisory() {
    const [activeTab, setActiveTab] = useState("forecast")
    // const [selectedLocation, setSelectedLocation] = useState("farm-center")

    return (
        <div className="flex min-h-screen bg-background">
            {/* Main Content */}
            <div className="flex flex-col w-full">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
                    <div className="flex items-center gap-2">
                        <CloudRain className="h-4 w-4" />
                        <h1 className="text-xl font-semibold">Weather Advisory</h1>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    <div className="flex flex-col gap-6">
                        {/* Current Weather */}
                        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                            <CardContent className="p-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <WeatherIcon type={weatherData.current.icon} className="h-12 w-12" />
                                                <div>
                                                    <h2 className="text-4xl font-bold">{weatherData.current.temp}°C</h2>
                                                    <p className="text-muted-foreground">Feels like {weatherData.current.feelsLike}°C</p>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-lg font-medium">{weatherData.current.condition}</p>
                                            <div className="mt-4 flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">VidyaVihar, Maharashtra</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col items-center justify-center rounded-lg bg-white/50 dark:bg-white/10 p-3">
                                            <Droplet className="h-5 w-5 text-blue-500 mb-1" />
                                            <span className="text-xs text-muted-foreground">Humidity</span>
                                            <span className="font-semibold">{weatherData.current.humidity}%</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center rounded-lg bg-white/50 dark:bg-white/10 p-3">
                                            <Wind className="h-5 w-5 text-blue-400 mb-1" />
                                            <span className="text-xs text-muted-foreground">Wind</span>
                                            <span className="font-semibold">{weatherData.current.wind} km/h</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center rounded-lg bg-white/50 dark:bg-white/10 p-3">
                                            <CloudRain className="h-5 w-5 text-blue-500 mb-1" />
                                            <span className="text-xs text-muted-foreground">Precipitation</span>
                                            <span className="font-semibold">{weatherData.current.precipitation}%</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center rounded-lg bg-white/50 dark:bg-white/10 p-3">
                                            <Sun className="h-5 w-5 text-yellow-500 mb-1" />
                                            <span className="text-xs text-muted-foreground">UV Index</span>
                                            <span className="font-semibold">{weatherData.current.uvIndex} (High)</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Weather Tabs */}
                        <Tabs defaultValue="forecast" value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="forecast">Forecast</TabsTrigger>
                                <TabsTrigger value="agricultural">Agricultural Impact</TabsTrigger>
                                <TabsTrigger value="alerts">Weather Alerts</TabsTrigger>
                                <TabsTrigger value="historical">Historical Data</TabsTrigger>
                            </TabsList>

                            <TabsContent value="forecast" className="space-y-4 mt-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    {/* Hourly Forecast */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Hourly Forecast</CardTitle>
                                            <CardDescription>Next 24 hours</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex gap-4 overflow-x-auto pb-2">
                                                {weatherData.hourly.map((hour, i) => (
                                                    <div key={i} className="flex flex-col items-center p-3 min-w-[80px] rounded-md border">
                                                        <span className="text-sm font-medium">{hour.time}</span>
                                                        <WeatherIcon type={hour.icon} className="h-5 w-5 my-1" />
                                                        <span className="text-sm font-semibold">{hour.temp}°C</span>
                                                        <span className="text-xs text-muted-foreground">{hour.precipitation}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Daily Forecast */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>7-Day Forecast</CardTitle>
                                            <CardDescription>Weekly outlook</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {weatherData.daily.map((day, i) => (
                                                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                                                        <span className="font-medium w-24">{day.day}</span>
                                                        <div className="flex items-center gap-2">
                                                            <WeatherIcon type={day.icon} />
                                                            <span>{day.precipitation}%</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold">{day.high}°</span>
                                                            <span className="text-muted-foreground">{day.low}°</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Weather Map */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Weather Radar</CardTitle>
                                        <CardDescription>Real-time precipitation and cloud cover</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative h-[400px] w-full rounded-lg border bg-muted/30">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    <Compass className="h-12 w-12 mx-auto text-muted-foreground/60 mb-2" />
                                                    <p className="text-muted-foreground">Interactive weather map would be displayed here</p>
                                                </div>
                                            </div>

                                            {/* Map Controls */}
                                            <div className="absolute bottom-4 right-4 flex gap-2">
                                                <Button variant="outline" size="sm" className="bg-background/80">
                                                    Precipitation
                                                </Button>
                                                <Button variant="outline" size="sm" className="bg-background/80">
                                                    Temperature
                                                </Button>
                                                <Button variant="outline" size="sm" className="bg-background/80">
                                                    Wind
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="agricultural" className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Agricultural Weather Impact</CardTitle>
                                        <CardDescription>How current and forecasted weather affects your farm</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div className="space-y-4">
                                                <div className="rounded-lg border p-4">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Droplet className="h-5 w-5 text-blue-500" />
                                                        <h3 className="font-semibold">Irrigation Impact</h3>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{weatherData.agriculturalImpact.irrigation}</p>
                                                </div>

                                                <div className="rounded-lg border p-4">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                                        <h3 className="font-semibold">Pest Activity</h3>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{weatherData.agriculturalImpact.pests}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="rounded-lg border p-4">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <Leaf className="h-5 w-5 text-green-500" />
                                                        <h3 className="font-semibold">Crop Impact</h3>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{weatherData.agriculturalImpact.crops}</p>
                                                </div>

                                                <div className="rounded-lg border p-4">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <FileStack className="h-5 w-5 text-brown-500" />
                                                        <h3 className="font-semibold">Soil Moisture</h3>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{weatherData.agriculturalImpact.soilMoisture}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 rounded-lg border p-4">
                                            <h3 className="font-semibold mb-3">Recommended Actions</h3>
                                            <ul className="space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                        <Check className="h-3 w-3 text-green-600" />
                                                    </div>
                                                    <span className="text-sm">Increase irrigation frequency in the morning hours</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                        <Check className="h-3 w-3 text-green-600" />
                                                    </div>
                                                    <span className="text-sm">Monitor for signs of heat stress in sensitive crops</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                        <Check className="h-3 w-3 text-green-600" />
                                                    </div>
                                                    <span className="text-sm">Apply preventative pest control measures for aphids</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                        <Check className="h-3 w-3 text-green-600" />
                                                    </div>
                                                    <span className="text-sm">Prepare for possible thunderstorms on Thursday</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">
                                            <Smartphone className="mr-2 h-4 w-4" />
                                            Get Mobile Alerts
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="alerts" className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Weather Alerts & Warnings</CardTitle>
                                        <CardDescription>Active alerts for your region</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {weatherData.alerts.map((alert, i) => (
                                                <div
                                                    key={i}
                                                    className={`rounded-lg p-4 ${alert.severity === "severe"
                                                        ? "bg-red-50 border-red-200"
                                                        : alert.severity === "moderate"
                                                            ? "bg-yellow-50 border-yellow-200"
                                                            : "bg-blue-50 border-blue-200"
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <AlertTriangle
                                                                className={`h-5 w-5 ${alert.severity === "severe"
                                                                    ? "text-red-500"
                                                                    : alert.severity === "moderate"
                                                                        ? "text-yellow-500"
                                                                        : "text-blue-500"
                                                                    }`}
                                                            />
                                                            <h3 className="font-semibold">{alert.type}</h3>
                                                        </div>
                                                        <Badge
                                                            variant={
                                                                alert.severity === "severe"
                                                                    ? "destructive"
                                                                    : alert.severity === "moderate"
                                                                        ? "secondary"
                                                                        : "outline"
                                                            }
                                                        >
                                                            {alert.severity.toUpperCase()}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm mb-2">{alert.description}</p>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        <span>Valid until: {alert.validUntil}</span>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="rounded-lg border p-4 text-center">
                                                <p className="text-muted-foreground">No additional alerts for your region at this time.</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            View Alert Map
                                        </Button>
                                        <Button>
                                            <Bell className="mr-2 h-4 w-4" />
                                            Set Up Notifications
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="historical" className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Historical Weather Data</CardTitle>
                                        <CardDescription>Compare current conditions with historical averages</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[300px] rounded-lg bg-muted mb-4">
                                            {/* This would be a chart in a real implementation */}
                                            <div className="w-full h-full flex items-center justify-center">
                                                <BarChart3 className="h-12 w-12 text-muted-foreground/60" />
                                            </div>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="rounded-lg border p-3">
                                                <div className="text-sm text-muted-foreground mb-1">Temperature</div>
                                                <div className="flex items-baseline justify-between">
                                                    <div className="text-2xl font-bold">{weatherData.current.temp}°C</div>
                                                    <div className="text-sm">
                                                        <span className="text-green-500">+3.2°C</span> vs. avg
                                                    </div>
                                                </div>
                                                <Progress value={75} className="h-1.5 mt-2" />
                                            </div>

                                            <div className="rounded-lg border p-3">
                                                <div className="text-sm text-muted-foreground mb-1">Rainfall</div>
                                                <div className="flex items-baseline justify-between">
                                                    <div className="text-2xl font-bold">12mm</div>
                                                    <div className="text-sm">
                                                        <span className="text-red-500">-8mm</span> vs. avg
                                                    </div>
                                                </div>
                                                <Progress value={40} className="h-1.5 mt-2" />
                                            </div>

                                            <div className="rounded-lg border p-3">
                                                <div className="text-sm text-muted-foreground mb-1">Sunshine Hours</div>
                                                <div className="flex items-baseline justify-between">
                                                    <div className="text-2xl font-bold">9.5 hrs</div>
                                                    <div className="text-sm">
                                                        <span className="text-green-500">+1.2 hrs</span> vs. avg
                                                    </div>
                                                </div>
                                                <Progress value={85} className="h-1.5 mt-2" />
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="font-semibold mb-3">Monthly Comparison</h3>
                                            <div className="rounded-lg border overflow-hidden">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="bg-muted/50">
                                                            <th className="p-2 text-left font-medium text-sm">Month</th>
                                                            <th className="p-2 text-left font-medium text-sm">Avg High</th>
                                                            <th className="p-2 text-left font-medium text-sm">Avg Low</th>
                                                            <th className="p-2 text-left font-medium text-sm">Rainfall</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-t">
                                                            <td className="p-2 text-sm">May 2023</td>
                                                            <td className="p-2 text-sm">31°C</td>
                                                            <td className="p-2 text-sm">22°C</td>
                                                            <td className="p-2 text-sm">45mm</td>
                                                        </tr>
                                                        <tr className="border-t bg-muted/30">
                                                            <td className="p-2 text-sm font-medium">May 2024 (Current)</td>
                                                            <td className="p-2 text-sm">34°C</td>
                                                            <td className="p-2 text-sm">24°C</td>
                                                            <td className="p-2 text-sm">32mm</td>
                                                        </tr>
                                                        <tr className="border-t">
                                                            <td className="p-2 text-sm">Difference</td>
                                                            <td className="p-2 text-sm text-green-500">+3°C</td>
                                                            <td className="p-2 text-sm text-green-500">+2°C</td>
                                                            <td className="p-2 text-sm text-red-500">-13mm</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Historical Data
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    )
}

function Bell({ className = "h-4 w-4", ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    )
}

