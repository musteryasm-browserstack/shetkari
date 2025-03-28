"use client";

// importing from react
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// importing shadcn components
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// importing icons
import {
    CircleCheckBig,
    Loader,
    TriangleAlert,
    UserCheck
} from "lucide-react";

// importing server actions
import { getOTP, resetPassword } from "@/app/actions/reset-password";

export default function ResetPasswordForm({ em_id }: { em_id: number }) {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<{ otp: string; password: string }>();

    const [message, setMessage] = useState({ type: "", message: "" });
    const [OTP, setOTP] = useState("");
    const [countdown, setCountDown] = useState(0);
    const [countLoading, setCountLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cnfpass, setCnfPass] = useState("");
    const [cnfPassError, setCnfPassError] = useState("");
    const [password, setPassword] = useState("");

    // Password validation states
    const [passwordChecks, setPasswordChecks] = useState({
        hasUppercase: false,
        hasLowercase: false,
        hasMinLength: false,
        hasSpecialChar: false,
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setValue("password", text);
        setPasswordChecks({
            hasUppercase: /[A-Z]/.test(text),
            hasLowercase: /[a-z]/.test(text),
            hasMinLength: text.length >= 8,
            hasSpecialChar: /[^a-zA-Z0-9]/.test(text),
        });

        setPassword(text)
        setCnfPassError("");
    };

    const generateOTP = async () => {
        try {
            setCountLoading(true);
            const response = await getOTP(em_id);
            if (response.type === "success") {
                setOTP(String(response.value));
                setCountDown(60);
            } else {
                setOTP("");
                setCountDown(0);
            }
            setMessage({ type: response.type, message: response.message });
        } catch {
            setMessage({ type: "error", message: "Please try again later" });
        } finally {
            setCountLoading(false);
        }
    };

    const onSubmit = async (data: { otp: string; password: string }) => {
        if (!cnfpass) {
            setCnfPassError("Confirm password is required");
            return;
        }
        if (cnfpass !== password) {
            setCnfPassError("Passwords do not match");
            return;
        }
        if (OTP != data.otp) {
            setMessage({
                type: "error",
                message: "Invalid OTP"
            })
        }

        setLoading(true)
        try {
            const response = await resetPassword(em_id, data.password)

            setMessage({
                type: response.type,
                message: response.message
            })

            if (response.type == "success") {
                reset()
            }
            setLoading(false);
        }
        catch (e) {
            console.log(e);
            setLoading(false)
            setMessage({
                type: "error",
                message: "something went wrong"
            })
        }
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountDown((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
        else if (countdown == 0) {
            setOTP("")
            setCnfPass("")
            setPassword("")
            setCountDown(0);
            setOTP("")
        }
    }, [countdown]);

    useEffect(() => {
        if (message.type.length > 0) {
            setTimeout(() => {
                setMessage({
                    type: "",
                    message: ""
                })
            }, 3000)
        }
    }, [message])

    return (
        <div className="w-full h-[85vh] flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-96">
                {message.type && (
                    <Card className={`border ${message.type === "success" ? "border-green-500 bg-green-100" : "border-red-500 bg-red-100"}`}>
                        <CardHeader className="py-2">
                            <CardDescription className={`flex items-center gap-2 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                                {message.type === "success" && <UserCheck className="w-4 h-4" />}
                                {message.type === "error" && <TriangleAlert className="w-4 h-4" />}
                                {message.message}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                )}

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Reset your password</CardTitle>
                        <CardDescription>The OTP will be sent to your registered email</CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-3">
                        <div>
                            <Label htmlFor="otp">Enter OTP</Label>
                            <Input {...register("otp", { required: "This field is required" })} placeholder="One-time password" />
                            {errors.otp && <span className="text-xs text-red-500">{errors.otp.message}</span>}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                {...register("password", { required: "This field is required" })}
                                placeholder="Enter password"
                                onChange={handlePasswordChange}
                            />
                            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                        </div>

                        <div>
                            <Label htmlFor="cnf-password">Confirm Password</Label>
                            <Input
                                id="cnf-password"
                                type="password"
                                placeholder="Enter confirm password"
                                value={cnfpass}
                                onChange={(e) => {
                                    setCnfPass(e.target.value);
                                    setCnfPassError("");
                                }}
                            />
                            {cnfPassError && <span className="text-sm text-red-500">{cnfPassError}</span>}
                        </div>

                        {password && (
                            <div className="text-sm text-red-500">
                                <p className={`${passwordChecks.hasMinLength ? "text-green-600" : ""} flex items-center`}>
                                    Minimum 8 characters {passwordChecks.hasMinLength && <CircleCheckBig color="green" size={15} />}
                                </p>
                                <p className={`${passwordChecks.hasUppercase ? "text-green-600" : ""} flex items-center`}>
                                    1 Uppercase Alphabet {passwordChecks.hasUppercase && <CircleCheckBig color="green" size={15} />}
                                </p>
                                <p className={`${passwordChecks.hasLowercase ? "text-green-600" : ""} flex items-center`}>
                                    1 Lowercase Alphabet {passwordChecks.hasLowercase && <CircleCheckBig color="green" size={15} />}
                                </p>
                                <p className={`${passwordChecks.hasSpecialChar ? "text-green-600" : ""} flex items-center`}>
                                    1 Special Character {passwordChecks.hasSpecialChar && <CircleCheckBig color="green" size={15} />}
                                </p>
                            </div>
                        )}

                        <div className="w-full flex justify-end gap-3">
                            <Button disabled={countLoading || countdown !== 0} onClick={generateOTP}>
                                {countLoading ? <Loader /> : countdown === 0 ? "Get OTP" : countdown}
                            </Button>
                            <Button disabled={loading}>{loading ? <Loader /> : "Submit"}</Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
