"use client"

// importing from next
import { useRouter } from "next/navigation";

// importing shadcn components
import { Button } from "@/components/ui/button";

// importing icons
import { ChevronLeft } from "lucide-react";

export function GoBack() {
    const router = useRouter();

    return (
        <>
            <Button
                variant={"ghost"}
                size={"icon"}
                className="cursor-pointer"
                onClick={() => {
                    router.back();
                }}
            >
                <ChevronLeft className="text-destructive" strokeWidth={3} />
            </Button>

        </>
    );
}