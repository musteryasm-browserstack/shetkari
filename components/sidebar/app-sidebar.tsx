"use client"

import * as React from "react"

import Link from "next/link";
import {
    Leaf,
    Layers,
    ShieldAlert,
    FileStack,
    Droplet,
    CloudRain,
    TrendingUp,
    Cloud,
    Activity,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { ModeToggle } from "../navbar/toggle-theme";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
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
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="overflow-hidden">
                <div className="flex h-12 items-center border-b px-2">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Leaf className="h-6 w-6 text-primary" />
                        <span className="text-lg font-bold text-primary">SHETKARI</span>
                    </Link>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="space-y-2 overflow-hidden">
                <div className="flex justify-between items-center px-2 pl-4">
                    <div>Mode Toggle:</div>
                    <ModeToggle />
                </div>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
