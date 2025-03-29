'use client';

import React from 'react';

interface State {
    time: number;
    seconds: number;
    minutes: number;
}

interface TimerProps {
    time: number;
    active: boolean;
    resetKey: number;
    isDark: boolean;
}

const Timer: React.FC<TimerProps> = ({ time, active, resetKey, isDark }) => {
    const [state, setState] = React.useState<State>({
        time,
        seconds: time % 60,
        minutes: Math.floor(time / 60),
    });
    
    const startTimeRef = React.useRef<number | null>(null);
    const initialTimeRef = React.useRef<number>(time);

    React.useEffect(() => {
        setState({
            time,
            seconds: time % 60,
            minutes: Math.floor(time / 60),
        });
        initialTimeRef.current = time;
        startTimeRef.current = null;
    }, [time, resetKey]);

    React.useEffect(() => {
        let animationFrameId: number;

        const updateTimer = () => {
            if (!startTimeRef.current && active) {
                startTimeRef.current = performance.now();
            }

            if (active && startTimeRef.current !== null) {
                const currentTime = performance.now();
                const elapsedSeconds = Math.floor((currentTime - startTimeRef.current) / 1000);
                const newTime = Math.max(0, initialTimeRef.current - elapsedSeconds);

                setState({
                    time: newTime,
                    seconds: newTime % 60,
                    minutes: Math.floor(newTime / 60),
                });

                if (newTime > 0) {
                    animationFrameId = requestAnimationFrame(updateTimer);
                }
            }
        };

        if (active) {
            animationFrameId = requestAnimationFrame(updateTimer);
        } else {
            startTimeRef.current = null;
        }

        return () => {
            if (animationFrameId !== undefined) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [active]);

    return (
        <div className={`${isDark ? 'text-white' : 'text-black'} grid place-items-center w-full transition-colors duration-300`}>
            <h2 className="inline-block text-center text-8xl md:text-9xl font-bold">
                {state.minutes < 10 ? '0' : ''}{state.minutes}:{state.seconds < 10 ? '0' : ''}{state.seconds}
            </h2>
        </div>
    );
}

export default Timer;