"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Clock, Droplet, Loader2, Clipboard } from "lucide-react";

interface ManualPumpControlProps {
  aiRecommendation: string;
  onStartIrrigation: (speed: number) => void;
  isIrrigating: boolean;
}

export function ManualPumpControl({
  aiRecommendation,
  onStartIrrigation,
  isIrrigating,
}: ManualPumpControlProps) {
  const [waterSpeed, setWaterSpeed] = useState(5); // Default to speed 5

  return (
    <div className="space-y-6">
      {/* AI Recommendation Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">AI Recommendation</h3>
        <div className="flex gap-3 p-4 rounded-lg bg-muted">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p>{aiRecommendation}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Generated 30 minutes ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Control Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Manual Control</h3>
        <div className="space-y-4">
          {/* Water Speed Control */}
          <div className="space-y-3">
            <Label>Water Speed: {waterSpeed}</Label>
            <Slider
              value={[waterSpeed]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setWaterSpeed(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => onStartIrrigation(waterSpeed)}
              disabled={isIrrigating}
            >
              {isIrrigating ? (
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
  );
}
