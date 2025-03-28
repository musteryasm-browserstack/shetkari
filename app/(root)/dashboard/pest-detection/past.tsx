import { Upload, Loader2, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ImageUploadAnalysisProps {
  handleImageUpload: () => void;
  isAnalyzing: boolean;
  selectedDetection?: {
    type: string;
    location: string;
    confidence: number;
    affectedArea: string;
    recommendation: string;
  };
}

export function ImageUploadAnalysis({ handleImageUpload, isAnalyzing, selectedDetection }: ImageUploadAnalysisProps) {
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
              <Button onClick={handleImageUpload}>Select Image</Button>
            </div>

            {isAnalyzing && (
              <div className="flex items-center justify-center gap-2 p-4 text-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p>Analyzing image with AI... This will take a few seconds.</p>
              </div>
            )}

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