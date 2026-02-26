
import React from 'react';

export const SeloRotativo: React.FC = () => {
    return (
        <div className="relative w-40 h-40 flex items-center justify-center group cursor-pointer">
            {/* Rotating Text */}
            <div className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                        id="circlePath"
                        d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                        fill="none"
                    />
                    <text className="text-[6.2px] font-bold uppercase tracking-[1.4px] fill-white">
                        <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                            • Previdenciário • Bancário • Consumidor • Previdenciário
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* Center Icon */}
            <div className="relative z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-[#4A7BFF]"
                >
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};
