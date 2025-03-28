"use client"; // If using Next.js App Router

// importing from react
import axios from "axios";
import { useEffect, useState } from "react";

// importing shadnc components
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// importing constants
import { BACKEND_URL } from "@/lib/constants";
import { FirebaseDataType } from "@/lib/types";

export function RealtimeDataFetcher() {
    const [alert, setAlert] = useState({
        alert: false,
        alertType: "",
        alertTitle: "",
        alertDescription: ""
    });
    const [data, setData] = useState<FirebaseDataType>({
        deviceid: "",
        humidity: 0.00,
        latitude: 0.00,
        longitude: 0.00,
        moisture: 0.00,
        ph: 0.00,
        pump: 0,
        temperature: 0,
        ultrasonic: 0
    });
    console.log(data);

    const [open, setOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/pg-dump`);
                if (response.data.status === "success") {
                    setData(response.data.data);
                    if (response.data.alert) {
                        setAlert({
                            alert: true,
                            alertType: response.data.alertType,
                            alertTitle: response.data.alertTitle,
                            alertDescription: response.data.alertDescription
                        });
                        setOpen(true);
                    }
                    else {
                        setOpen(false);
                    }
                }
                console.log("Fetched Data:", response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const interval = setInterval(fetchData, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {alert && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className={`sm:max-w-[425px] ${alert.alertType === "alert" ? "border-destructive text-destructive" : "bg-yellow-100"}`}>
                        <DialogHeader>
                            <DialogTitle>{alert.alertTitle}</DialogTitle>
                            <DialogDescription>
                                {alert.alertDescription}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};