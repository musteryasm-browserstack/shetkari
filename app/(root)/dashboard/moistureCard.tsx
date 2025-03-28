import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Droplet } from "lucide-react";

function SoilMoistureCard() {
  const [moisture, setMoisture] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMoisture() {
      try {
        const response = await fetch("https://shetkari-beige.vercel.app/api/readings/moisture");
        const data = await response.json();
        if (data.status === "success" && data.data.length > 0) {
          const latestReading = data.data[data.data.length - 1];
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
        <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
        <Droplet className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{moisture !== null ? `${moisture}%` : "Loading..."}</div>
        <Progress value={moisture || 0} className="h-2 mt-2" />
        <p className="text-xs text-muted-foreground mt-2">Optimal range: 60-75%</p>
        {timestamp && <p className="text-xs text-gray-500 mt-1">Last updated: {timestamp}</p>}
      </CardContent>
    </Card>
  );
}

export { SoilMoistureCard };
