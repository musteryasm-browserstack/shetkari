import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
    SidebarProvider,
} from "@/components/ui/sidebar"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="max-h-screen flex w-full">
            <SidebarProvider>
                <AppSidebar />
                <div className="w-full max-h-screen overflow-y-scroll">
                    {children}
                </div>
            </SidebarProvider>
        </div>
    );
}
