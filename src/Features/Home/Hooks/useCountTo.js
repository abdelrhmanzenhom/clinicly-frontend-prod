import { useEffect, useRef, useState } from "react";

export function useCountTo(target = 0, duration = 1500, start = false) {
    const [value, setValue] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
        if (!start) return; // ⬅ only run when start === true

        let startTime = null;
        const from = 0;
        const to = target;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setValue(Math.floor(from + (to - from) * eased));

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step);
            }
        };

        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current);
    }, [start, target, duration]);

    return value;
}