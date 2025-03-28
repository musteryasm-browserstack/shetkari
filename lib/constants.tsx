// import logo from "@/assets/logo.png";
import placeholder from "@/assets/placeholder.png";
// import { Home, ListCheck, User } from "lucide-react";

// export const BACKEND_URL = "http://localhost:3000"
export const BACKEND_URL = "https://shetkari-beige.vercel.app"

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

// export const LINKS = [
//     {
//         name: "Home",
//         href: "/home",
//         icon: <Home />,
//     },
//     {
//         name: "Tasks",
//         href: "/tasks",
//         icon: <ListCheck />,
//     },
//     {
//         name: "Profile",
//         href: "/profile",
//         icon: <User />,
//     }
// ];