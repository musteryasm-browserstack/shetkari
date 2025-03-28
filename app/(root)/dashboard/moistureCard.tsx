import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplet } from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";

function SoilMoistureCard({ language }: { language: "en" | "mr" }) {
  const [moisture, setMoisture] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);

  // Define translations within the component
  const translations = {
    en: {
      soilMoisture: "Soil Moisture",
      loading: "Loading...",
      optimalRange: "Optimal range: 60-75%",
      lastUpdated: "Last updated:",
      toggleButton: "मराठी"
    },
    mr: {
      soilMoisture: "मातीतील आर्द्रता",
      loading: "लोड होत आहे...",
      optimalRange: "सर्वोत्तम श्रेणी: ६०-७५%",
      lastUpdated: "शेवटचे अद्यतन:",
      toggleButton: "English"
    }
  };

  useEffect(() => {
    async function fetchMoisture() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/readings/moisture`);
        const data = await response.json();
        if (data.status === "success" && data.data.length > 0) {
          const latestReading = data.data[0];
          setMoisture(parseFloat(latestReading.moisture));
          setTimestamp(new Date(latestReading.reading_time).toLocaleString());
        }
      } catch (error) {
        console.error("Error fetching moisture data:", error);
      }
    }
    fetchMoisture();
    const interval = setInterval(fetchMoisture, 10000); // Auto-refresh every 10 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{translations[language].soilMoisture}</CardTitle>
        <Droplet className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{moisture !== null ? `${moisture}%` : translations[language].loading}</div>
        <Progress value={moisture || 0} className="h-2 mt-2" />
        <p className="text-xs text-muted-foreground mt-2">{translations[language].optimalRange}</p>
        {timestamp && <p className="text-xs text-gray-500 mt-1">{translations[language].lastUpdated} {timestamp}</p>}

        {/* Language Toggle Button */}
        {/* <button 
          className="mt-3 px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md"
          onClick={() => setLanguage(language === "en" ? "mr" : "en")}
        >
          {translations[language].toggleButton}
        </button> */}
      </CardContent>
    </Card>
  );
}

export { SoilMoistureCard };