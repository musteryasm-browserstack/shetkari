"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const pestEducationData = [
    {
        title: "Common Pests Library",
        description: "Identification guide for 50+ common agricultural pests",
        image: "/placeholder.svg?height=120&width=250",
        alt: "Pest Library",
        content: "Visual guide with detailed information on life cycles, damage patterns, and treatment options.",
        buttonText: "View Library",
    },
    {
        title: "Prevention Strategies",
        description: "Proactive measures to minimize pest risks",
        image: "/placeholder.svg?height=120&width=250",
        alt: "Prevention Strategies",
        content: "Learn how crop rotation, companion planting, and other techniques can reduce pest problems.",
        buttonText: "Learn More",
    },
    {
        title: "AI Training",
        description: "Help improve our pest detection AI",
        image: "/placeholder.svg?height=120&width=250",
        alt: "AI Training",
        content: "Submit labeled images to enhance our AI's accuracy in detecting pests and diseases.",
        buttonText: "Contribute",
    },
];

export default function PestEducationSection() {
    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Pest & Disease Education</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pestEducationData.map((item, index) => (
                    <Card key={index}>
                        <CardHeader className="pb-2">
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Image
                                src={item.image}
                                alt={item.alt}
                                width={500}  // Set a width (or use layout="fill" for responsive images)
                                height={120} // Set a height (optional)
                                className="w-full h-[120px] object-cover rounded-md mb-4"
                                priority // Optional: Improves loading speed for above-the-fold images
                            />
                            <p className="text-sm text-muted-foreground">{item.content}</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                {item.buttonText}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
