"use client";

// importing from react
import { useState } from "react";

// importing shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// importing components
import { FormMessage } from "@/components/forms/message/form-message";

import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

// importing server actions
import login from "@/app/actions/user";

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
        username: "",
        password: ""
    });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            setLoading(true);

            const response = await login(formData)

            if (response.type == "success") {
                setMessage({
                    type: "success",
                    message: "Login Successful"
                });
                Cookies.set("session", response.sessionDetails?.token as string); // Expires in 1 day
                const repairs = Cookies.get("repairs");
                if (repairs) {
                    window.location.href = "/home";
                }
                window.location.href = "/home";
            }
            else {
                setMessage({
                    type: "error",
                    message: "Some unexpected error occured"
                });
            }
            setLoading(false);

        } catch (error) {
            setLoading(false)
            setMessage({
                type: "error",
                message: "Some unexpected error occured: " + error
            });
        }
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
                    {loading ? "Loading..." : "Log In"}
                </Button>
            </div>
        </form>
    )
}
