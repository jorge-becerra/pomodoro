import { useEffect, useRef } from 'react';
import { isColorDark } from '../utils/colorUtils';
import clsx from 'clsx';

interface SettingsSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onColorChange: (color: string) => void;
    currentColor: string;
}

export default function SettingsSidebar({ isOpen, onClose, onColorChange, currentColor }: SettingsSidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div 
            className={clsx(
                "fixed right-0 top-0 h-full w-1/2 bg-zinc-950 text-white shadow-lg transform transition-transform duration-300 ease-in-out",
                {
                    "translate-x-0": isOpen,
                    "translate-x-full": !isOpen,
                }
            )}
            ref={sidebarRef}
        >
            <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Settings</h2>
                <div className="space-y-4">
                    <label className="block">
                        <span className="block mb-2">Background Color</span>
                        <input
                            type="color"
                            value={currentColor}
                            onChange={(e) => onColorChange(e.target.value)}
                            className="w-full h-10 cursor-pointer"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}