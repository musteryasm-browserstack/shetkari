"use client";

// importing from react
import { useState } from "react";
import Cookies from "js-cookie";

// importing from next
// import Link from "next/link";

// importing shadcn components
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    // DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// importing components
import { ModeToggle } from "./toggle-theme";

// importing icons
import { LogOut } from "lucide-react";

// importing constants
// import { LINKS } from "@/lib/constants";

// importing utilities
import { fallback } from "@/lib/utils";

export function SignOut() {
    return (
        <Button
            onClick={() => { Cookies.remove("session"); window.location.reload() }}
            variant={"ghost"}
            size={"sm"}
            className="font-normal"
        >
            <LogOut />
            <span>Log Out</span>
        </Button>
    );
}

export function AvatarDropdown({ avatarName, avatarImage, avatarEmail }: { avatarName: string, avatarImage?: string, avatarEmail: string }) {
    const fallbackName = fallback(avatarName);
    const [open, setOpen] = useState(false);

    function setOpenChange() {
        setOpen(!open);
    }

    return (
        <>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Avatar className="font-medium w-8 h-8 cursor-pointer">
                        <AvatarImage
                            src={avatarImage}
                            alt={avatarName}
                        />
                        <AvatarFallback className="border border-destructive bg-background text-destructive">
                            {fallbackName}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 my-2" align="end" onClick={setOpenChange}>
                    <DropdownMenuLabel>
                        <div className="flex gap-2">
                            <Avatar className="font-medium w-10 h-10 cursor-pointer">
                                <AvatarImage
                                    src={avatarImage}
                                    alt={avatarName}
                                />
                                <AvatarFallback className="border border-destructive bg-background text-destructive">
                                    {fallbackName}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col justify-between">
                                <h1>
                                    {avatarName}
                                </h1>
                                <p className="text-muted-foreground text-xs">
                                    {avatarEmail}
                                </p>
                            </div>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {/* <DropdownMenuGroup>
                        {LINKS.map((link, index) => (
                            <DropdownMenuItem key={index} asChild>
                                <Link href={link.href}>
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup> */}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="py-0 flex justify-between text-foreground">
                        <span>Toggle Theme: </span>
                        <ModeToggle />
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="py-0 text-foreground">
                        <SignOut />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}