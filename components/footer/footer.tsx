import Link from "next/link";
import { SIDEBAR_LINKS } from "@/lib/constants";

export function Footer() {
    return (
        <>
            <footer className="flex flex-row gap-2 items-center justify-evenly fixed bottom-0 bg-muted rounded-2xl p-2 z-50 sm:hidden w-screen py-4">
                {SIDEBAR_LINKS.map((link, index) => (
                    <Link href={link.url} key={index} className="p-2 rounded-xl bg-primary/20">
                        <link.icon className="w-4 h-4" />
                    </Link>
                ))}
            </footer>
        </>
    );
}