"use client"

// importing from react
import { useState } from "react";

// importing from next
import Link from "next/link";

// importing shadcn components
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

// importing icons
import {
    AlertTriangle,
    BarChart3,
    CheckCircle,
    CloudRain,
    Droplet,
    Leaf,
    MapPin,
    ShieldAlert,
    SunMedium,
    TrendingUp,
} from "lucide-react";

export default function Dashboard() {
    const [weatherTab, setWeatherTab] = useState("today")

    return (
        <div className="flex min-h-screen bg-background">
            {/* Main Content */}
            <div className="flex flex-col w-full">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <h1 className="text-xl font-semibold">Dashboard Overview</h1>
                    <div className="ml-auto flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-md bg-accent px-2 py-1 text-sm text-accent-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>Nagpur, Maharashtra</span>
                        </div>
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Crop Health Score</CardTitle>
                                <Leaf className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">87/100</div>
                                <Progress value={87} className="h-2 mt-2" />
                                <p className="text-xs text-muted-foreground mt-2">+4% from last week</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
                                <Droplet className="h-4 w-4 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">68%</div>
                                <Progress value={68} className="h-2 mt-2" />
                                <p className="text-xs text-muted-foreground mt-2">Optimal range: 60-75%</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pest Risk Level</CardTitle>
                                <ShieldAlert className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">Low</div>
                                <Progress value={22} className="h-2 mt-2" />
                                <p className="text-xs text-muted-foreground mt-2">Monitoring 3 potential threats</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Projected Yield</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">32.5 q/ha</div>
                                <Progress value={78} className="h-2 mt-2" />
                                <p className="text-xs text-muted-foreground mt-2">+8% above regional average</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="lg:col-span-4">
                            <CardHeader>
                                <CardTitle>Farm Performance</CardTitle>
                                <CardDescription>Daily monitoring data for the last 7 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] rounded-lg bg-muted/60 p-6">
                                    <div className="flex justify-between pb-4">
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium">Weekly Average</div>
                                            <div className="text-2xl font-bold">92.4</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-sm font-medium">Current</div>
                                            <div className="text-2xl font-bold">97.2</div>
                                        </div>
                                    </div>
                                    <div className="h-[220px] flex items-end gap-2">
                                        {[45, 60, 82, 68, 79, 87, 96].map((value, i) => (
                                            <div key={i} className="relative flex-1 group">
                                                <div
                                                    className="absolute bottom-0 w-full bg-primary/80 group-hover:bg-primary transition-all rounded-t"
                                                    style={{ height: `${value * 2}px` }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between pt-2 text-xs text-muted-foreground">
                                        <div>Mon</div>
                                        <div>Tue</div>
                                        <div>Wed</div>
                                        <div>Thu</div>
                                        <div>Fri</div>
                                        <div>Sat</div>
                                        <div>Sun</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-3">
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
                                    <TabsContent value="today" className="space-y-4 mt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-4xl font-bold">32°C</span>
                                                <span className="text-muted-foreground">Feels like 34°C</span>
                                            </div>
                                            <div className="text-right">
                                                <SunMedium className="h-10 w-10 text-yellow-500 inline-block" />
                                                <div className="text-muted-foreground">Mostly Sunny</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                                            <div className="text-center">
                                                <div className="text-sm font-medium">Humidity</div>
                                                <div className="text-2xl font-semibold">65%</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-medium">Wind</div>
                                                <div className="text-2xl font-semibold">8 km/h</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-medium">Rain</div>
                                                <div className="text-2xl font-semibold">10%</div>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t">
                                            <div className="text-sm font-medium mb-2">Hourly Forecast</div>
                                            <div className="flex gap-2 overflow-x-auto pb-2">
                                                {["9AM", "12PM", "3PM", "6PM", "9PM"].map((time, i) => (
                                                    <div key={i} className="flex flex-col items-center p-2 min-w-[70px] rounded-md border">
                                                        <span className="text-sm">{time}</span>
                                                        <SunMedium className="h-5 w-5 my-1 text-yellow-500" />
                                                        <span className="text-sm font-semibold">{30 + i}°C</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="week" className="mt-4">
                                        <div className="space-y-4">
                                            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                                                <div key={i} className="flex items-center justify-between border-b pb-2">
                                                    <span className="font-medium">{day}</span>
                                                    <div className="flex items-center gap-2">
                                                        {i % 2 === 0 ? (
                                                            <SunMedium className="h-5 w-5 text-yellow-500" />
                                                        ) : (
                                                            <CloudRain className="h-5 w-5 text-blue-500" />
                                                        )}
                                                        <span>{i % 2 === 0 ? "Sunny" : "Light Rain"}</span>
                                                    </div>
                                                    <span className="font-semibold">{32 - i}°C</span>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
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
                    </div>

                    <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Alerts</CardTitle>
                                <CardDescription>System notifications and warnings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 rounded-lg border p-3">
                                        <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />
                                        <div>
                                            <p className="text-sm font-medium">Potential pest activity detected</p>
                                            <p className="text-xs text-muted-foreground">South field, cotton crop - 2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 rounded-lg border p-3">
                                        <Droplet className="mt-0.5 h-5 w-5 text-blue-600" />
                                        <div>
                                            <p className="text-sm font-medium">Irrigation cycle completed</p>
                                            <p className="text-xs text-muted-foreground">North field, wheat crop - 6 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 rounded-lg border p-3">
                                        <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                                        <div>
                                            <p className="text-sm font-medium">Soil nutrient levels optimal</p>
                                            <p className="text-xs text-muted-foreground">All fields - 1 day ago</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Link href="/alerts" className="text-sm text-blue-600 hover:underline">
                                    View all alerts
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Soil Nutrients</CardTitle>
                                <CardDescription>Current soil analysis results</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Nitrogen (N)</span>
                                            <span className="text-sm">280 kg/ha</span>
                                        </div>
                                        <Progress value={65} className="h-2" />
                                        <p className="text-xs text-muted-foreground mt-1">Optimal: 250-300 kg/ha</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Phosphorus (P)</span>
                                            <span className="text-sm">45 kg/ha</span>
                                        </div>
                                        <Progress value={85} className="h-2" />
                                        <p className="text-xs text-muted-foreground mt-1">Optimal: 40-60 kg/ha</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Potassium (K)</span>
                                            <span className="text-sm">190 kg/ha</span>
                                        </div>
                                        <Progress value={70} className="h-2" />
                                        <p className="text-xs text-muted-foreground mt-1">Optimal: 180-220 kg/ha</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">pH Level</span>
                                            <span className="text-sm">6.8</span>
                                        </div>
                                        <Progress value={78} className="h-2" />
                                        <p className="text-xs text-muted-foreground mt-1">Optimal: 6.5-7.0</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Tasks</CardTitle>
                                <CardDescription>Scheduled activities for your farm</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <span className="text-sm font-medium">Irrigation Schedule</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">Tomorrow</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span className="text-sm font-medium">Apply Organic Fertilizer</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">In 3 days</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <span className="text-sm font-medium">Harvest Ready Crops</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">In 7 days</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <span className="text-sm font-medium">Inspect for Pests</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">Weekly</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Link href="/tasks" className="text-sm text-blue-600 hover:underline">
                                    View all tasks
                                </Link>
                                <Link href="/new-task" className="text-sm text-blue-600 hover:underline">
                                    Add task
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}