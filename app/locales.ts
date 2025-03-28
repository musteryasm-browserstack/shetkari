// app/locales.ts
export const translations = {
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
      // Add all other text strings here
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
      // Add all other Marathi translations here
    }
  };
  
  export type Language = keyof typeof translations;