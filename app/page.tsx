// importing from next
import Link from "next/link";
import Image from "next/image";

// importing components
import { Navbar } from "@/components/navbar/navbar";

// importing shadcn components
import { Button } from "@/components/ui/button";

// importing image
import logo from "@/assets/logo.svg";
import logoWord from "@/assets/shetkari-word-logo.png";
import dashboard from "@/assets/dashboard.png";
// import dashboard1 from "@/assets/dashboard1.png";
// import dashboard2 from "@/assets/dashboard2.png";
// import dashboard3 from "@/assets/dashboard3.png";

export default async function page() {
    return (
        <>
            <Navbar />

            <div className="p-20">
                <Image
                    src={logo}
                    alt="logo.svg"
                    width={100}
                    height={100}
                    className="mx-auto"
                />
                <Image
                    src={logoWord}
                    alt="logoWord.svg"
                    width={200}
                    height={100}
                    className="mx-auto h-fit"
                />
                <h1 className="text-xl font-semibold text-center">
                    Ab Farmer bhi karega Work-From-Home
                </h1>

                <div className="flex justify-center gap-2 py-4">
                    <Button asChild>
                        <Link href={"/sign-up"}>
                            Get Started
                        </Link>
                    </Button>
                    <Button variant={"outline"} asChild>
                        <Link href={"/login"}>
                            Farmer Login
                        </Link>
                    </Button>
                </div>

                <div className="my-10">
                    <Image
                        src={dashboard}
                        alt="dashboard"
                        width={1000}
                        height={800}
                        className="aspect-video max-w-[60vw] mx-auto rounded-3xl border-2 border-primary p-2"
                    />
                </div>
            </div>
        </>
    )
}
