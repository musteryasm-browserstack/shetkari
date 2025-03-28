"use client"

// importing from react
import { useState, useEffect } from "react";

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

// importing icons
import {
    AlertTriangle,
    CheckCircle,
    Droplet,
    Leaf,
    MapPin,
    ShieldAlert,
    TrendingUp,
} from "lucide-react";
import { SoilMoistureCard } from "./moistureCard";
import WeatherForecast from "./weather";

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

                        <SoilMoistureCard />
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

                        <WeatherForecast />
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