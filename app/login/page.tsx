// importing from next
// import { redirect } from "next/navigation";

// importing components
import { LoginForm } from "@/components/forms/login-form";
import { NavLogo } from "@/components/navbar/nav-logo";
import { ModeToggle } from "@/components/navbar/toggle-theme";
// import { getSession } from "@/lib/authentication";

export default async function page() {
    // const session = await getSession();
    // if (session) {
    //     redirect("/home");
    // }

    return (
        <div className="min-h-svh flex justify-center">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="w-full flex justify-center">
                    <div className="scale-200 pt-8">
                        <NavLogo />
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}
