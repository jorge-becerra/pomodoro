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

    React.useEffect(() => {
        setState({
            time,
            seconds: time % 60,
            minutes: Math.floor(time / 60),
        });
    }, [time, resetKey]);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;

        if (active && state.time > 0) {
            interval = setInterval(() => {
                setState((prevState) => {
                    if (prevState.time <= 0) {
                        clearInterval(interval);
                        return prevState;
                    }
                    return {
                        time: prevState.time - 1,
                        seconds: (prevState.time - 1) % 60,
                        minutes: Math.floor((prevState.time - 1) / 60),
                    };
                });
            }, 1000);
        } 
        return () => clearInterval(interval);
    }, [active]);

    return (
        <div className={`${isDark ? 'text-white' : 'text-black'} grid place-items-center w-full transition-colors duration-300`}>
            <h2 className="inline-block text-center text-8xl md:text-9xl font-bold">
                {state.minutes}:{state.seconds < 10 ? '0' : ''}{state.seconds}
            </h2>
        </div>
    );
}

export default Timer;