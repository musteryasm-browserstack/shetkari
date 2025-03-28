"use client"

import Image from "next/image";
import { useState } from "react"
import {
    Bug,
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



// Sample data for pest alerts by region
const regionalAlerts = [
    { region: "Nagpur District", threatLevel: "medium", pests: ["Fall Armyworm", "Whiteflies"] },
    { region: "Amravati", threatLevel: "high", pests: ["Bollworms", "Thrips"] },
    { region: "Yavatmal", threatLevel: "low", pests: ["Aphids"] },
    { region: "Wardha", threatLevel: "medium", pests: ["Grasshoppers", "Leafhoppers"] },
]

export default function PestDetection() {
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
    ];
    console.log(pestDetections);

    type pestDetectionType = {
        id: number;
        threatLevel: string;
        type: string;
        location: string;
        detectedOn: string;
        affectedArea: string;
        confidence: number;
        imageUrl: string;
        recommendation: string;
    };
    const [activeTab, setActiveTab] = useState("upload")
    const [selectedDetection, setSelectedDetection] = useState<pestDetectionType | null>(null);
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
                                    <TabsTrigger value="regional">Regional Alerts</TabsTrigger>
                                </TabsList>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Embedded UI</CardTitle>
                                    <CardDescription>Interacting with the local application</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                                        <iframe
                                            src="https://dc08-152-52-34-131.ngrok-free.app"
                                            className="w-full h-full"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

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
                                        selectedDetection?.threatLevel === "high"
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

