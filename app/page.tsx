'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Timer from "../components/timer";
import clsx from "clsx";
import SettingsSidebar from "../components/sidebar";
import { isColorDark } from "../utils/colorUtils";

export default function Home() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(1500); // 25:01 minutes in seconds
  const [lastSetTime, setLastSetTime] = useState(1500); // Add this state to track last set time
  const [resetKey, setResetKey] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(() => {
    if (typeof window === 'undefined') return '#000000';
    const savedColor = localStorage.getItem('backgroundColor') || '#000000';
    document.body.style.backgroundColor = savedColor;
    return savedColor;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    return isColorDark(localStorage.getItem('backgroundColor') || '#000000');
  });

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

  // Single effect to handle theme changes
  useEffect(() => {
    const darkMode = isColorDark(backgroundColor);
    setIsDarkMode(darkMode);
    
    // Update DOM
    document.body.style.backgroundColor = backgroundColor;
    localStorage.setItem('backgroundColor', backgroundColor);
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [backgroundColor]);

  return (
    <div className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className={clsx(
              "rounded-full border border-solid border-transparent transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto",
              {
                "bg-white text-black hover:bg-gray-300": isDarkMode,
                "bg-zinc-900 text-white hover:bg-zinc-800": !isDarkMode
              }
            )}
            onClick={() => setTimerMode(1500)}
          >
            Focus
          </button>
          <button
            className={clsx(
              "rounded-full border border-solid transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]",
              {
                "border-black/[.08] hover:bg-gray-100": !isDarkMode,
                "border-white/[.145] hover:bg-zinc-900": isDarkMode
              }
            )}
            onClick={() => setTimerMode(300)}
          >
            Short Break
          </button>
          <button
            className={clsx(
              "rounded-full border border-solid transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]",
              {
                "border-black/[.08] hover:bg-gray-100": !isDarkMode,
                "border-white/[.145] hover:bg-zinc-900": isDarkMode
              }
            )}
            onClick={() => setTimerMode(900)}
          >
            Long Break
          </button>
        </div>
        <div className="text-center gap-4">
          <Timer time={currentTime} active={isTimerActive} resetKey={resetKey} isDark={isDarkMode} />
        </div>
        <div className="flex justify-center w-full gap-4">
          <button
            className={clsx(
              "rounded-full border border-solid transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto",
              {
                "bg-white text-black hover:bg-[#A6FFA1]": isDarkMode,
                "bg-zinc-900 text-white hover:bg-[#75B371]": !isDarkMode,
                "hover:bg-[#FCF75E]": isTimerActive && !isDarkMode,
                "hover:bg-[#BDB746]": isTimerActive && isDarkMode
              }
            )}
            onClick={() => setIsTimerActive(!isTimerActive)}
          >
            <p className={clsx({"hidden": isTimerActive})}>
              Start Timer
            </p>
            <p className={clsx({"hidden": !isTimerActive})}>
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
          <button 
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-blue-500 dark:hover:bg-blue-500 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Image
            aria-hidden
            className="dark:invert"
            src="/settings.svg"
            alt="Gear icon"
            width={24}
            height={24}
            />
          </button>
          <SettingsSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onColorChange={setBackgroundColor}
            currentColor={backgroundColor}
          />
        </div>
      </main>
      <footer className={`row-start-3 flex gap-[24px] flex-wrap items-center justify-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
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
      </footer>
    </div>
  );
}
