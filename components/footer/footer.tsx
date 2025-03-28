import { SIDEBAR_LINKS } from "@/lib/constants";

export function Footer() {
    return (
        <>
            <footer className="flex flex-row gap-2 items-center justify-evenly fixed bottom-0 bg-muted rounded-2xl p-2 z-50 sm:hidden">
                {SIDEBAR_LINKS.map((link, index) => (
                    // index <= 6 && 
                    <div key={index}>
                        <link.icon className="w-4 h-4" />
                        {/* <span className="text-xs">{link.title}</span> */}
                    </div>
                ))}
            </footer>
        </>
    );
}