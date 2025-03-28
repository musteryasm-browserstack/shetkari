// importing from react
import Image from "next/image";
import Link from "next/link";

// importing assets
import logo from "@/assets/logo.svg";

export function NavLogo() {
    return (
        <>
            <Link href="/" className="flex items-center gap-2 mx-2">
                <Image
                    src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-[40px] h-fit"
                />
            </Link>
        </>
    );
}