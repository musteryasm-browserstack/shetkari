"use client"

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Toggle } from "@/components/ui/toggle";
import {
  AlertTriangle,
  CheckCircle,
  Droplet,
  Leaf,
  MapPin,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { SoilMoistureCard } from "./moistureCard";
import WeatherForecast from "./weather";

// Language translations
const translations = {
  en: {
    dashboardTitle: "Dashboard Overview",
    location: "VidyaVihar, Maharashtra",
    cropHealth: "Crop Health Score",
    pestRisk: "Pest Risk Level",
    projectedYield: "Projected Yield",
    farmPerformance: "Farm Performance",
    weeklyAverage: "Weekly Average",
    current: "Current",
    recentAlerts: "Recent Alerts",
    soilNutrients: "Soil Nutrients",
    upcomingTasks: "Upcoming Tasks",
    viewAll: "View all",
    addTask: "Add task",
    potentialPest: "Potential pest activity detected",
    irrigationComplete: "Irrigation cycle completed",
    soilOptimal: "Soil nutrient levels optimal",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    phLevel: "pH Level",
    irrigationSchedule: "Irrigation Schedule",
    applyFertilizer: "Apply Organic Fertilizer",
    harvestCrops: "Harvest Ready Crops",
    inspectPests: "Inspect for Pests",
    optimalRange: "Optimal",
    monitoring: "Monitoring",
    aboveAverage: "above regional average",
    dailyMonitoring: "Daily monitoring data for the last 7 days",
    notifications: "System notifications and warnings",
    soilAnalysis: "Current soil analysis results",
    scheduledActivities: "Scheduled activities for your farm",
    tomorrow: "Tomorrow",
    in3Days: "In 3 days",
    in7Days: "In 7 days",
    weekly: "Weekly",
    low: "Low",
    threats: "potential threats",
  },
  mr: {
    dashboardTitle: "डॅशबोर्ड विहंगावलोकन",
    location: "विद्याविहार, महाराष्ट्र",
    cropHealth: "पिकाची आरोग्य गुणांक",
    pestRisk: "कीटक धोका स्तर",
    projectedYield: "अंदाजित उत्पादन",
    farmPerformance: "शेताची कामगिरी",
    weeklyAverage: "साप्ताहिक सरासरी",
    current: "सध्याचे",
    recentAlerts: "अलीकडील सूचना",
    soilNutrients: "मातीतील पोषकद्रव्ये",
    upcomingTasks: "आगामी कार्ये",
    viewAll: "सर्व पहा",
    addTask: "कार्य जोडा",
    potentialPest: "संभाव्य कीटक क्रियाकलाप आढळले",
    irrigationComplete: "सिंचन चक्र पूर्ण झाले",
    soilOptimal: "मातीतील पोषकद्रव्ये इष्टतम",
    nitrogen: "नायट्रोजन (N)",
    phosphorus: "फॉस्फरस (P)",
    potassium: "पोटॅशियम (K)",
    phLevel: "pH स्तर",
    irrigationSchedule: "सिंचन वेळापत्रक",
    applyFertilizer: "सेंद्रिय खत लावा",
    harvestCrops: "पिकाची कापणी करा",
    inspectPests: "कीटकांसाठी तपासणी करा",
    optimalRange: "इष्टतम श्रेणी",
    monitoring: "निरीक्षणाखाली",
    aboveAverage: "प्रादेशिक सरासरीपेक्षा जास्त",
    dailyMonitoring: "गेल्या 7 दिवसांची दैनंदिन निरीक्षण डेटा",
    notifications: "प्रणाली सूचना आणि चेतावण्या",
    soilAnalysis: "सध्याचे माती विश्लेषण परिणाम",
    scheduledActivities: "तुमच्या शेतासाठी नियोजित क्रियाकलाप",
    tomorrow: "उद्या",
    in3Days: "3 दिवसांत",
    in7Days: "7 दिवसांत",
    weekly: "साप्ताहिक",
    low: "कमी",
    threats: "संभाव्य धोके",
  },
};

type Language = keyof typeof translations;

export default function Dashboard() {
  const [weatherTab, setWeatherTab] = useState("today");
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex flex-col w-full">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <h1 className="text-xl font-semibold">{t.dashboardTitle}</h1>
          <div className="ml-auto flex items-center gap-2">
            <Toggle
              pressed={language === "mr"}
              onPressedChange={(pressed) => setLanguage(pressed ? "mr" : "en")}
              className="px-2"
              aria-label="Toggle language"
            >
              {language === "en" ? "EN" : "मराठी"}
            </Toggle>
            <div className="flex items-center gap-2 rounded-md bg-accent px-2 py-1 text-sm text-accent-foreground">
              <MapPin className="h-4 w-4" />
              <span>{t.location}</span>
            </div>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.cropHealth}</CardTitle>
                <Leaf className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87/100</div>
                <Progress value={87} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  +4% {language === "en" ? "from last week" : "गेल्या आठवड्यापासून"}
                </p>
              </CardContent>
            </Card>

            <SoilMoistureCard language={language} />
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.pestRisk}</CardTitle>
                <ShieldAlert className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{t.low}</div>
                <Progress value={22} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {language === "en" ? `Monitoring 3 ${t.threats}` : `3 ${t.threats} निरीक्षणाखाली`}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.projectedYield}</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.5 q/ha</div>
                <Progress value={78} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  +8% {t.aboveAverage}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>{t.farmPerformance}</CardTitle>
                <CardDescription>{t.dailyMonitoring}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-lg bg-muted/60 p-6">
                  <div className="flex justify-between pb-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{t.weeklyAverage}</div>
                      <div className="text-2xl font-bold">92.4</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{t.current}</div>
                      <div className="text-2xl font-bold">97.2</div>
                    </div>
                  </div>
                  <div className="h-[220px] flex items-end gap-2">
                    {[45, 60, 82, 68, 79, 87, 96].map((value, i) => (
                      <div key={i} className="relative flex-1 group">
                        <div
                          className="absolute bottom-0 w-full bg-primary/80 group-hover:bg-primary transition-all rounded-t"
                          style={{ height: `${value * 2}px` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2 text-xs text-muted-foreground">
                    <div>{language === "en" ? "Mon" : "सोम"}</div>
                    <div>{language === "en" ? "Tue" : "मंगळ"}</div>
                    <div>{language === "en" ? "Wed" : "बुध"}</div>
                    <div>{language === "en" ? "Thu" : "गुरु"}</div>
                    <div>{language === "en" ? "Fri" : "शुक्र"}</div>
                    <div>{language === "en" ? "Sat" : "शनि"}</div>
                    <div>{language === "en" ? "Sun" : "रवि"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <WeatherForecast language={language} />
          </div>

          <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{t.recentAlerts}</CardTitle>
                <CardDescription>{t.notifications}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-lg border p-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">{t.potentialPest}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "South field, cotton crop - 2 hours ago" : "दक्षिण शेत, कापूस पीक - 2 तासांपूर्वी"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border p-3">
                    <Droplet className="mt-0.5 h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">{t.irrigationComplete}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "North field, wheat crop - 6 hours ago" : "उत्तर शेत, गहू पीक - 6 तासांपूर्वी"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border p-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">{t.soilOptimal}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "All fields - 1 day ago" : "सर्व शेत - 1 दिवसापूर्वी"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/alerts" className="text-sm text-blue-600 hover:underline">
                  {t.viewAll}
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.soilNutrients}</CardTitle>
                <CardDescription>{t.soilAnalysis}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{t.nitrogen}</span>
                      <span className="text-sm">280 kg/ha</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.optimalRange}: 250-300 kg/ha
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{t.phosphorus}</span>
                      <span className="text-sm">45 kg/ha</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.optimalRange}: 40-60 kg/ha
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{t.potassium}</span>
                      <span className="text-sm">190 kg/ha</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.optimalRange}: 180-220 kg/ha
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{t.phLevel}</span>
                      <span className="text-sm">6.8</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.optimalRange}: 6.5-7.0
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.upcomingTasks}</CardTitle>
                <CardDescription>{t.scheduledActivities}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm font-medium">{t.irrigationSchedule}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.tomorrow}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">{t.applyFertilizer}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.in3Days}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium">{t.harvestCrops}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.in7Days}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm font-medium">{t.inspectPests}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.weekly}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href="/tasks" className="text-sm text-blue-600 hover:underline">
                  {t.viewAll}
                </Link>
                <Link href="/new-task" className="text-sm text-blue-600 hover:underline">
                  {t.addTask}
                </Link>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}