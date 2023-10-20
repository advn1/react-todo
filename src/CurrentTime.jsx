import { useEffect } from "react";

export default function updateCurrentTime() {
    useEffect(() => {
        const interval = setInterval(() => {
        setTime([new Date().getHours(), new Date().getMinutes()])
        }, 60000);

        return () => clearInterval(interval)
    }, [])
}