'use client';

import Image from "next/image";
import Timer from "../components/timer";
import { useState } from "react";
import clsx from "clsx";

export default function Home() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(1500); // 25:01 minutes in seconds
  const [lastSetTime, setLastSetTime] = useState(1500); // Add this state to track last set time
  const [resetKey, setResetKey] = useState(0);

  const setTimerMode = (time: number) => {
    setLastSetTime(time);
    setCurrentTime(time);
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setCurrentTime(lastSetTime);
    setIsTimerActive(false);
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick={() => setTimerMode(1500)}
          >
            Focus
          </button>
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            onClick={() => setTimerMode(300)}
          >
            Short Break
          </button>
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            onClick={() => setTimerMode(900)}
          >
            Long Break
          </button>
        </div>
        <div className="text-center gap-4">
          <Timer time={currentTime} active={isTimerActive} resetKey={resetKey} />
        </div>
        <div className="flex justify-center w-full gap-4">
          <button
            className={clsx("rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#A6FFA1] dark:hover:bg-[#A6FFA1] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto",
                            {
                              "transition-colors hover:bg-[#FCF75E] dark:hover:bg-[#FCF75E]": isTimerActive
                            }
            )}
            onClick={() => setIsTimerActive(!isTimerActive)}
          >
            <p
            className={clsx({"display: hidden" : isTimerActive})}>
              Start Timer
            </p>
            <p
            className={clsx({"display: hidden" : !isTimerActive})}>
              Pause Timer
            </p>
          </button>

          <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#FFBF00] dark:hover:bg-[#FFBF00] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick={resetTimer}
          >
            <Image
            aria-hidden
            className="dark:invert"
            src="/restart.svg"
            alt="Restart icon"
            width={20}
            height={20}
            />
          </button>
          <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#FFBF00] dark:hover:bg-[#FFBF00] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">
            <Image
            aria-hidden
            className="dark:invert"
            src="/settings.svg"
            alt="Gear icon"
            width={24}
            height={24}
            />
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/jorge-becerra/pomodoro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            className="dark:invert animate-spin-slow"
            src="/github-logo.svg"
            alt="Github icon"
            width={16}
            height={16}
          />
          Github
        </a>
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
      </footer>
    </div>
  );
}
