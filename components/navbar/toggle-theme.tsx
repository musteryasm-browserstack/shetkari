"use client"

import { useEffect } from "react";
// importing from next
import { useTheme } from "next-themes";

// importing shadcn components
import {
    ToggleGroup,
    ToggleGroupItem
} from "@/components/ui/toggle-group";

// importing icons
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        // Set the default theme to light on initial load
        if (!theme) {
            setTheme("light");
        }
    }, [theme, setTheme]);

    return (
        <ToggleGroup type="single" value={theme}>
            <ToggleGroupItem
                value="dark"
                aria-label="Toggle dark"
                onClick={() => setTheme("dark")}
            >
                <Moon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
                value="light"
                aria-label="Toggle light"
                onClick={() => setTheme("light")}
            >
                <Sun className="h-4 w-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    )
}
