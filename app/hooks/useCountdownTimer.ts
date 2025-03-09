import { Nullable } from 'primereact/ts-helpers';
import { useEffect, useRef, useState } from 'react';

interface CountdownTimer {
    time: string;
    available: boolean;
}

export function useCountdownTimer(startDate?: Nullable<Date>): CountdownTimer {
    const timeRef = useRef<{ available: boolean; time: string }>({
        available: false,
        time: '-'
    });

    // Este estado fuerza un re-render solo del countdown
    const [forceRender, setForceRender] = useState(0);

    useEffect(() => {
        if (!startDate) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const eventTime = new Date(startDate).getTime();
            const remainingTime = eventTime - now;

            if (remainingTime <= 0) {
                timeRef.current = { available: false, time: '-' };
                clearInterval(interval);
            } else {
                const seconds = Math.floor((remainingTime / 1000) % 60);
                const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
                const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);
                const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

                const time = `${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m ${seconds}s`;

                timeRef.current = { available: true, time };
                setForceRender((prev) => prev + 1); // Forzar solo el re-render del countdown
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate]);

    return timeRef.current;
}
