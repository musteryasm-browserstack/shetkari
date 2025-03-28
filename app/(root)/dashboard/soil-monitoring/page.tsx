"use client"

import { useState } from "react"
import {
    BarChart2,
    Calendar,
    Clock,
    Cloud,
    Download,
    FileStack,
    Maximize2,
    PieChart,
    Plus,
    Save,
    SlidersHorizontal,
    Smartphone,
    Thermometer,
    Wind,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Sample soil data for each field
const fieldData = [
    {
        id: 1,
        name: "North Field",
        crop: "Wheat",
        ph: 6.7,
        nitrogen: 280, // kg/ha
        phosphorus: 45, // kg/ha
        potassium: 190, // kg/ha
        organic: 2.8, // %
        moisture: 72, // %
        temperature: 24, // °C
        lastUpdated: "Today, 2:45 PM",
        status: "optimal",
        recommendations: "No fertilizer needed. Maintain current irrigation schedule.",
    },
    {
        id: 2,
        name: "South Field",
        crop: "Cotton",
        ph: 5.9,
        nitrogen: 210, // kg/ha
        phosphorus: 35, // kg/ha
        potassium: 165, // kg/ha
        organic: 1.9, // %
        moisture: 65, // %
        temperature: 26, // °C
        lastUpdated: "Today, 11:20 AM",
        status: "attention",
        recommendations: "Add 30 kg/ha nitrogen fertilizer within 7 days. Check pH levels.",
    },
    {
        id: 3,
        name: "East Field",
        crop: "Soybeans",
        ph: 7.2,
        nitrogen: 245, // kg/ha
        phosphorus: 30, // kg/ha
        potassium: 180, // kg/ha
        organic: 2.3, // %
        moisture: 58, // %
        temperature: 25, // °C
        lastUpdated: "Yesterday, 4:15 PM",
        status: "warning",
        recommendations: "Increase phosphorus. Consider irrigation within 24 hours.",
    },
    {
        id: 4,
        name: "West Field",
        crop: "Rice",
        ph: 6.4,
        nitrogen: 260, // kg/ha
        phosphorus: 42, // kg/ha
        potassium: 195, // kg/ha
        organic: 3.1, // %
        moisture: 85, // %
        temperature: 23, // °C
        lastUpdated: "Today, 9:30 AM",
        status: "optimal",
        recommendations: "Maintain current levels. Consider decreasing irrigation frequency.",
    },
]

// Historical data for charts
const historicalData = {
    moisture: [65, 68, 72, 70, 67, 65, 72],
    nitrogen: [240, 245, 255, 270, 280, 275, 280],
    ph: [6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.7],
}

// Optimal ranges for nutrients
const optimalRanges = {
    ph: { min: 6.0, max: 7.0 },
    nitrogen: { min: 250, max: 300 }, // kg/ha
    phosphorus: { min: 40, max: 60 }, // kg/ha
    potassium: { min: 180, max: 220 }, // kg/ha
    organic: { min: 2.0, max: 4.0 }, // %
    moisture: { min: 60, max: 75 }, // %
}

// Calculate percentage within optimal range
// interface OptimalRange {
//     min: number;
//     max: number;
// }

const calculatePercentage = (value: number, min: number, max: number): number => {
    if (value < min) return (value / min) * 50;
    if (value > max) return 50 + (max / value) * 50;
    return 50 + ((value - min) / (max - min)) * 50;
};

export default function SoilMonitoring() {
    const [selectedField, setSelectedField] = useState(fieldData[0])
    const [timeRange, setTimeRange] = useState("week")

    return (
        <div className="flex min-h-screen bg-background">
            {/* Main Content */}
            <div className="flex flex-col w-full">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
                    <div className="flex items-center gap-2">
                        <FileStack className="h-4 w-4" />
                        <h1 className="text-xl font-semibold">Soil Nutrient Monitoring</h1>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                                <Download className="mr-2 h-3.5 w-3.5" />
                                Export
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    <div className="flex flex-col gap-6">
                        {/* Field selector and view options */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Select
                                    value={selectedField.id.toString()}
                                    onValueChange={(value) =>
                                        setSelectedField(fieldData.find((field) => field.id === Number.parseInt(value)) || selectedField)
                                    }
                                >
                                    <SelectTrigger className="w-full sm:w-[240px]">
                                        <SelectValue placeholder="Select field" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fieldData.map((field) => (
                                            <SelectItem key={field.id} value={field.id.toString()}>
                                                {field.name} ({field.crop})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    Last updated: {selectedField.lastUpdated}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Select defaultValue="daily">
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Update" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hourly">Hourly</SelectItem>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button variant="outline" size="sm">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                                    Settings
                                </Button>
                            </div>
                        </div>

                        {/* Status card */}
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{selectedField.name} - Overall Soil Health</CardTitle>
                                        <CardDescription>
                                            AI analysis based on real-time sensor data and historical patterns
                                        </CardDescription>
                                    </div>
                                    <div
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${selectedField.status === "optimal"
                                            ? "bg-green-100 text-green-800"
                                            : selectedField.status === "attention"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {selectedField.status === "optimal"
                                            ? "Optimal"
                                            : selectedField.status === "attention"
                                                ? "Needs Attention"
                                                : "Warning"}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
                                        <p className="text-muted-foreground">{selectedField.recommendations}</p>

                                        <div className="mt-6 space-y-2">
                                            <h4 className="font-medium">Environmental Factors</h4>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                                                    <Thermometer className="h-5 w-5 text-orange-500 mb-1" />
                                                    <span className="text-xs text-muted-foreground">Temperature</span>
                                                    <span className="font-semibold">{selectedField.temperature}°C</span>
                                                </div>
                                                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                                                    <Cloud className="h-5 w-5 text-blue-500 mb-1" />
                                                    <span className="text-xs text-muted-foreground">Humidity</span>
                                                    <span className="font-semibold">65%</span>
                                                </div>
                                                <div className="flex flex-col items-center justify-center rounded-lg border p-3">
                                                    <Wind className="h-5 w-5 text-blue-400 mb-1" />
                                                    <span className="text-xs text-muted-foreground">Wind</span>
                                                    <span className="font-semibold">8 km/h</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium">pH Level</span>
                                                    <span className="text-sm">{selectedField.ph}</span>
                                                </div>
                                                <Progress
                                                    value={calculatePercentage(selectedField.ph, optimalRanges.ph.min, optimalRanges.ph.max)}
                                                    className="h-2"
                                                />
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Optimal: {optimalRanges.ph.min}-{optimalRanges.ph.max}
                                                </p>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium">Moisture</span>
                                                    <span className="text-sm">{selectedField.moisture}%</span>
                                                </div>
                                                <Progress
                                                    value={calculatePercentage(
                                                        selectedField.moisture,
                                                        optimalRanges.moisture.min,
                                                        optimalRanges.moisture.max,
                                                    )}
                                                    className="h-2"
                                                />
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Optimal: {optimalRanges.moisture.min}-{optimalRanges.moisture.max}%
                                                </p>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div>
                                            <h4 className="font-medium mb-2">Key Nutrients (kg/ha)</h4>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm font-medium">Nitrogen (N)</span>
                                                        <span className="text-sm">{selectedField.nitrogen} kg/ha</span>
                                                    </div>
                                                    <Progress
                                                        value={calculatePercentage(
                                                            selectedField.nitrogen,
                                                            optimalRanges.nitrogen.min,
                                                            optimalRanges.nitrogen.max,
                                                        )}
                                                        className="h-2"
                                                    />
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Optimal: {optimalRanges.nitrogen.min}-{optimalRanges.nitrogen.max} kg/ha
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm font-medium">Phosphorus (P)</span>
                                                        <span className="text-sm">{selectedField.phosphorus} kg/ha</span>
                                                    </div>
                                                    <Progress
                                                        value={calculatePercentage(
                                                            selectedField.phosphorus,
                                                            optimalRanges.phosphorus.min,
                                                            optimalRanges.phosphorus.max,
                                                        )}
                                                        className="h-2"
                                                    />
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Optimal: {optimalRanges.phosphorus.min}-{optimalRanges.phosphorus.max} kg/ha
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm font-medium">Potassium (K)</span>
                                                        <span className="text-sm">{selectedField.potassium} kg/ha</span>
                                                    </div>
                                                    <Progress
                                                        value={calculatePercentage(
                                                            selectedField.potassium,
                                                            optimalRanges.potassium.min,
                                                            optimalRanges.potassium.max,
                                                        )}
                                                        className="h-2"
                                                    />
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Optimal: {optimalRanges.potassium.min}-{optimalRanges.potassium.max} kg/ha
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm font-medium">Organic Matter</span>
                                                        <span className="text-sm">{selectedField.organic}%</span>
                                                    </div>
                                                    <Progress
                                                        value={calculatePercentage(
                                                            selectedField.organic,
                                                            optimalRanges.organic.min,
                                                            optimalRanges.organic.max,
                                                        )}
                                                        className="h-2"
                                                    />
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Optimal: {optimalRanges.organic.min}-{optimalRanges.organic.max}%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t pt-4">
                                <Button variant="outline">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Schedule Treatment
                                </Button>
                                <Button>
                                    <Save className="mr-2 h-4 w-4" />
                                    Generate Report
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Historical Data & Trends */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Historical Data & Trends</h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Soil Moisture Trend</CardTitle>
                                            <Select value={timeRange} onValueChange={setTimeRange}>
                                                <SelectTrigger className="w-[100px] h-8">
                                                    <SelectValue placeholder="Time Range" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="week">Week</SelectItem>
                                                    <SelectItem value="month">Month</SelectItem>
                                                    <SelectItem value="year">Year</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <div className="h-[220px] mt-4">
                                            <div className="flex items-baseline justify-between mb-6">
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Current</div>
                                                    <div className="text-2xl font-bold">{selectedField.moisture}%</div>
                                                </div>
                                                <div className="text-xs text-muted-foreground text-right">
                                                    <div>Avg: 68%</div>
                                                    <div>Min: 65%</div>
                                                    <div>Max: 72%</div>
                                                </div>
                                            </div>
                                            <div className="relative h-[150px] w-full">
                                                <div className="absolute inset-0 flex items-end">
                                                    {historicalData.moisture.map((value, i) => (
                                                        <div key={i} className="relative flex-1 mx-[1px]">
                                                            <div
                                                                className="absolute bottom-0 w-full bg-blue-500 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                                                                style={{ height: `${value * 2}px` }}
                                                            ></div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="absolute left-0 right-0 bottom-[-20px] flex justify-between text-xs text-muted-foreground">
                                                    <div>7 days ago</div>
                                                    <div>Today</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end pt-2">
                                        <Button variant="ghost" size="sm" className="gap-1 text-xs h-8">
                                            <Maximize2 className="h-3 w-3" />
                                            <span>View Full</span>
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Nitrogen Levels</CardTitle>
                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                <BarChart2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <div className="h-[220px] mt-4">
                                            <div className="flex items-baseline justify-between mb-6">
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Current</div>
                                                    <div className="text-2xl font-bold">{selectedField.nitrogen} kg/ha</div>
                                                </div>
                                                <div className="text-xs text-muted-foreground text-right">
                                                    <div>Target: 275 kg/ha</div>
                                                    <div>7-day change: +40 kg/ha</div>
                                                </div>
                                            </div>
                                            <div className="relative h-[150px] w-full">
                                                <div className="absolute inset-0 flex items-end">
                                                    {historicalData.nitrogen.map((value, i) => (
                                                        <div key={i} className="relative flex-1 mx-[1px]">
                                                            <div
                                                                className="absolute bottom-0 w-full bg-green-500 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                                                                style={{ height: `${value / 2}px` }}
                                                            ></div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="absolute left-0 right-0 bottom-[-20px] flex justify-between text-xs text-muted-foreground">
                                                    <div>7 days ago</div>
                                                    <div>Today</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end pt-2">
                                        <Button variant="ghost" size="sm" className="gap-1 text-xs h-8">
                                            <Maximize2 className="h-3 w-3" />
                                            <span>View Full</span>
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle>pH Level History</CardTitle>
                                            <Button variant="outline" size="icon" className="h-8 w-8">
                                                <PieChart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <div className="h-[220px] mt-4">
                                            <div className="flex items-baseline justify-between mb-6">
                                                <div>
                                                    <div className="text-xs text-muted-foreground">Current</div>
                                                    <div className="text-2xl font-bold">{selectedField.ph}</div>
                                                </div>
                                                <div className="text-xs text-muted-foreground text-right">
                                                    <div>Optimal: 6.0-7.0</div>
                                                    <div>30-day trend: Stable</div>
                                                </div>
                                            </div>
                                            <div className="relative h-[150px] w-full">
                                                <div className="absolute inset-0 flex items-end">
                                                    {historicalData.ph.map((value, i) => (
                                                        <div key={i} className="relative flex-1 mx-[1px]">
                                                            <div
                                                                className="absolute bottom-0 w-full bg-yellow-500 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                                                                style={{ height: `${value * 25}px` }}
                                                            ></div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="absolute left-0 right-0 bottom-[-20px] flex justify-between text-xs text-muted-foreground">
                                                    <div>7 days ago</div>
                                                    <div>Today</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end pt-2">
                                        <Button variant="ghost" size="sm" className="gap-1 text-xs h-8">
                                            <Maximize2 className="h-3 w-3" />
                                            <span>View Full</span>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>

                        {/* Sensor Network */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Soil Sensor Network</h2>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sensor Status & Readings</CardTitle>
                                    <CardDescription>Real-time data from your IoT soil monitoring sensors</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <div className="mb-4 flex items-center justify-between">
                                                <h3 className="font-medium">Sensor Locations</h3>
                                                <Button variant="outline" size="sm">
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Add Sensor
                                                </Button>
                                            </div>

                                            <div className="relative h-[300px] w-full rounded-lg border">
                                                <div className="absolute inset-0 bg-muted/30 overflow-hidden rounded-lg p-4">
                                                    {/* Simple farm map representation */}
                                                    <div className="relative h-full w-full border-2 border-dashed border-muted rounded-md bg-muted/20">
                                                        {/* Sensor points */}
                                                        <div className="absolute h-4 w-4 rounded-full bg-green-500 top-[20%] left-[30%]"></div>
                                                        <div className="absolute h-4 w-4 rounded-full bg-green-500 top-[60%] left-[40%]"></div>
                                                        <div className="absolute h-4 w-4 rounded-full bg-green-500 top-[30%] left-[70%]"></div>
                                                        <div className="absolute h-4 w-4 rounded-full bg-yellow-500 top-[70%] left-[65%]"></div>
                                                        <div className="absolute h-4 w-4 rounded-full bg-red-500 top-[15%] left-[15%]"></div>

                                                        {/* Field borders */}
                                                        <div className="absolute h-[40%] w-[35%] border border-dashed border-muted-foreground/40 top-[10%] left-[10%] rounded-md"></div>
                                                        <div className="absolute h-[35%] w-[40%] border border-dashed border-muted-foreground/40 top-[55%] left-[30%] rounded-md"></div>
                                                        <div className="absolute h-[45%] w-[30%] border border-dashed border-muted-foreground/40 top-[10%] left-[60%] rounded-md"></div>
                                                        <div className="absolute h-[30%] w-[25%] border border-dashed border-muted-foreground/40 top-[60%] left-[65%] rounded-md"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                                    <span>Active</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                                    <span>Low Battery</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                                    <span>Offline</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-4">Sensor Configuration</h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="reading-frequency">Reading Frequency</Label>
                                                        <Select defaultValue="hourly">
                                                            <SelectTrigger id="reading-frequency">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="15min">Every 15 minutes</SelectItem>
                                                                <SelectItem value="hourly">Hourly</SelectItem>
                                                                <SelectItem value="daily">Daily</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="data-transmission">Data Transmission</Label>
                                                        <Select defaultValue="realtime">
                                                            <SelectTrigger id="data-transmission">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="realtime">Real-time</SelectItem>
                                                                <SelectItem value="batch">Batch (Daily)</SelectItem>
                                                                <SelectItem value="manual">Manual</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div className="space-y-4">
                                                    <h4 className="text-sm font-medium">Alert Settings</h4>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="moisture-alerts" className="flex items-center gap-2">
                                                            <span>Moisture level alerts</span>
                                                        </Label>
                                                        <Switch id="moisture-alerts" defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="nutrient-alerts" className="flex items-center gap-2">
                                                            <span>Nutrient deficiency alerts</span>
                                                        </Label>
                                                        <Switch id="nutrient-alerts" defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="ph-alerts" className="flex items-center gap-2">
                                                            <span>pH imbalance alerts</span>
                                                        </Label>
                                                        <Switch id="ph-alerts" defaultChecked />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <Label htmlFor="battery-alerts" className="flex items-center gap-2">
                                                            <span>Sensor battery alerts</span>
                                                        </Label>
                                                        <Switch id="battery-alerts" defaultChecked />
                                                    </div>
                                                </div>

                                                <div className="pt-2">
                                                    <Button className="w-full">
                                                        <Smartphone className="mr-2 h-4 w-4" />
                                                        Connect Mobile App
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

