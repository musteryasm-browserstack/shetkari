"use client"

import { useState } from "react"
import {
    AlertTriangle,
    Bug,
    Calendar,
    Cloud,
    CloudRain,
    FileText,
    LineChart,
    PieChart,
    Plus,
    RefreshCw,
    Save,
    Smartphone,
    Thermometer,
    TrendingUp,
    Wind,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample climate risk data
const climateData = {
    riskScore: 68, // 0-100 scale
    riskLevel: "moderate",
    shortTerm: {
        drought: { risk: "high", impact: "Reduced crop yields, water stress" },
        flood: { risk: "low", impact: "Minimal risk in current season" },
        heatwave: { risk: "moderate", impact: "Potential heat stress during flowering" },
        storms: { risk: "low", impact: "Low probability of severe storms" },
    },
    longTerm: {
        temperature: { trend: "+1.8°C by 2050", impact: "Shifting growing seasons, heat stress" },
        precipitation: { trend: "-15% by 2050", impact: "Increased drought frequency, water scarcity" },
        extremeEvents: { trend: "+30% frequency", impact: "More frequent floods, droughts, and storms" },
        pests: { trend: "New species emergence", impact: "Novel pest and disease pressures" },
    },
    adaptationScore: 62, // 0-100 scale
    adaptationMeasures: [
        { name: "Drought-resistant crops", status: "implemented", effectiveness: 75 },
        { name: "Water conservation", status: "implemented", effectiveness: 80 },
        { name: "Crop diversification", status: "planned", effectiveness: 65 },
        { name: "Weather insurance", status: "not implemented", effectiveness: 70 },
        { name: "Improved irrigation", status: "implemented", effectiveness: 85 },
    ],
    recommendations: [
        "Implement crop diversification to spread climate risk",
        "Invest in weather insurance to protect against extreme events",
        "Increase water storage capacity for drought periods",
        "Adopt conservation agriculture practices to improve soil health",
        "Install shade structures for heat-sensitive crops",
    ],
}

function ShieldIcon({ className = "h-4 w-4", ...props }) {
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    )
}

