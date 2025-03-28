// import logo from "@/assets/logo.png";
import placeholder from "@/assets/placeholder.png";
// import { Home, ListCheck, User } from "lucide-react";

// export const BACKEND_URL = "http://localhost:3000"
export const BACKEND_URL = "https://shetkari-phi.vercel.app"

export const PG_DUMP_URL = "http://localhost:3000/api/pg-dump";
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Shetkari";
export const APP_DESCRIPTION = "Shetkari";
export const APP_DEFAULT_TITLE = "Shetkari";
export const APP_TITLE_TEMPLATE = "%s - Shetkari";

export const APP_LOGO = "logo";
export const PLACEHOLDER = placeholder;

export const REDIRECT_WHEN_JWT_EXPIRED = "/";
export const REDIRECT_WHEN_JWT_EXISTS = "/tasks";
export const APP_SIDEBAR_PARENT_LINK = "/";

import {
    Layers,
    ShieldAlert,
    FileStack,
    Droplet,
    CloudRain,
    TrendingUp,
    Cloud,
    Activity,
} from "lucide-react";

export const SIDEBAR_LINKS = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Activity,
    },
    {
        title: "Farm Overview",
        url: "/dashboard/farm-overview",
        icon: Layers,
    },
    {
        title: "Pest & Disease",
        url: "/dashboard/pest-detection",
        icon: ShieldAlert,
    },
    {
        title: "Soil Monitoring",
        url: "/dashboard/soil-monitoring",
        icon: FileStack,
    },
    {
        title: "Smart Irrigation",
        url: "/dashboard/irrigation",
        icon: Droplet,
    },
    {
        title: "Weather Advisory",
        url: "/dashboard/weather",
        icon: CloudRain,
    },
    {
        title: "Yield Prediction",
        url: "/dashboard/yield-prediction",
        icon: TrendingUp,
    },
    {
        title: "Climate Risk",
        url: "/dashboard/climate-risk",
        icon: Cloud,
    },
];