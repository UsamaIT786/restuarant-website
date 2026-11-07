import React, { useState } from 'react';
import { Palette, Sparkles, ChevronUp, ChevronDown, Check } from 'lucide-react';

export const PitchDemoBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('orange');

  const themes = [
    { id: 'orange', name: 'Brazilian Orange', primary: '#FF6600', hover: '#FF771A', dot: 'bg-[#FF6600]' },
    { id: 'gold', name: 'Artisan Gold', primary: '#F59E0B', hover: '#D97706', dot: 'bg-amber-500' },
    { id: 'red', name: 'Smokehouse Crimson', primary: '#EF4444', hover: '#DC2626', dot: 'bg-red-500' },
    { id: 'emerald', name: 'Gourmet Emerald', primary: '#10B981', hover: '#059669', dot: 'bg-emerald-500' },
  ];

  const applyTheme = (theme) => {
    setActiveTheme(theme.id);
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-primary-hover', theme.hover);
  };

  return (
    <div className="fixed top-20 right-4 z-40 hidden md:block">
      <div className="bg-[#141414]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-2 transition-all">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-subheading font-bold text-gray-300 hover:text-white px-3 py-1.5 rounded-xl hover:bg-[#202020] transition-colors"
          title="Pitch Mode: Preview different brand accent colors"
        >
          <Palette className="w-3.5 h-3.5 text-[#FF6600]" />
          <span>Pitch Mode: Brand Colors</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isOpen && (
          <div className="mt-2 pt-2 border-t border-[#262626] space-y-1.5 px-1">
            <span className="text-[10px] text-gray-400 font-sans block mb-1">
              Select palette to test live rebranding:
            </span>
            {themes.map((th) => (
              <button
                key={th.id}
                onClick={() => applyTheme(th)}
                className={`w-full flex items-center justify-between text-xs font-sans px-2.5 py-1.5 rounded-lg transition-all ${
                  activeTheme === th.id
                    ? 'bg-[#222222] text-white font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${th.dot}`} />
                  <span>{th.name}</span>
                </div>
                {activeTheme === th.id && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

