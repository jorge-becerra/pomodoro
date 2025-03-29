import { useEffect, useRef } from 'react';

interface SettingsSidebarProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onColorChange: (color: string) => void;
    readonly currentColor: string;
    readonly isDarkMode: boolean;
}

export default function SettingsSidebar({ isOpen, onClose, onColorChange, currentColor, isDarkMode }: SettingsSidebarProps) {
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

    const handleColorChange = (newColor: string) => {
        onColorChange(newColor);
        localStorage.setItem('backgroundColor', newColor);
    };

    return (
        <>
            {/* Backdrop overlay */}
            <button 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500"
                style={{
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none'
                }}
                onClick={onClose}
                aria-label="Close settings sidebar"
            />
            
            {/* Sidebar */}
            <div 
                className="fixed right-0 top-0 h-full z-50 w-full sm:w-1/2 lg:w-1/3 shadow-xl transform transition-all duration-500 ease-out bg-zinc-950 text-white"
                style={{
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    opacity: isOpen ? 1 : 0.95
                }}
                ref={sidebarRef}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Settings</h2>
                        <button 
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800 transition-colors"
                            aria-label="Close settings"
                        >
                            <span className="text-xl font-medium">×</span>
                        </button>
                    </div>
                    <div className="space-y-6">
                        <div className="block">
                            <span className="block mb-3">Background Color</span>
                            
                            {/* Color preview */}
                            <div className="mt-3">
                                <span className="block mb-2 text-sm opacity-75">Custom Color</span>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-12 h-12">
                                        <div 
                                            className="absolute inset-0 rounded-full border border-gray-400 shadow-sm overflow-hidden hover:scale-105 transition-transform"
                                            style={{ backgroundColor: currentColor }}
                                        ></div>
                                        <input
                                            type="color"
                                            value={currentColor}
                                            onChange={(e) => handleColorChange(e.target.value)}
                                            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                                            aria-label="Select custom color"
                                        />
                                    </div>
                                    <span className="uppercase text-sm">{currentColor}</span>
                                </div>
                            </div>
                            
                            {/* Preset colors */}
                            <div className="mt-3">
                                <span className="block mb-2 text-sm opacity-75">Preset Colors</span>
                                <div className="grid grid-cols-5 gap-3">
                                    {[
                                        '#000000', '#1E1E1E', '#2D2D2D', '#3C3C3C', '#4B4B4B', // Dark grays
                                        '#FF5252', '#FF7043', '#FFAB40', '#FFD740', '#FFEB3B', // Reds and yellows
                                        '#66BB6A', '#26A69A', '#29B6F6', '#42A5F5', '#5C6BC0', // Greens and blues
                                        '#7E57C2', '#AB47BC', '#EC407A', '#EF5350', '#FFFFFF'  // Purples, pinks and white
                                    ].map((color) => (
                                        <button
                                            key={color}
                                            className={`w-10 h-10 rounded-full border transition-transform hover:scale-110 ${color === currentColor ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorChange(color)}
                                            aria-label={`Select color ${color}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}