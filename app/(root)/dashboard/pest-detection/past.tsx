"use client"

// importing from react
import { useState, useRef } from "react";

// importing from next
import Image from "next/image";

import { Upload, Loader2, AlertTriangle, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertTitle,
  AlertDescription
} from "@/components/ui/alert";

interface DetectionDetail {
  class: string;
  confidence: number;
  points?: JSON[];
}

interface DetectionResult {
  type: string;
  location: string;
  confidence: number;
  affectedArea: string;
  recommendation: string;
  details: {
    pest_detection: DetectionDetail[];
    crop_disease: DetectionDetail[];
  };
}

interface ImageUploadAnalysisProps {
  onAnalysisComplete?: (result: DetectionResult) => void;
}

export function ImageUploadAnalysis({ onAnalysisComplete }: ImageUploadAnalysisProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedDetection, setSelectedDetection] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSelectedDetection(null);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, WEBP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size too large (max 5MB)');
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadstart = () => {
        setPreviewUrl(null);
      };
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewUrl(e.target.result as string);
        }
      };
      reader.onerror = () => {
        setError('Failed to load image preview');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/analyse-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.type || !result.confidence) {
        throw new Error('Invalid API response format');
      }

      // Format the result for display
      const formattedResult: DetectionResult = {
        type: result.type || "Unknown Detection",
        location: result.location || "Multiple areas",
        confidence: result.confidence || 0,
        affectedArea: result.affectedArea || "Unknown",
        recommendation: result.recommendation || "Please consult an agricultural expert",
        details: {
          pest_detection: result.details?.pest_detection || [],
          crop_disease: result.details?.crop_disease || []
        }
      };

      setSelectedDetection(formattedResult);
      if (onAnalysisComplete) {
        onAnalysisComplete(formattedResult);
      }
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError(err instanceof Error ? err.message : 'Failed to analyze the image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedDetection(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const event = {
        target: {
          files: [file]
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(event);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Pest & Disease Detection</CardTitle>
          <CardDescription>
            Upload an image of your crops for instant AI analysis and detection of pests or diseases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* File Upload Area */}
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => !previewUrl && fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <div className="relative group">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="max-h-64 rounded-md object-contain"
                    onError={() => setError('Failed to load image preview')}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Upload crop image</h3>
                  <p className="mb-4 text-sm text-muted-foreground max-w-xs">
                    Drag and drop your image here, or click to browse files. Supported formats: JPG, PNG (max 5MB)
                  </p>
                </>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
                disabled={isAnalyzing}
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <Button variant={previewUrl ? "outline" : "default"} disabled={isAnalyzing} onClick={(e) => e.stopPropagation()}>
                  {previewUrl ? "Change Image" : "Select Image"}
                </Button>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Analyze Button */}
            {selectedFile && (
              <Button
                onClick={handleImageUpload}
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            )}

            {/* Results Display */}
            {selectedDetection && (
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle className="text-red-500">Detection Alert</AlertTitle>
                  <AlertDescription>
                    <div className="mt-2">
                      <p className="font-medium">
                        {selectedDetection.type} detected in {selectedDetection.location}
                      </p>
                      <p className="text-sm mt-1">
                        Confidence: {Math.round(selectedDetection.confidence * 100)}% |
                        Affected Area: {selectedDetection.affectedArea}
                      </p>
                      <div className="mt-3">
                        <p className="text-sm font-semibold">Recommended Action:</p>
                        <p className="text-sm">{selectedDetection.recommendation}</p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>

                {/* Detailed Results */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                    <CardDescription>
                      Breakdown of detected pests and diseases
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Pest Detections</h3>
                      {selectedDetection.details.pest_detection.length > 0 ? (
                        <div className="space-y-3">
                          {selectedDetection.details.pest_detection.map((pest, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                              <span className="font-medium">{pest.class}</span>
                              <span className="text-sm">
                                Confidence: {Math.round(pest.confidence * 100)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No pests detected with significant confidence
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Disease Detections</h3>
                      {selectedDetection.details.crop_disease.length > 0 ? (
                        <div className="space-y-3">
                          {selectedDetection.details.crop_disease.map((disease, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                              <span className="font-medium">{disease.class}</span>
                              <span className="text-sm">
                                Confidence: {Math.round(disease.confidence * 100)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No diseases detected with significant confidence
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}