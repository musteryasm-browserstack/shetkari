// importing from next
import Link from "next/link";

// importing shadcn components
import { Button } from "@/components/ui/button";

// importing components
import { NavLogo } from "./nav-logo";

// importing icons
import { LogOut } from "lucide-react";

// importing cookies
import Cookies from "js-cookie";
// import { AvatarDropdown } from "./avatar-dropdown";
import { GoBack } from "./go-back";
import { REDIRECT_WHEN_JWT_EXPIRED } from "@/lib/constants";
// import { getSession } from "@/lib/authentication";
// import { redirect } from "next/navigation";

export function SignOut() {
    return (
        <Button
            onClick={() => { Cookies.remove("session"); window.location.href = REDIRECT_WHEN_JWT_EXPIRED; }}
            variant={"ghost"}
            size={"icon"}
        >
            <LogOut />
        </Button>
    );
}

export async function Navbar() {
    // const session = await getSession();
    // if (!session) {
    //     redirect(REDIRECT_WHEN_JWT_EXPIRED);
    // }

    return (
        <>
            <nav className="w-full bg-muted p-2 flex justify-between items-center border rounded-b-2xl fixed h-16 z-50">
                <div className="flex gap-4">
                    <GoBack />
                    <NavLogo />
                </div>

                <div>
                    {/* something */}
                </div>

                {/* <AvatarDropdown
                    avatarName={session.user.name}
                    avatarEmail={session.user.username}
                    avatarImage={""}
                /> */}
                <Button>
                    <Link href={"/login"}>
                        Farmer Login
                    </Link>
                </Button>
            </nav>
        </>
    );
}