import { useState } from "react";
import { Upload, Loader2, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface DetectionResult {
  type: string;
  location: string;
  confidence: number;
  affectedArea: string;
  recommendation: string;
}

export function ImageUploadAnalysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedDetection, setSelectedDetection] = useState<DetectionResult | null>(null);

  // Handle File Selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Upload Image & Analyze
  const handleImageUpload = async () => {
    if (!selectedFile) return alert("Please select an image");

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSelectedDetection(data);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Failed to analyze the image.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Upload New Image for Analysis</h2>
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Pest & Disease Detection</CardTitle>
          <CardDescription>
            Upload an image of your crops for instant AI analysis and detection of pests or diseases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Upload crop image</h3>
              <p className="mb-4 text-sm text-muted-foreground max-w-xs">
                Drag and drop your image here, or click to browse files. Supported formats: JPG, PNG
              </p>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
              <label htmlFor="fileInput">
                <Button>Select Image</Button>
              </label>
              {selectedFile && <p className="text-sm mt-2">{selectedFile.name}</p>}
            </div>

            <Button onClick={handleImageUpload} disabled={!selectedFile || isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Image"
              )}
            </Button>

            {selectedDetection && (
              <Alert>
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle className="text-red-500">Pest Detection Alert</AlertTitle>
                <AlertDescription>
                  <div className="mt-2">
                    <p className="font-medium">
                      {selectedDetection.type} detected in {selectedDetection.location}
                    </p>
                    <p className="text-sm mt-1">
                      Confidence: {selectedDetection.confidence}% | Affected Area: {selectedDetection.affectedArea}
                    </p>
                    <div className="mt-3">
                      <p className="text-sm font-semibold">Recommended Action:</p>
                      <p className="text-sm">{selectedDetection.recommendation}</p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
