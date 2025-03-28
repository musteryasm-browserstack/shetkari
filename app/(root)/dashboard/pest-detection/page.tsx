"use client"

import Image from "next/image";
import { useState } from "react"
import {
    AlertTriangle,
    Bug,
    Clock,
    MapPin,
    ShieldAlert,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import PestEducationSection from "./education"
import { ImageUploadAnalysis } from "./past"

// Sample data for pest detections
const pestDetections = [
    {
        id: 1,
        threatLevel: "high",
        type: "Aphids",
        location: "North Field - Wheat",
        detectedOn: "Today, 10:23 AM",
        affectedArea: "~0.8 hectares",
        confidence: 94,
        imageUrl: "/placeholder.svg?height=100&width=150",
        recommendation: "Apply neem oil spray. Monitor daily.",
    },
    {
        id: 2,
        threatLevel: "medium",
        type: "Powdery Mildew",
        location: "East Field - Soybeans",
        detectedOn: "Yesterday, 4:12 PM",
        affectedArea: "~0.3 hectares",
        confidence: 87,
        imageUrl: "/placeholder.svg?height=100&width=150",
        recommendation: "Increase airflow. Apply fungicide if spreads.",
    },
    {
        id: 3,
        threatLevel: "low",
        type: "Corn Earworm",
        location: "South Field - Maize",
        detectedOn: "2 days ago",
        affectedArea: "Isolated plants",
        confidence: 78,
        imageUrl: "/placeholder.svg?height=100&width=150",
        recommendation: "Monitor. No immediate action required.",
    },
]

// Sample data for pest alerts by region
const regionalAlerts = [
    { region: "Nagpur District", threatLevel: "medium", pests: ["Fall Armyworm", "Whiteflies"] },
    { region: "Amravati", threatLevel: "high", pests: ["Bollworms", "Thrips"] },
    { region: "Yavatmal", threatLevel: "low", pests: ["Aphids"] },
    { region: "Wardha", threatLevel: "medium", pests: ["Grasshoppers", "Leafhoppers"] },
]

export default function PestDetection() {
    const [activeTab, setActiveTab] = useState("current")
    const [selectedDetection, setSelectedDetection] = useState<(typeof pestDetections)[number] | null>(null)
    // const [ setIsAnalyzing] = useState(false)

    // const handleImageUpload = () => {
    //     setIsAnalyzing(true)
    //     // Simulate analysis time
    //     setTimeout(() => {
    //         setIsAnalyzing(false)
    //         // Simulate a new detection
    //         setSelectedDetection(pestDetections[0])
    //     }, 3000)
    // }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Main Content */}
            <div className="flex flex-col w-full">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-4 lg:px-6">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="min-h-4 min-w-4" />
                        <h1 className="text-xl font-semibold">AI Pest & Disease Detection</h1>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    <div className="flex flex-col gap-6">
                        {/* Main section with tabs */}
                        <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                                <TabsList>
                                    <TabsTrigger value="upload">Upload Image</TabsTrigger>
                                    <TabsTrigger value="current">Current Detections</TabsTrigger>

                                    <TabsTrigger value="regional">Regional Alerts</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="upload" className="space-y-4">
                                <ImageUploadAnalysis
                                    handleImageUpload={function (): void {
                                        throw new Error("Function not implemented.")
                                    }} isAnalyzing={false}
                                />
                            </TabsContent>

                            <TabsContent value="current" className="space-y-4">
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-2xl font-bold">Current Pest & Disease Detections</h2>
                                    <div className="grid gap-6">
                                        {pestDetections.map((detection) => (
                                            <Card key={detection.id} className="overflow-hidden">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="w-full md:w-[150px] h-[100px] bg-muted">
                                                        <Image
                                                            src={detection.imageUrl || "/placeholder.svg"}
                                                            alt={detection.type}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 p-6">
                                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <Badge
                                                                        variant={
                                                                            detection.threatLevel === "high"
                                                                                ? "destructive"
                                                                                : detection.threatLevel === "medium"
                                                                                    ? "secondary"
                                                                                    : "outline"
                                                                        }
                                                                    >
                                                                        {detection.threatLevel.toUpperCase()} THREAT
                                                                    </Badge>
                                                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                                        <Clock className="h-3 w-3" />
                                                                        {detection.detectedOn}
                                                                    </div>
                                                                </div>
                                                                <h3 className="text-xl font-bold mb-1">{detection.type}</h3>
                                                                <p className="text-muted-foreground mb-2">{detection.location}</p>
                                                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                                                    <div className="flex items-center gap-2">
                                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                                        <span>Affected: {detection.affectedArea}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                                                                        <span>Confidence: {detection.confidence}%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-2 min-w-[120px]">
                                                                <Button className="w-full" onClick={() => setSelectedDetection(detection)}>
                                                                    View Details
                                                                </Button>
                                                                <Button variant="outline" className="w-full">
                                                                    Mark Resolved
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="regional" className="space-y-4">
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-2xl font-bold">Regional Pest & Disease Alerts</h2>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Pest Activity in Nearby Regions</CardTitle>
                                            <CardDescription>
                                                AI-powered alerts based on regional pest activity and environmental conditions
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-4">
                                                {regionalAlerts.map((alert, index) => (
                                                    <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                                                        <div
                                                            className={`rounded-full p-2 ${alert.threatLevel === "high"
                                                                ? "bg-red-100"
                                                                : alert.threatLevel === "medium"
                                                                    ? "bg-yellow-100"
                                                                    : "bg-green-100"
                                                                }`}
                                                        >
                                                            <Bug
                                                                className={`h-5 w-5 ${alert.threatLevel === "high"
                                                                    ? "text-red-500"
                                                                    : alert.threatLevel === "medium"
                                                                        ? "text-yellow-500"
                                                                        : "text-green-500"
                                                                    }`}
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-medium">{alert.region}</h3>
                                                                <Badge
                                                                    variant={
                                                                        alert.threatLevel === "high"
                                                                            ? "destructive"
                                                                            : alert.threatLevel === "medium"
                                                                                ? "secondary" // ✅ Changed from "warning" to "secondary"
                                                                                : "outline"
                                                                    }
                                                                >
                                                                    {alert.threatLevel.toUpperCase()}
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">Active pests: {alert.pests.join(", ")}</p>
                                                        </div>
                                                        <Button variant="outline" size="sm">
                                                            Details
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Detection Details Modal */}
                        {selectedDetection && (
                            <Card
                                className="border-l-4"
                                style={{
                                    borderLeftColor:
                                        selectedDetection.threatLevel === "high"
                                            ? "rgb(239, 68, 68)"
                                            : selectedDetection.threatLevel === "medium"
                                                ? "rgb(234, 179, 8)"
                                                : "rgb(34, 197, 94)",
                                }}
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Detection Details</CardTitle>
                                        <Button variant="ghost" size="icon" onClick={() => setSelectedDetection(null)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <Image
                                                src={selectedDetection.imageUrl || "/placeholder.svg"}
                                                alt={selectedDetection.type}
                                                className="w-full h-[200px] object-cover rounded-lg"
                                            />
                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Detected On</p>
                                                    <p className="font-medium">{selectedDetection.detectedOn}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Location</p>
                                                    <p className="font-medium">{selectedDetection.location}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Affected Area</p>
                                                    <p className="font-medium">{selectedDetection.affectedArea}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">AI Confidence</p>
                                                    <p className="font-medium">{selectedDetection.confidence}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-lg font-bold mb-2">{selectedDetection.type}</h3>
                                                <Badge
                                                    variant={
                                                        selectedDetection.threatLevel === "high"
                                                            ? "destructive"
                                                            : selectedDetection.threatLevel === "medium"
                                                                ? "secondary"
                                                                : "outline"
                                                    }
                                                >
                                                    {selectedDetection.threatLevel.toUpperCase()} THREAT LEVEL
                                                </Badge>
                                            </div>
                                            <Separator />
                                            <div>
                                                <h4 className="font-medium mb-2">Description</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {selectedDetection.type} are common agricultural pests that can damage crops by feeding on
                                                    plant sap and transmitting plant viruses.
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">AI Recommendation</h4>
                                                <p className="text-sm font-medium">{selectedDetection.recommendation}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">Treatment Options</h4>
                                                <ul className="text-sm space-y-1 list-disc pl-4">
                                                    <li>Biological control with predatory insects</li>
                                                    <li>Neem oil or insecticidal soap application</li>
                                                    <li>Maintain beneficial insect habitats</li>
                                                    <li>Optimize plant spacing for airflow</li>
                                                </ul>
                                            </div>
                                            <div className="flex gap-2 pt-4">
                                                <Button className="flex-1">Apply Treatment</Button>
                                                <Button variant="outline" className="flex-1">
                                                    Mark Resolved
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Education Section */}
                        <PestEducationSection></PestEducationSection>
                    </div>
                </main>
            </div>
        </div>
    )
}

