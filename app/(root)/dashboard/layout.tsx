import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
    SidebarProvider,
} from "@/components/ui/sidebar"
import { RealtimeDataFetcher } from "@/components/firebase/RealtimeDataFetcher";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-h-screen flex w-full">
            <RealtimeDataFetcher />
            <SidebarProvider>
                <AppSidebar />
                <div className="w-full max-h-screen overflow-y-scroll">
                    {children}
                </div>
            </SidebarProvider>
        </div>
    );
}
