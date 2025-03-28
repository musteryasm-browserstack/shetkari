"use client"; // If using Next.js App Router

import { useEffect } from "react";
import axios from "axios";
import { PG_DUMP_URL } from "@/lib/constants";

export function RealtimeDataFetcher() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(PG_DUMP_URL);
                console.log("Fetched Data:", response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const interval = setInterval(fetchData, 10000);

        return () => clearInterval(interval);
    }, []);

    return <div></div>;
};