"use client"

import { useEffect, useState } from "react";
import { SunMedium, CloudRain, BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BACKEND_URL } from "@/lib/constants";
import axios from "axios";

interface WeatherForecastProps {
  language: 'en' | 'mr';
}

interface HourlyWeather {
  time: string;
  temperature: number;
  humidity: number;
  windspeed: number;
  rain: number;
}

interface WeeklyWeather {
  date: string;
  temperatureMax: number;
  weatherCondition: string;
}

const weatherTranslations = {
  en: {
    title: "Weather Forecast",
    description: "Localized predictions for your farm",
    tabs: {
      today: "Today",
      week: "This Week",
      month: "Monthly"
    },
    weatherConditions: {
      sunny: "Sunny",
      rainy: "Rainy",
      cloudy: "Cloudy"
    },
    labels: {
      humidity: "Humidity",
      wind: "Wind",
      rain: "Rain",
      hourlyForecast: "Hourly Forecast",
      monthlyForecast: "Monthly precipitation forecast",
      expected: "expected this month"
    },
    loading: "Loading weather data...",
    error: "Error loading weather data"
  },
  mr: {
    title: "हवामान अंदाज",
    description: "तुमच्या शेतासाठी स्थानिक अंदाज",
    tabs: {
      today: "आज",
      week: "ह्या आठवड्यात",
      month: "मासिक"
    },
    weatherConditions: {
      sunny: "सूर्यप्रकाशयुक्त",
      rainy: "पावसाळी",
      cloudy: "ढगाळ"
    },
    labels: {
      humidity: "आर्द्रता",
      wind: "वारा",
      rain: "पाऊस",
      hourlyForecast: "तासाभराचा अंदाज",
      monthlyForecast: "मासिक पर्जन्यमान अंदाज",
      expected: "या महिन्यात अपेक्षित"
    },
    loading: "हवामान डेटा लोड होत आहे...",
    error: "हवामान डेटा लोड करताना त्रुटी"
  }
};

export default function WeatherForecast({ language }: WeatherForecastProps) {
  const [weatherTab, setWeatherTab] = useState("today");
  const [hourlyData, setHourlyData] = useState<HourlyWeather[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = weatherTranslations[language];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [hourlyRes, weeklyRes] = await Promise.all([
          axios.post(`${BACKEND_URL}/api/weather/hourly`, {
            lat: "19.17548322423318", 
            lon: "72.95186986886482"
          }),
          axios.post(`${BACKEND_URL}/api/weather/7days`, {
            lat: "19.17548322423318", 
            lon: "72.95186986886482"
          })
        ]);

        if (hourlyRes.data.status === "success") {
          setHourlyData(hourlyRes.data.data);
        }
        if (weeklyRes.data.status === "success") {
          setWeeklyData(weeklyRes.data.data.map((day: any) => ({
            ...day,
            weatherCondition: day.temperatureMax > 35 ? "sunny" : "rainy"
          })));
        }
      } catch (err) {
        setError(t.error);
        console.error("Weather data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [language]);

  const getWeatherIcon = (condition: string) => {
    switch(condition) {
      case "sunny":
        return <SunMedium className="h-5 w-5 text-yellow-500" />;
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      default:
        return <SunMedium className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getWeatherLabel = (condition: string) => {
    switch(condition) {
      case "sunny":
        return t.weatherConditions.sunny;
      case "rainy":
        return t.weatherConditions.rainy;
      default:
        return t.weatherConditions.sunny;
    }
  };

  if (loading) {
    return (
      <Card className="lg:col-span-3 w-full">
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          {t.loading}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="lg:col-span-3 w-full">
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-red-500">
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-3 w-full">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today" value={weatherTab} onValueChange={setWeatherTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">{t.tabs.today}</TabsTrigger>
            <TabsTrigger value="week">{t.tabs.week}</TabsTrigger>
            <TabsTrigger value="month">{t.tabs.month}</TabsTrigger>
          </TabsList>

          {/* Today's Weather */}
          <TabsContent value="today" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-4xl font-bold">{hourlyData[0]?.temperature}°C</span>
                <span className="text-muted-foreground">
                  {t.labels.humidity}: {hourlyData[0]?.humidity}%
                </span>
              </div>
              <div className="text-right">
                <SunMedium className="h-10 w-10 text-yellow-500 inline-block" />
                <div className="text-muted-foreground">{t.weatherConditions.sunny}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t">
              <div className="text-center">
                <div className="text-sm font-medium">{t.labels.wind}</div>
                <div className="text-2xl font-semibold">{hourlyData[0]?.windspeed} km/h</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">{t.labels.rain}</div>
                <div className="text-2xl font-semibold">{hourlyData[0]?.rain}%</div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="text-sm font-medium mb-2">{t.labels.hourlyForecast}</div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {hourlyData.map((hour, i) => (
                  <div key={i} className="flex flex-col items-center p-2 min-w-[70px] rounded-md border">
                    <span className="text-sm">
                      {new Date(hour.time).toLocaleTimeString(language === 'en' ? 'en-US' : 'mr-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: language === 'en'
                      })}
                    </span>
                    <SunMedium className="h-5 w-5 my-1 text-yellow-500" />
                    <span className="text-sm font-semibold">{hour.temperature}°C</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Weekly Forecast */}
          <TabsContent value="week" className="mt-4">
            <div className="space-y-4">
              {weeklyData.map((day, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <span className="font-medium">
                    {new Date(day.date).toLocaleDateString(
                      language === 'en' ? 'en-US' : 'mr-IN', 
                      { weekday: "short" }
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(day.weatherCondition)}
                    <span>{getWeatherLabel(day.weatherCondition)}</span>
                  </div>
                  <span className="font-semibold">{day.temperatureMax}°C</span>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Monthly Forecast Placeholder */}
          <TabsContent value="month" className="mt-4">
            <div className="h-[220px] flex items-center justify-center border rounded-md">
              <BarChart3 className="h-16 w-16 text-muted-foreground/60" />
              <div className="ml-4 text-center">
                <p className="text-muted-foreground">{t.labels.monthlyForecast}</p>
                <p className="text-sm text-muted-foreground">85mm {t.labels.expected}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}