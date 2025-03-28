"use client";

// importing from react
import { useState } from "react";

// importing from next
import Link from "next/link";

// importing shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// importing components
import { FormMessage } from "@/components/forms/message/form-message";

import { cn } from "@/lib/utils";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [message, setMessage] = useState<{
        type: string;
        message: string;
    }>({
        type: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "9321012106",
        password: "hardik@1234"
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setMessage({
            type: "success",
            message: "Login Successful"
        });
        window.location.href = "/dashboard";
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your user name below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2 h-fit">
                    <FormMessage message={message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">User Id</Label>
                    <Input
                        id="userid"
                        type="text"
                        placeholder="Enter your User Id"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>

                <Button type="submit" className="w-full font-bold">
                    <Link href={"/dashboard"}>
                        {loading ? "Loading..." : "Log In"}
                    </Link>
                </Button>
            </div>
        </form>
    )
}