export default function ClimateRisk() {
    const [activeTab, setActiveTab] = useState("current")
    const [timeframe, setTimeframe] = useState("2030")

    // Risk color mapping
    const getRiskColor = (risk: string) => {
        switch (risk) {
            case "high":
                return "text-red-500 bg-red-50"
            case "moderate":
                return "text-yellow-500 bg-yellow-50"
            case "low":
                return "text-green-500 bg-green-50"
            default:
                return "text-slate-500 bg-slate-50"
        }
    }

    // Status color mapping
    const getStatusColor = (status: string) => {
        switch (status) {
            case "implemented":
                return "text-green-500 bg-green-50"
            case "planned":
                return "text-blue-500 bg-blue-50"
            case "not implemented":
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
                        <Cloud className="h-4 w-4" />
                        <h1 className="text-xl font-semibold">Climate Risk Assessment</h1>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 gap-1">
                                <RefreshCw className="h-3.5 w-3.5" />
                                <span>Last update: 1 month ago</span>
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Historical Data
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
                        {/* Risk Overview */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Climate Risk Score</CardTitle>
                                    <AlertTriangle
                                        className={`h-4 w-4 ${climateData.riskScore > 75
                                            ? "text-red-500"
                                            : climateData.riskScore > 50
                                                ? "text-yellow-500"
                                                : "text-green-500"
                                            }`}
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{climateData.riskScore}/100</div>
                                    <Progress value={climateData.riskScore} className="h-2 mt-2" />
                                    <div className="flex items-center mt-2">
                                        <Badge
                                            className={`${climateData.riskScore > 75
                                                ? "bg-red-100 text-red-800"
                                                : climateData.riskScore > 50
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-green-100 text-green-800"
                                                } border-none font-normal`}
                                        >
                                            {climateData.riskLevel.toUpperCase()} RISK
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Short-Term Risk</CardTitle>
                                    <Thermometer className="h-4 w-4 text-red-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Drought</div>
                                    <div className="flex items-center mt-2">
                                        <Badge className={`${getRiskColor(climateData.shortTerm.drought.risk)} border-none font-normal`}>
                                            {climateData.shortTerm.drought.risk.toUpperCase()} RISK
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">Primary concern for current growing season</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Long-Term Trend</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Warming</div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {climateData.longTerm.temperature.trend} with more variable precipitation
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Adaptation Score</CardTitle>
                                    <ShieldIcon className="h-4 w-4 text-green-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{climateData.adaptationScore}/100</div>
                                    <Progress value={climateData.adaptationScore} className="h-2 mt-2" />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {climateData.adaptationScore > 75
                                            ? "Well prepared"
                                            : climateData.adaptationScore > 50
                                                ? "Moderately prepared"
                                                : "Needs improvement"}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Climate Risk Tabs */}
                        <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="current">Current Risks</TabsTrigger>
                                <TabsTrigger value="future">Future Projections</TabsTrigger>
                                <TabsTrigger value="adaptation">Adaptation Measures</TabsTrigger>
                                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                            </TabsList>

                            <TabsContent value="current" className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Climate Risks</CardTitle>
                                        <CardDescription>Short-term climate risks affecting your farm</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Risk Assessment</h3>
                                                <div className="h-[250px] rounded-lg bg-muted mb-4">
                                                    {/* This would be a chart in a real implementation */}
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <PieChart className="h-12 w-12 text-muted-foreground/60" />
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    The chart above shows the relative impact of different climate risks on your farm operations.
                                                    Drought represents the highest current risk, followed by heatwaves.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold mb-4">Risk Breakdown</h3>
                                                <div className="space-y-4">
                                                    <div className="rounded-lg border p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <Thermometer className="h-5 w-5 text-red-500" />
                                                                <h4 className="font-medium">Drought Risk</h4>
                                                            </div>
                                                            <Badge className={`${getRiskColor(climateData.shortTerm.drought.risk)} border-none`}>
                                                                {climateData.shortTerm.drought.risk.toUpperCase()}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">{climateData.shortTerm.drought.impact}</p>
                                                        <div className="text-xs text-muted-foreground">
                                                            <span className="font-medium">Probability:</span> 65% chance of below-average rainfall
                                                        </div>
                                                    </div>

                                                    <div className="rounded-lg border p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <Thermometer className="h-5 w-5 text-orange-500" />
                                                                <h4 className="font-medium">Heatwave Risk</h4>
                                                            </div>
                                                            <Badge className={`${getRiskColor(climateData.shortTerm.heatwave.risk)} border-none`}>
                                                                {climateData.shortTerm.heatwave.risk.toUpperCase()}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            {climateData.shortTerm.heatwave.impact}
                                                        </p>
                                                        <div className="text-xs text-muted-foreground">
                                                            <span className="font-medium">Probability:</span> 40% chance of extended high temperatures
                                                        </div>
                                                    </div>

                                                    <div className="rounded-lg border p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <CloudRain className="h-5 w-5 text-blue-500" />
                                                                <h4 className="font-medium">Flood Risk</h4>
                                                            </div>
                                                            <Badge className={`${getRiskColor(climateData.shortTerm.flood.risk)} border-none`}>
                                                                {climateData.shortTerm.flood.risk.toUpperCase()}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">{climateData.shortTerm.flood.impact}</p>
                                                        <div className="text-xs text-muted-foreground">
                                                            <span className="font-medium">Probability:</span> 15% chance of flooding events
                                                        </div>
                                                    </div>

                                                    <div className="rounded-lg border p-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <Wind className="h-5 w-5 text-blue-400" />
                                                                <h4 className="font-medium">Storm Risk</h4>
                                                            </div>
                                                            <Badge className={`${getRiskColor(climateData.shortTerm.storms.risk)} border-none`}>
                                                                {climateData.shortTerm.storms.risk.toUpperCase()}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">{climateData.shortTerm.storms.impact}</p>
                                                        <div className="text-xs text-muted-foreground">
                                                            <span className="font-medium">Probability:</span> 20% chance of severe storms
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Generate Detailed Risk Report
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="future" className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                            <div>
                                                <CardTitle>Future Climate Projections</CardTitle>
                                                <CardDescription>Long-term climate trends affecting your region</CardDescription>
                                            </div>
                                            <Select value={timeframe} onValueChange={setTimeframe}>
                                                <SelectTrigger className="w-[150px]">
                                                    <SelectValue placeholder="Select timeframe" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="2030">By 2030</SelectItem>
                                                    <SelectItem value="2050">By 2050</SelectItem>
                                                    <SelectItem value="2070">By 2070</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Climate Projections</h3>
                                                <div className="h-[250px] rounded-lg bg-muted mb-4">
                                                    {/* This would be a chart in a real implementation */}
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <LineChart className="h-12 w-12 text-muted-foreground/60" />
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    The chart above shows projected changes in temperature and precipitation for your region by{" "}
                                                    {timeframe}. These projections are based on ensemble climate models.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold mb-4">Projected Changes</h3>
                                                <div className="space-y-4">
                                                    <div className="rounded-lg border p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Thermometer className="h-5 w-5 text-red-500" />
                                                            <h4 className="font-medium">Temperature</h4>
                                                        </div>
                                                        <p className="text-sm font-medium mb-1">
                                                            {timeframe === "2030" ? "+0.8°C" : timeframe === "2050" ? "+1.8°C" : "+2.7°C"} compared to
                                                            present
                                                        </p>
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            {climateData.longTerm.temperature.impact}
                                                        </p>
                                                        <Progress
                                                            value={timeframe === "2030" ? 30 : timeframe === "2050" ? 60 : 90}
                                                            className="h-2"
                                                        />
                                                    </div>

                                                    <div className="rounded-lg border p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <CloudRain className="h-5 w-5 text-blue-500" />
                                                            <h4 className="font-medium">Precipitation</h4>
                                                        </div>
                                                        <p className="text-sm font-medium mb-1">
                                                            {timeframe === "2030" ? "-5%" : timeframe === "2050" ? "-15%" : "-25%"} annual rainfall
                                                        </p>
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            {climateData.longTerm.precipitation.impact}
                                                        </p>
                                                        <Progress
                                                            value={timeframe === "2030" ? 25 : timeframe === "2050" ? 55 : 85}
                                                            className="h-2"
                                                        />
                                                    </div>

                                                    <div className="rounded-lg border p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                                            <h4 className="font-medium">Extreme Events</h4>
                                                        </div>
                                                        <p className="text-sm font-medium mb-1">
                                                            {timeframe === "2030" ? "+10%" : timeframe === "2050" ? "+30%" : "+50%"} frequency
                                                        </p>
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            {climateData.longTerm.extremeEvents.impact}
                                                        </p>
                                                        <Progress
                                                            value={timeframe === "2030" ? 35 : timeframe === "2050" ? 65 : 90}
                                                            className="h-2"
                                                        />
                                                    </div>

                                                    <div className="rounded-lg border p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Bug className="h-5 w-5 text-green-500" />
                                                            <h4 className="font-medium">Pest & Disease</h4>
                                                        </div>
                                                        <p className="text-sm font-medium mb-1">
                                                            {timeframe === "2030"
                                                                ? "Minor changes"
                                                                : timeframe === "2050"
                                                                    ? "New species emergence"
                                                                    : "Major shifts in pest dynamics"}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground mb-2">{climateData.longTerm.pests.impact}</p>
                                                        <Progress
                                                            value={timeframe === "2030" ? 20 : timeframe === "2050" ? 50 : 80}
                                                            className="h-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">
                                            <FileText className="mr-2 h-4 w-4" />
                                            Download Climate Projection Report
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="adaptation" className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Adaptation Measures</CardTitle>
                                        <CardDescription>Current and planned climate adaptation strategies</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Adaptation Status</h3>
                                                <div className="h-[250px] rounded-lg bg-muted mb-4">
                                                    {/* This would be a chart in a real implementation */}
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <PieChart className="h-12 w-12 text-muted-foreground/60" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                                        <span>Implemented</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                                                        <span>Planned</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                                        <span>Not Implemented</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold mb-4">Adaptation Measures</h3>
                                                <div className="space-y-4">
                                                    {climateData.adaptationMeasures.map((measure, index) => (
                                                        <div key={index} className="rounded-lg border p-4">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h4 className="font-medium">{measure.name}</h4>
                                                                <Badge className={`${getStatusColor(measure.status)} border-none`}>
                                                                    {measure.status.toUpperCase()}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-sm">Effectiveness:</span>
                                                                <span className="text-sm font-medium">{measure.effectiveness}%</span>
                                                            </div>
                                                            <Progress value={measure.effectiveness} className="h-2" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <Separator className="my-6" />

                                        <div>
                                            <h3 className="text-lg font-semibold mb-4">Adaptation Gap Analysis</h3>
                                            <div className="rounded-lg border p-4">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="font-medium">Overall Adaptation Readiness</h4>
                                                    <Badge
                                                        className={`${climateData.adaptationScore > 75
                                                            ? "bg-green-100 text-green-800"
                                                            : climateData.adaptationScore > 50
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                            } border-none`}
                                                    >
                                                        {climateData.adaptationScore > 75
                                                            ? "GOOD"
                                                            : climateData.adaptationScore > 50
                                                                ? "MODERATE"
                                                                : "POOR"}
                                                    </Badge>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-sm">Drought Resilience</span>
                                                            <span className="text-sm font-medium">75%</span>
                                                        </div>
                                                        <Progress value={75} className="h-2" />
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-sm">Heat Stress Management</span>
                                                            <span className="text-sm font-medium">60%</span>
                                                        </div>
                                                        <Progress value={60} className="h-2" />
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-sm">Flood Protection</span>
                                                            <span className="text-sm font-medium">45%</span>
                                                        </div>
                                                        <Progress value={45} className="h-2" />
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-sm">Financial Resilience</span>
                                                            <span className="text-sm font-medium">30%</span>
                                                        </div>
                                                        <Progress value={30} className="h-2" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add New Adaptation Measure
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="recommendations" className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Climate Adaptation Recommendations</CardTitle>
                                        <CardDescription>AI-powered suggestions to improve climate resilience</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Priority Recommendations</h3>
                                                <div className="space-y-4">
                                                    {climateData.recommendations.map((recommendation, index) => (
                                                        <div key={index} className="flex items-start gap-3 rounded-lg border p-4">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <ShieldIcon className="h-4 w-4 text-green-600" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm">{recommendation}</p>
                                                                <div className="flex items-center gap-2 mt-2">
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {index === 0 || index === 1
                                                                            ? "High Priority"
                                                                            : index === 2 || index === 3
                                                                                ? "Medium Priority"
                                                                                : "Low Priority"}
                                                                    </Badge>
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {index === 0
                                                                            ? "Short-term"
                                                                            : index === 1 || index === 2
                                                                                ? "Medium-term"
                                                                                : "Long-term"}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold mb-4">Implementation Planning</h3>
                                                <div className="rounded-lg border p-4">
                                                    <h4 className="font-medium mb-3">Short-term Actions (0-2 years)</h4>
                                                    <ul className="space-y-2 text-sm">
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Invest in weather insurance to protect against extreme events</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Install shade structures for heat-sensitive crops</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Implement water conservation practices</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="rounded-lg border p-4">
                                                    <h4 className="font-medium mb-3">Medium-term Actions (2-5 years)</h4>
                                                    <ul className="space-y-2 text-sm">
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Implement crop diversification to spread climate risk</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Increase water storage capacity for drought periods</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Adopt conservation agriculture practices</span>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="rounded-lg border p-4">
                                                    <h4 className="font-medium mb-3">Long-term Actions (5+ years)</h4>
                                                    <ul className="space-y-2 text-sm">
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Transition to climate-resilient crop varieties</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Invest in advanced irrigation infrastructure</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                                                                <Check className="h-3 w-3 text-green-600" />
                                                            </div>
                                                            <span>Develop alternative income streams to reduce climate vulnerability</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">
                                            <Smartphone className="mr-2 h-4 w-4" />
                                            Get Personalized Adaptation Plan
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

function Check({ className = "h-4 w-4", ...props }) {
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
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

