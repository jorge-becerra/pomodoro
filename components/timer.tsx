'use client';

import React from 'react';

interface State {
    time: number;
    seconds: number;
    minutes: number;
}

interface Props {
    time: number; // input time, but in seconds from ../page.tsx
}

const Timer: React.FC<Props> = ({ time }) => {
    const [state, setState] = React.useState<State>({
        time,
        seconds: time - Math.floor((time - 1) / 60) * 60 - 1,
        minutes: Math.floor((time - 1) / 60),
    });

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (state.time > 0) {
                setState({
                    time: state.time - 1,
                    seconds: state.time - Math.floor((state.time - 1) / 60) * 60 - 1,
                    minutes: Math.floor((state.time - 1) / 60),
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(interval);
    }, [state.time]);

    return (
        <h2 className="flex text-9xl font-bold text-center font-[family-name:var(--inter)]"> 
            {state.minutes} : {state.seconds < 10 ? `0${state.seconds}` : state.seconds}
        </h2>
    );
}

export default Timer;