import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
    SidebarProvider,
} from "@/components/ui/sidebar"
import { RealtimeDataFetcher } from "@/components/firebase/RealtimeDataFetcher";
import { Footer } from "@/components/footer/footer";

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
                <div className="w-full max-h-screen overflow-y-scroll pb-10 sm:pb-0">
                    {children}
                </div>
                <Footer />
            </SidebarProvider>
        </div>
    );
}
