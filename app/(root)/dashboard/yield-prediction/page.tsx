"use client"

import { useState } from "react"
import {
    AlertTriangle,
    BarChart,
    Calendar,
    Cloud,
    CloudRain,
    Droplet,
    FileStack,
    FileText,
    Leaf,
    LineChart,
    PieChart,
    Plus,
    RefreshCw,
    Save,
    Smartphone,
    Tractor,
    TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample yield prediction data
const yieldData = {
    currentSeason: {
        crop: "Wheat",
        predictedYield: 32.5, // quintals per hectare
        previousYield: 30.2,
        regionalAverage: 28.7,
        confidence: 87,
        harvestDate: "June 15, 2024",
        factors: {
            weather: { impact: "positive", value: 8.5 },
            soil: { impact: "positive", value: 7.8 },
            irrigation: { impact: "neutral", value: 6.2 },
            pests: { impact: "negative", value: 4.5 },
            fertilizer: { impact: "positive", value: 8.2 },
        },
    },
    fields: [
        {
            id: 1,
            name: "North Field",
            crop: "Wheat",
            area: "3.5 hectares",
            predictedYield: 34.2,
            previousYield: 31.5,
            status: "excellent",
            harvestDate: "June 12, 2024",
        },
        {
            id: 2,
            name: "South Field",
            crop: "Cotton",
            area: "4.2 hectares",
            predictedYield: 28.5,
            previousYield: 27.8,
            status: "good",
            harvestDate: "September 5, 2024",
        },
        {
            id: 3,
            name: "East Field",
            crop: "Soybeans",
            area: "2.8 hectares",
            predictedYield: 26.8,
            previousYield: 25.2,
            status: "attention",
            harvestDate: "October 20, 2024",
        },
        {
            id: 4,
            name: "West Field",
            crop: "Rice",
            area: "5.1 hectares",
            predictedYield: 42.5,
            previousYield: 38.7,
            status: "excellent",
            harvestDate: "November 10, 2024",
        },
    ],
    historicalYields: [
        { year: 2019, yield: 27.5 },
        { year: 2020, yield: 28.2 },
        { year: 2021, yield: 29.8 },
        { year: 2022, yield: 28.5 },
        { year: 2023, yield: 30.2 },
        { year: 2024, yield: 32.5, predicted: true },
    ],
    recommendations: [
        "Apply additional nitrogen fertilizer (25 kg/ha) to East Field within the next 10 days",
        "Increase irrigation frequency in South Field during flowering stage",
        "Monitor for rust disease in North Field due to forecasted humid conditions",
        "Consider harvesting North Field 3-5 days earlier than planned based on maturity indicators",
    ],
}

export default function YieldPrediction() {
    const [activeTab, setActiveTab] = useState("overview")
    const [selectedField, setSelectedField] = useState(yieldData.fields[0])

    // Status color mapping
    const getStatusColor = (status: string) => {
        switch (status) {
            case "excellent":
                return "text-green-500 bg-green-50"
            case "good":
                return "text-blue-500 bg-blue-50"
            case "attention":
                return "text-yellow-500 bg-yellow-50"
            case "warning":
                return "text-red-500 bg-red-50"
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
                        <TrendingUp className="h-4 w-4" />
                        <h1 className="text-xl font-semibold">AI Yield Prediction</h1>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 gap-1">
                                <RefreshCw className="h-3.5 w-3.5" />
                                <span>Last update: 2 days ago</span>
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Harvest Calendar
                            </Button>
                            <Button variant="outline" size="sm">
                                <Save className="mr-2 h-4 w-4" />
                                Export Report
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    <div className="flex flex-col gap-6">
                        {/* Yield Overview */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Predicted Yield</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{yieldData.currentSeason.predictedYield} q/ha</div>
                                    <div className="flex items-center mt-2">
                                        <span className="text-xs text-green-500 font-medium">
                                            +{(yieldData.currentSeason.predictedYield - yieldData.currentSeason.previousYield).toFixed(1)}{" "}
                                            q/ha
                                        </span>
                                        <span className="text-xs text-muted-foreground ml-2">vs. last season</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Regional Comparison</CardTitle>
                                    <BarChart className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        +
                                        {(
                                            (yieldData.currentSeason.predictedYield / yieldData.currentSeason.regionalAverage - 1) *
                                            100
                                        ).toFixed(1)}
                                        %
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">Above regional average</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Prediction Confidence</CardTitle>
                                    <PieChart className="h-4 w-4 text-purple-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{yieldData.currentSeason.confidence}%</div>
                                    <Progress value={yieldData.currentSeason.confidence} className="h-2 mt-2" />
                                    <p className="text-xs text-muted-foreground mt-2">Based on historical data and current conditions</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Estimated Harvest</CardTitle>
                                    <Calendar className="h-4 w-4 text-orange-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{yieldData.currentSeason.harvestDate}</div>
                                    <p className="text-xs text-muted-foreground mt-2">Optimal harvest window: ±5 days</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Yield Tabs */}
                        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="fields">Field Analysis</TabsTrigger>
                                <TabsTrigger value="factors">Yield Factors</TabsTrigger>
                                <TabsTrigger value="historical">Historical Data</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Yield Prediction Overview</CardTitle>
                                        <CardDescription>AI-powered analysis of your expected crop yields</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Current Season Prediction</h3>
                                                <div className="h-[250px] rounded-lg bg-muted mb-4">
                                                    {/* This would be a chart in a real implementation */}
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <LineChart className="h-12 w-12 text-muted-foreground/60" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-muted-foreground">Primary Crop</p>
                                                        <p className="font-medium">{yieldData.currentSeason.crop}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Total Area</p>
                                                        <p className="font-medium">15.6 hectares</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Previous Yield</p>
                                                        <p className="font-medium">{yieldData.currentSeason.previousYield} q/ha</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-muted-foreground">Regional Average</p>
                                                        <p className="font-medium">{yieldData.currentSeason.regionalAverage} q/ha</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold">AI Recommendations</h3>
                                                <div className="space-y-3">
                                                    {yieldData.recommendations.map((recommendation, i) => (
                                                        <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Leaf className="h-4 w-4 text-green-600" />
                                                            </div>
                                                            <p className="text-sm">{recommendation}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="rounded-lg border p-4 mt-6">
                                                    <h4 className="font-medium mb-2">Potential Yield Improvement</h4>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">Current Prediction</span>
                                                        <span className="text-sm font-medium">{yieldData.currentSeason.predictedYield} q/ha</span>
                                                    </div>
                                                    <Progress value={85} className="h-2 mb-3" />
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">With All Recommendations</span>
                                                        <span className="text-sm font-medium">
                                                            {(yieldData.currentSeason.predictedYield * 1.12).toFixed(1)} q/ha
                                                        </span>
                                                    </div>
                                                    <Progress value={95} className="h-2" />
                                                    <p className="text-xs text-muted-foreground mt-3">
                                                        Implementing all recommendations could increase yield by up to 12%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline">
                                            <FileText className="mr-2 h-4 w-4" />
                                            View Detailed Report
                                        </Button>
                                        <Button>
                                            <Smartphone className="mr-2 h-4 w-4" />
                                            Get Mobile Updates
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="fields" className="space-y-4 mt-4">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    {yieldData.fields.map((field) => (
                                        <Card
                                            key={field.id}
                                            className={field.status === "attention" ? "border-yellow-300" : ""}
                                            onClick={() => setSelectedField(field)}
                                        >
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <CardTitle className="text-base">{field.name}</CardTitle>
                                                    <Badge className={`${getStatusColor(field.status)} border-none font-normal`}>
                                                        {field.status === "excellent"
                                                            ? "Excellent"
                                                            : field.status === "good"
                                                                ? "Good"
                                                                : field.status === "attention"
                                                                    ? "Needs Attention"
                                                                    : "Warning"}
                                                    </Badge>
                                                </div>
                                                <CardDescription>
                                                    {field.crop} - {field.area}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="pb-2">
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-baseline">
                                                        <span className="text-sm">Predicted Yield:</span>
                                                        <span className="font-medium">{field.predictedYield} q/ha</span>
                                                    </div>
                                                    <Progress value={(field.predictedYield / 45) * 100} className="h-2" />
                                                    <div className="flex justify-between text-xs text-muted-foreground">
                                                        <span>Previous: {field.previousYield} q/ha</span>
                                                        <span>Harvest: {field.harvestDate}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedField(field)}>
                                                    View Analysis
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>

                                {selectedField && (
                                    <Card className="mt-4">
                                        <CardHeader>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <CardTitle>{selectedField.name} - Detailed Analysis</CardTitle>
                                                    <CardDescription>
                                                        {selectedField.crop} - {selectedField.area}
                                                    </CardDescription>
                                                </div>
                                                <Badge className={`${getStatusColor(selectedField.status)} border-none`}>
                                                    {selectedField.status === "excellent"
                                                        ? "Excellent"
                                                        : selectedField.status === "good"
                                                            ? "Good"
                                                            : selectedField.status === "attention"
                                                                ? "Needs Attention"
                                                                : "Warning"}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-4">Yield Prediction</h3>
                                                    <div className="h-[250px] rounded-lg bg-muted mb-4">
                                                        {/* This would be a chart in a real implementation */}
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <BarChart className="h-12 w-12 text-muted-foreground/60" />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-muted-foreground">Predicted Yield</p>
                                                            <p className="font-medium">{selectedField.predictedYield} q/ha</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Previous Yield</p>
                                                            <p className="font-medium">{selectedField.previousYield} q/ha</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Change</p>
                                                            <p className="font-medium text-green-500">
                                                                +{(selectedField.predictedYield - selectedField.previousYield).toFixed(1)} q/ha
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-muted-foreground">Harvest Date</p>
                                                            <p className="font-medium">{selectedField.harvestDate}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold">Field-Specific Factors</h3>
                                                    <Accordion type="single" collapsible className="w-full">
                                                        <AccordionItem value="soil">
                                                            <AccordionTrigger>Soil Conditions</AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="space-y-2">
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Nitrogen</span>
                                                                        <span className="text-sm font-medium">280 kg/ha (Optimal)</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Phosphorus</span>
                                                                        <span className="text-sm font-medium">45 kg/ha (Optimal)</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Potassium</span>
                                                                        <span className="text-sm font-medium">190 kg/ha (Optimal)</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Organic Matter</span>
                                                                        <span className="text-sm font-medium">2.8% (Good)</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">pH Level</span>
                                                                        <span className="text-sm font-medium">6.7 (Optimal)</span>
                                                                    </div>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                        <AccordionItem value="weather">
                                                            <AccordionTrigger>Weather Impact</AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="space-y-2">
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Temperature</span>
                                                                        <span className="text-sm font-medium">Favorable</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Rainfall</span>
                                                                        <span className="text-sm font-medium">Slightly below optimal</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Sunshine Hours</span>
                                                                        <span className="text-sm font-medium">Optimal</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Extreme Events</span>
                                                                        <span className="text-sm font-medium">None predicted</span>
                                                                    </div>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                        <AccordionItem value="pests">
                                                            <AccordionTrigger>Pest & Disease Risk</AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="space-y-2">
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Aphids</span>
                                                                        <span className="text-sm font-medium">Low risk</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Rust Disease</span>
                                                                        <span className="text-sm font-medium text-yellow-500">Moderate risk</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Powdery Mildew</span>
                                                                        <span className="text-sm font-medium">Low risk</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Overall Impact</span>
                                                                        <span className="text-sm font-medium">-2% potential yield impact</span>
                                                                    </div>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                        <AccordionItem value="irrigation">
                                                            <AccordionTrigger>Irrigation Status</AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="space-y-2">
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Current Moisture</span>
                                                                        <span className="text-sm font-medium">72% (Optimal)</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Irrigation Efficiency</span>
                                                                        <span className="text-sm font-medium">85% (Good)</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Water Usage</span>
                                                                        <span className="text-sm font-medium">2,800 L/day</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-sm">Schedule Status</span>
                                                                        <span className="text-sm font-medium">On track</span>
                                                                    </div>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </Accordion>

                                                    <div className="rounded-lg border p-4 mt-2">
                                                        <h4 className="font-medium mb-2">Field-Specific Recommendations</h4>
                                                        <ul className="space-y-2 text-sm">
                                                            <li className="flex items-start gap-2">
                                                                <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                    <Tractor className="h-3 w-3 text-green-600" />
                                                                </div>
                                                                <span>
                                                                    Consider harvesting 3-5 days earlier than planned based on maturity indicators
                                                                </span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                    <AlertTriangle className="h-3 w-3 text-green-600" />
                                                                </div>
                                                                <span>Monitor for rust disease due to forecasted humid conditions</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                    <Droplet className="h-3 w-3 text-green-600" />
                                                                </div>
                                                                <span>Maintain current irrigation schedule for optimal moisture levels</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full">
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Custom Factors
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                )}
                            </TabsContent>

                            <TabsContent value="factors" className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Yield Influencing Factors</CardTitle>
                                        <CardDescription>Analysis of key factors affecting your predicted yield</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Factor Impact Analysis</h3>
                                                <div className="h-[250px] rounded-lg bg-muted mb-4">
                                                    {/* This would be a chart in a real implementation */}
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <PieChart className="h-12 w-12 text-muted-foreground/60" />
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    The chart above shows the relative impact of different factors on your predicted yield.
                                                    Weather and soil conditions are currently the most significant positive contributors.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold mb-4">Factor Breakdown</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="flex items-center gap-2">
                                                                <CloudRain className="h-4 w-4 text-blue-500" />
                                                                <span className="text-sm font-medium">Weather Conditions</span>
                                                            </div>
                                                            <Badge
                                                                variant={
                                                                    yieldData.currentSeason.factors.weather.impact === "positive"
                                                                        ? "outline"
                                                                        : "destructive"
                                                                }
                                                            >
                                                                {yieldData.currentSeason.factors.weather.impact}
                                                            </Badge>
                                                        </div>
                                                        <Progress value={yieldData.currentSeason.factors.weather.value * 10} className="h-2" />
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Favorable temperature and rainfall patterns are contributing positively to yield
                                                            potential.
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="flex items-center gap-2">
                                                                <FileStack className="h-4 w-4 text-brown-500" />
                                                                <span className="text-sm font-medium">Soil Health</span>
                                                            </div>
                                                            <Badge
                                                                variant={
                                                                    yieldData.currentSeason.factors.soil.impact === "positive" ? "outline" : "destructive"
                                                                }
                                                            >
                                                                {yieldData.currentSeason.factors.soil.impact}
                                                            </Badge>
                                                        </div>
                                                        <Progress value={yieldData.currentSeason.factors.soil.value * 10} className="h-2" />
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Optimal nutrient levels and good soil structure are supporting strong crop development.
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="flex items-center gap-2">
                                                                <Droplet className="h-4 w-4 text-blue-500" />
                                                                <span className="text-sm font-medium">Irrigation Management</span>
                                                            </div>
                                                            <Badge
                                                                variant={
                                                                    yieldData.currentSeason.factors.irrigation.impact === "positive"
                                                                        ? "outline"
                                                                        : "destructive"
                                                                }
                                                            >
                                                                {yieldData.currentSeason.factors.irrigation.impact}
                                                            </Badge>
                                                        </div>
                                                        <Progress value={yieldData.currentSeason.factors.irrigation.value * 10} className="h-2" />
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Current irrigation practices are maintaining adequate soil moisture levels.
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="flex items-center gap-2">
                                                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                                                <span className="text-sm font-medium">Pest & Disease Pressure</span>
                                                            </div>
                                                            <Badge
                                                                variant={
                                                                    yieldData.currentSeason.factors.pests.impact === "positive"
                                                                        ? "outline"
                                                                        : "destructive"
                                                                }
                                                            >
                                                                {yieldData.currentSeason.factors.pests.impact}
                                                            </Badge>
                                                        </div>
                                                        <Progress value={yieldData.currentSeason.factors.pests.value * 10} className="h-2" />
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Some pest pressure detected. Monitoring and preventative measures recommended.
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="flex items-center gap-2">
                                                                <Leaf className="h-4 w-4 text-green-500" />
                                                                <span className="text-sm font-medium">Fertilizer Application</span>
                                                            </div>
                                                            <Badge
                                                                variant={
                                                                    yieldData.currentSeason.factors.fertilizer.impact === "positive"
                                                                        ? "outline"
                                                                        : "destructive"
                                                                }
                                                            >
                                                                {yieldData.currentSeason.factors.fertilizer.impact}
                                                            </Badge>
                                                        </div>
                                                        <Progress value={yieldData.currentSeason.factors.fertilizer.value * 10} className="h-2" />
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Optimal fertilizer application timing and rates are supporting strong crop growth.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator className="my-6" />

                                        <div>
                                            <h3 className="text-lg font-semibold mb-4">Sensitivity Analysis</h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                This analysis shows how changes in key factors could impact your predicted yield.
                                            </p>

                                            <div className="grid gap-4 md:grid-cols-3">
                                                <div className="rounded-lg border p-4">
                                                    <h4 className="font-medium mb-2">Weather Scenario</h4>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">Current Prediction</span>
                                                        <span className="text-sm font-medium">{yieldData.currentSeason.predictedYield} q/ha</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">With Drought</span>
                                                        <span className="text-sm font-medium text-red-500">
                                                            {(yieldData.currentSeason.predictedYield * 0.85).toFixed(1)} q/ha
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm">With Ideal Weather</span>
                                                        <span className="text-sm font-medium text-green-500">
                                                            {(yieldData.currentSeason.predictedYield * 1.08).toFixed(1)} q/ha
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg border p-4">
                                                    <h4 className="font-medium mb-2">Pest Management</h4>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">Current Prediction</span>
                                                        <span className="text-sm font-medium">{yieldData.currentSeason.predictedYield} q/ha</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">With High Pressure</span>
                                                        <span className="text-sm font-medium text-red-500">
                                                            {(yieldData.currentSeason.predictedYield * 0.88).toFixed(1)} q/ha
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm">With Optimal Control</span>
                                                        <span className="text-sm font-medium text-green-500">
                                                            {(yieldData.currentSeason.predictedYield * 1.05).toFixed(1)} q/ha
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg border p-4">
                                                    <h4 className="font-medium mb-2">Fertilizer Optimization</h4>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">Current Prediction</span>
                                                        <span className="text-sm font-medium">{yieldData.currentSeason.predictedYield} q/ha</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">With Reduced Application</span>
                                                        <span className="text-sm font-medium text-red-500">
                                                            {(yieldData.currentSeason.predictedYield * 0.92).toFixed(1)} q/ha
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm">With Precision Application</span>
                                                        <span className="text-sm font-medium text-green-500">
                                                            {(yieldData.currentSeason.predictedYield * 1.07).toFixed(1)} q/ha
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="historical" className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Historical Yield Analysis</CardTitle>
                                        <CardDescription>Compare current predictions with historical performance</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[300px] rounded-lg bg-muted mb-6">
                                            {/* This would be a chart in a real implementation */}
                                            <div className="w-full h-full flex items-center justify-center">
                                                <BarChart className="h-12 w-12 text-muted-foreground/60" />
                                            </div>
                                        </div>

                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Yield Trends</h3>
                                                <div className="rounded-lg border overflow-hidden">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="bg-muted/50">
                                                                <th className="p-2 text-left font-medium text-sm">Year</th>
                                                                <th className="p-2 text-left font-medium text-sm">Yield (q/ha)</th>
                                                                <th className="p-2 text-left font-medium text-sm">Change</th>
                                                                <th className="p-2 text-left font-medium text-sm">Notes</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {yieldData.historicalYields.map((item, i) => (
                                                                <tr key={i} className={`border-t ${item.predicted ? "bg-muted/30" : ""}`}>
                                                                    <td className="p-2 text-sm">{item.year}</td>
                                                                    <td className="p-2 text-sm font-medium">{item.yield} q/ha</td>
                                                                    <td className="p-2 text-sm">
                                                                        {i > 0 ? (
                                                                            <span
                                                                                className={
                                                                                    item.yield > yieldData.historicalYields[i - 1].yield
                                                                                        ? "text-green-500"
                                                                                        : "text-red-500"
                                                                                }
                                                                            >
                                                                                {((item.yield / yieldData.historicalYields[i - 1].yield - 1) * 100).toFixed(1)}%
                                                                            </span>
                                                                        ) : (
                                                                            "-"
                                                                        )}
                                                                    </td>
                                                                    <td className="p-2 text-sm text-muted-foreground">
                                                                        {item.predicted
                                                                            ? "AI Prediction"
                                                                            : i === 4
                                                                                ? "Drought conditions"
                                                                                : i === 2
                                                                                    ? "Optimal weather"
                                                                                    : ""}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold mb-4">Performance Analysis</h3>
                                                <div className="rounded-lg border p-4">
                                                    <h4 className="font-medium mb-3">5-Year Trend</h4>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">Average Yield</span>
                                                        <span className="text-sm font-medium">28.8 q/ha</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">Growth Rate</span>
                                                        <span className="text-sm font-medium text-green-500">+4.2% per year</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-sm">Variability</span>
                                                        <span className="text-sm font-medium">±5.8%</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm">Current vs. 5-Year Avg</span>
                                                        <span className="text-sm font-medium text-green-500">+12.8%</span>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg border p-4">
                                                    <h4 className="font-medium mb-3">Key Insights</h4>
                                                    <ul className="space-y-2 text-sm">
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <TrendingUp className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Consistent yield improvement over the past 5 years</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Cloud className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Weather conditions in 2023 negatively impacted yields</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Leaf className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Improved farming practices have contributed to yield growth</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <BarChart className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>2024 prediction represents highest yield in 5-year period</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Generate Comprehensive Report
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

