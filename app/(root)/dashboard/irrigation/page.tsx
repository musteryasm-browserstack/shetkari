"use client"

import { useState } from "react"
import {
    AlertTriangle,
    BarChart,
    CalendarDays,
    Check,
    Clipboard,
    Clock,
    CloudRain,
    Droplet,
    Eye,
    FileStack,
    HandIcon as HandWater,
    Loader2,
    MapPin,
    RefreshCw,
    Settings,
    Sliders,
    Timer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"

// Sample irrigation zones data
const irrigationZones = [
    {
        id: 1,
        name: "North Field - Wheat",
        status: "active",
        moistureLevel: 72,
        nextSchedule: "Today, 6:00 PM",
        lastIrrigated: "Today, 6:00 AM",
        duration: 45, // minutes
        waterUsed: 2800, // liters
        area: 3.5, // hectares
        flowRate: 62, // liters per minute
        moistureTarget: 75,
        aiRecommendation: "Continue with scheduled irrigation cycle",
    },
    {
        id: 2,
        name: "South Field - Cotton",
        status: "scheduled",
        moistureLevel: 61,
        nextSchedule: "Tomorrow, 5:30 AM",
        lastIrrigated: "Yesterday, 5:30 AM",
        duration: 60, // minutes
        waterUsed: 3600, // liters
        area: 4.2, // hectares
        flowRate: 60, // liters per minute
        moistureTarget: 65,
        aiRecommendation: "Extend irrigation duration by 10 minutes due to forecasted high temperatures",
    },
    {
        id: 3,
        name: "East Field - Soybeans",
        status: "warning",
        moistureLevel: 48,
        nextSchedule: "Immediate irrigation recommended",
        lastIrrigated: "4 days ago",
        duration: 75, // minutes
        waterUsed: 4200, // liters
        area: 2.8, // hectares
        flowRate: 56, // liters per minute
        moistureTarget: 60,
        aiRecommendation: "Immediate irrigation needed. Soil moisture below critical threshold.",
    },
    {
        id: 4,
        name: "West Field - Rice",
        status: "idle",
        moistureLevel: 85,
        nextSchedule: "In 3 days",
        lastIrrigated: "Today, 10:30 AM",
        duration: 90, // minutes
        waterUsed: 5400, // liters
        area: 5.1, // hectares
        flowRate: 60, // liters per minute
        moistureTarget: 80,
        aiRecommendation: "Skip next irrigation cycle. Moisture levels above target.",
    },
]

// Weather forecast data
const weatherForecast = [
    { day: "Today", temp: 32, rain: 0, icon: "sun" },
    { day: "Tomorrow", temp: 34, rain: 0, icon: "sun" },
    { day: "Wed", temp: 33, rain: 10, icon: "cloud-sun" },
    { day: "Thu", temp: 30, rain: 40, icon: "cloud-rain" },
    { day: "Fri", temp: 28, rain: 60, icon: "cloud-rain" },
    { day: "Sat", temp: 29, rain: 20, icon: "cloud-sun" },
    { day: "Sun", temp: 31, rain: 0, icon: "sun" },
]

export default function IrrigationSystem() {
    const [selectedZone, setSelectedZone] = useState(irrigationZones[0])
    const [isManualIrrigating, setIsManualIrrigating] = useState(false)
    const [manualDuration, setManualDuration] = useState(30)

    // Manual irrigation handler
    const handleManualIrrigation = () => {
        setIsManualIrrigating(true)
        // Simulate irrigation time
        setTimeout(() => {
            setIsManualIrrigating(false)
        }, 3000)
    }

    // Status color map
    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "text-green-500 bg-green-50"
            case "scheduled":
                return "text-blue-500 bg-blue-50"
            case "warning":
                return "text-red-500 bg-red-50"
            case "idle":
                return "text-slate-500 bg-slate-50"
            default:
                return "text-slate-500 bg-slate-50"
        }
    }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Main Content */}
            <div className="flex flex-col w-full">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
                    <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4" />
                        <h1 className="text-xl font-semibold">AI-Powered Smart Irrigation</h1>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    <div className="flex flex-col gap-6">
                        {/* System Overview */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">System Status</CardTitle>
                                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-xs font-medium text-white">
                                        <Check className="h-3 w-3" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Active</div>
                                    <p className="text-xs text-muted-foreground mt-2">All systems operational</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Zones</CardTitle>
                                    <Droplet className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">1/4</div>
                                    <p className="text-xs text-muted-foreground mt-2">1 currently irrigating</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Water Usage Today</CardTitle>
                                    <BarChart className="h-4 w-4 text-blue-700" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">8,200 L</div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        <span className="text-green-500">-12%</span> below average
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Rainfall Forecast</CardTitle>
                                    <CloudRain className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">30mm</div>
                                    <p className="text-xs text-muted-foreground mt-2">Expected in next 7 days</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Irrigation Zones */}
                        <h2 className="text-2xl font-bold mt-2">Irrigation Zones</h2>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {irrigationZones.map((zone) => (
                                <Card
                                    key={zone.id}
                                    className={zone.status === "warning" ? "border-red-300" : ""}
                                    onClick={() => setSelectedZone(zone)}
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-base">{zone.name}</CardTitle>
                                            <Badge className={`${getStatusColor(zone.status)} border-none font-normal`}>
                                                {zone.status === "active"
                                                    ? "Active"
                                                    : zone.status === "scheduled"
                                                        ? "Scheduled"
                                                        : zone.status === "warning"
                                                            ? "Needs Water"
                                                            : "Idle"}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-baseline">
                                                <span className="text-sm">Moisture:</span>
                                                <span className="font-medium">{zone.moistureLevel}%</span>
                                            </div>
                                            <Progress value={zone.moistureLevel} className="h-2" />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Low</span>
                                                <span>Target: {zone.moistureTarget}%</span>
                                                <span>High</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div>
                                                    <p className="text-muted-foreground">Last:</p>
                                                    <p className="font-medium">{zone.lastIrrigated}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">Next:</p>
                                                    <p className="font-medium">{zone.nextSchedule}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedZone(zone)}>
                                            Manage
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {/* Selected Zone Detail */}
                        {selectedZone && (
                            <Card className="mt-2">
                                <CardHeader>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                        <div>
                                            <CardTitle>{selectedZone.name}</CardTitle>
                                            <CardDescription>Zone ID: Z-{selectedZone.id.toString().padStart(3, "0")}</CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={`${getStatusColor(selectedZone.status)} border-none`}>
                                                {selectedZone.status === "active"
                                                    ? "Currently Irrigating"
                                                    : selectedZone.status === "scheduled"
                                                        ? "Scheduled"
                                                        : selectedZone.status === "warning"
                                                            ? "Needs Water"
                                                            : "Idle"}
                                            </Badge>
                                            <Button variant="ghost" size="icon">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="control">
                                        <TabsList className="mb-4">
                                            <TabsTrigger value="control">Control</TabsTrigger>
                                            <TabsTrigger value="schedule">Schedule</TabsTrigger>
                                            <TabsTrigger value="history">History</TabsTrigger>
                                            <TabsTrigger value="settings">Settings</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="control" className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-6">
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-4">AI Recommendation</h3>
                                                        <div className="flex gap-3 p-4 rounded-lg bg-muted">
                                                            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                                            <div>
                                                                <p>{selectedZone.aiRecommendation}</p>
                                                                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                                                    <Clock className="h-4 w-4" />
                                                                    <span>Generated 30 minutes ago</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-4">Manual Control</h3>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between">
                                                                <Label htmlFor="manual-mode" className="flex items-center gap-2">
                                                                    <HandWater className="h-4 w-4" />
                                                                    <span>Manual override</span>
                                                                </Label>
                                                                <Switch id="manual-mode" />
                                                            </div>

                                                            <div className="space-y-3">
                                                                <Label>Duration: {manualDuration} minutes</Label>
                                                                <Slider
                                                                    value={[manualDuration]}
                                                                    min={5}
                                                                    max={120}
                                                                    step={5}
                                                                    onValueChange={(value) => setManualDuration(value[0])}
                                                                />
                                                                <div className="flex justify-between text-xs text-muted-foreground">
                                                                    <span>5 min</span>
                                                                    <span>30 min</span>
                                                                    <span>60 min</span>
                                                                    <span>120 min</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <Button
                                                                    className="flex-1"
                                                                    onClick={handleManualIrrigation}
                                                                    disabled={isManualIrrigating}
                                                                >
                                                                    {isManualIrrigating ? (
                                                                        <>
                                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                                            Irrigating...
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Droplet className="mr-2 h-4 w-4" />
                                                                            Start Irrigation
                                                                        </>
                                                                    )}
                                                                </Button>
                                                                <Button variant="outline" className="flex-1">
                                                                    <Clipboard className="mr-2 h-4 w-4" />
                                                                    Save as Schedule
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-4">Zone Status</h3>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="rounded-lg border p-3">
                                                                <div className="text-sm text-muted-foreground">Current Moisture</div>
                                                                <div className="flex items-baseline gap-2">
                                                                    <span className="text-2xl font-bold">{selectedZone.moistureLevel}%</span>
                                                                    <span className="text-sm text-muted-foreground">
                                                                        of {selectedZone.moistureTarget}% target
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="rounded-lg border p-3">
                                                                <div className="text-sm text-muted-foreground">Water Used</div>
                                                                <div className="flex items-baseline gap-2">
                                                                    <span className="text-2xl font-bold">
                                                                        {selectedZone.waterUsed.toLocaleString()} L
                                                                    </span>
                                                                    <span className="text-sm text-muted-foreground">last irrigation</span>
                                                                </div>
                                                            </div>
                                                            <div className="rounded-lg border p-3">
                                                                <div className="text-sm text-muted-foreground">Flow Rate</div>
                                                                <div className="flex items-baseline gap-2">
                                                                    <span className="text-2xl font-bold">{selectedZone.flowRate} L/min</span>
                                                                </div>
                                                            </div>
                                                            <div className="rounded-lg border p-3">
                                                                <div className="text-sm text-muted-foreground">Last Duration</div>
                                                                <div className="flex items-baseline gap-2">
                                                                    <span className="text-2xl font-bold">{selectedZone.duration} min</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-4">Weather Impact</h3>
                                                        <div className="rounded-lg border p-4">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div className="flex items-center gap-2">
                                                                    <CloudRain className="h-5 w-5 text-blue-500" />
                                                                    <span className="font-medium">7-Day Forecast</span>
                                                                </div>
                                                                <Button variant="ghost" size="sm" className="h-8">
                                                                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                                                                    Update
                                                                </Button>
                                                            </div>

                                                            <div className="grid grid-cols-7 gap-2">
                                                                {weatherForecast.map((day, index) => (
                                                                    <div key={index} className="flex flex-col items-center justify-center">
                                                                        <span className="text-xs font-medium">{day.day}</span>
                                                                        <div className="my-2">
                                                                            {day.icon === "sun" && (
                                                                                <div className="h-8 w-8 rounded-full bg-yellow-200 flex items-center justify-center">
                                                                                    <span className="h-6 w-6 rounded-full bg-yellow-400" />
                                                                                </div>
                                                                            )}
                                                                            {day.icon === "cloud-sun" && <CloudRain className="h-8 w-8 text-blue-300" />}
                                                                            {day.icon === "cloud-rain" && <CloudRain className="h-8 w-8 text-blue-500" />}
                                                                        </div>
                                                                        <span className="text-sm font-semibold">{day.temp}°C</span>
                                                                        <span className="text-xs text-muted-foreground">{day.rain}%</span>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="mt-4 pt-4 border-t">
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <span className="text-muted-foreground">Expected rainfall impact:</span>
                                                                    <span className="font-medium">Reduce irrigation by 15%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="schedule" className="space-y-4">
                                            <div className="rounded-lg border p-4">
                                                <h3 className="text-lg font-semibold mb-4">Schedule Configuration</h3>
                                                <div className="grid gap-6 md:grid-cols-2">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <Label htmlFor="auto-schedule" className="flex items-center gap-2">
                                                                <Sliders className="h-4 w-4" />
                                                                <span>AI-powered auto scheduling</span>
                                                            </Label>
                                                            <Switch id="auto-schedule" defaultChecked />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <Label htmlFor="weather-adjust" className="flex items-center gap-2">
                                                                <CloudRain className="h-4 w-4" />
                                                                <span>Weather-based adjustments</span>
                                                            </Label>
                                                            <Switch id="weather-adjust" defaultChecked />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <Label htmlFor="soil-sensor" className="flex items-center gap-2">
                                                                <FileStack className="h-4 w-4" />
                                                                <span>Soil sensor integration</span>
                                                            </Label>
                                                            <Switch id="soil-sensor" defaultChecked />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <Label htmlFor="emergency-halt" className="flex items-center gap-2">
                                                                <AlertTriangle className="h-4 w-4" />
                                                                <span>Emergency halt during rain</span>
                                                            </Label>
                                                            <Switch id="emergency-halt" defaultChecked />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="mb-2">
                                                            <Label>Irrigation frequency</Label>
                                                        </div>
                                                        <Select defaultValue="daily">
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select frequency" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="twice-daily">Twice Daily</SelectItem>
                                                                <SelectItem value="daily">Daily</SelectItem>
                                                                <SelectItem value="alternate">Alternate Days</SelectItem>
                                                                <SelectItem value="custom">Custom Schedule</SelectItem>
                                                            </SelectContent>
                                                        </Select>

                                                        <div className="mt-4 mb-2">
                                                            <Label>Preferred irrigation time</Label>
                                                        </div>
                                                        <Select defaultValue="early-morning">
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select time" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="early-morning">Early Morning (4-6 AM)</SelectItem>
                                                                <SelectItem value="morning">Morning (6-9 AM)</SelectItem>
                                                                <SelectItem value="evening">Evening (5-7 PM)</SelectItem>
                                                                <SelectItem value="night">Night (8-10 PM)</SelectItem>
                                                                <SelectItem value="custom-time">Custom Time</SelectItem>
                                                            </SelectContent>
                                                        </Select>

                                                        <Button className="w-full mt-6">
                                                            <CalendarDays className="mr-2 h-4 w-4" />
                                                            View Full Calendar
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-lg border p-4">
                                                <h3 className="text-lg font-semibold mb-4">Upcoming Schedule</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                                                        <div className="flex items-center gap-3">
                                                            <Timer className="h-5 w-5 text-blue-500" />
                                                            <div>
                                                                <p className="font-medium">Next irrigation: {selectedZone.nextSchedule}</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Duration: {selectedZone.duration} minutes
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Button variant="outline" size="sm">
                                                            Edit
                                                        </Button>
                                                    </div>

                                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                                        <div className="flex items-center gap-3">
                                                            <CalendarDays className="h-5 w-5 text-slate-500" />
                                                            <div>
                                                                <p className="font-medium">In 2 days, 6:00 AM</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Duration: {selectedZone.duration} minutes (estimated)
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline">AI Scheduled</Badge>
                                                    </div>

                                                    <div className="flex items-center justify-between p-3 rounded-lg border">
                                                        <div className="flex items-center gap-3">
                                                            <CalendarDays className="h-5 w-5 text-slate-500" />
                                                            <div>
                                                                <p className="font-medium">In 4 days, 6:00 AM</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    Duration: {selectedZone.duration - 10} minutes (estimated)
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline">AI Scheduled</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="history" className="space-y-4">
                                            <div className="rounded-lg border p-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-lg font-semibold">Irrigation History</h3>
                                                    <Select defaultValue="week">
                                                        <SelectTrigger className="w-[150px]">
                                                            <SelectValue placeholder="Select period" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="week">Last 7 days</SelectItem>
                                                            <SelectItem value="month">Last 30 days</SelectItem>
                                                            <SelectItem value="season">This Season</SelectItem>
                                                            <SelectItem value="year">This Year</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="h-[300px] rounded-lg bg-muted mb-4">
                                                    {/* This would be a chart in a real implementation */}
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <BarChart className="h-12 w-12 text-muted-foreground/60" />
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">Total irrigations:</span>
                                                        <span className="font-medium">12 cycles</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">Total water used:</span>
                                                        <span className="font-medium">36,400 liters</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">Average duration:</span>
                                                        <span className="font-medium">52 minutes</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">Water efficiency rating:</span>
                                                        <span className="font-medium text-green-500">Excellent</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-lg border p-4">
                                                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                                                <div className="space-y-4">
                                                    <div className="flex items-start gap-3 pb-3 border-b">
                                                        <div className="rounded-full p-1.5 bg-blue-100 text-blue-600 mt-0.5">
                                                            <Droplet className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">Irrigation completed</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Duration: 45 minutes | Water used: 2,800 liters
                                                            </p>
                                                            <p className="text-xs text-muted-foreground mt-1">Today, 6:45 AM</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3 pb-3 border-b">
                                                        <div className="rounded-full p-1.5 bg-yellow-100 text-yellow-600 mt-0.5">
                                                            <Sliders className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">Duration adjusted by AI</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Changed from 40 to 45 minutes due to soil conditions
                                                            </p>
                                                            <p className="text-xs text-muted-foreground mt-1">Today, 5:50 AM</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3 pb-3 border-b">
                                                        <div className="rounded-full p-1.5 bg-green-100 text-green-600 mt-0.5">
                                                            <Check className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">System check completed</p>
                                                            <p className="text-sm text-muted-foreground">All valves and sensors operational</p>
                                                            <p className="text-xs text-muted-foreground mt-1">Yesterday, 8:00 PM</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-3">
                                                        <div className="rounded-full p-1.5 bg-blue-100 text-blue-600 mt-0.5">
                                                            <Droplet className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">Irrigation completed</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Duration: 45 minutes | Water used: 2,800 liters
                                                            </p>
                                                            <p className="text-xs text-muted-foreground mt-1">Yesterday, 6:45 AM</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button variant="ghost" className="w-full mt-4 text-sm">
                                                    View Full History
                                                </Button>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="settings" className="space-y-4">
                                            <div className="rounded-lg border p-4">
                                                <h3 className="text-lg font-semibold mb-4">Zone Configuration</h3>
                                                <div className="grid gap-6 md:grid-cols-2">
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label>Irrigation method</Label>
                                                            <Select defaultValue="drip">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select method" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="drip">Drip Irrigation</SelectItem>
                                                                    <SelectItem value="sprinkler">Sprinkler</SelectItem>
                                                                    <SelectItem value="micro">Micro Irrigation</SelectItem>
                                                                    <SelectItem value="surface">Surface Irrigation</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Crop type</Label>
                                                            <Select defaultValue="wheat">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select crop" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="wheat">Wheat</SelectItem>
                                                                    <SelectItem value="cotton">Cotton</SelectItem>
                                                                    <SelectItem value="soybeans">Soybeans</SelectItem>
                                                                    <SelectItem value="rice">Rice</SelectItem>
                                                                    <SelectItem value="custom">Other (Custom)</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Soil type</Label>
                                                            <Select defaultValue="loam">
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select soil type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="sandy">Sandy</SelectItem>
                                                                    <SelectItem value="loam">Loam</SelectItem>
                                                                    <SelectItem value="clay">Clay</SelectItem>
                                                                    <SelectItem value="silt">Silt</SelectItem>
                                                                    <SelectItem value="mixed">Mixed</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label>Target moisture level: {selectedZone.moistureTarget}%</Label>
                                                            <Slider value={[selectedZone.moistureTarget]} min={40} max={90} step={5} />
                                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                                <span>40%</span>
                                                                <span>65%</span>
                                                                <span>90%</span>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Flow rate: {selectedZone.flowRate} L/min</Label>
                                                            <Slider value={[selectedZone.flowRate]} min={20} max={100} step={1} />
                                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                                <span>20 L/min</span>
                                                                <span>60 L/min</span>
                                                                <span>100 L/min</span>
                                                            </div>
                                                        </div>

                                                        <div className="pt-4">
                                                            <Button variant="outline" className="w-full">
                                                                <MapPin className="mr-2 h-4 w-4" />
                                                                Configure Zone Area
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

