import React from 'react';

interface LiriaLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const LiriaLogo: React.FC<LiriaLogoProps> = ({
  className = '',
  size = 32,
  showText = true,
  textColor = '#8C1544',
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon SVG: Blooming Rose gracefully emerging from an open book */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#FFF5F7] to-[#FCE6ED] p-1.5 shadow-xs border border-[#F4D2DE]"
        style={{ width: size + 8, height: size + 8 }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C93B6E" />
              <stop offset="100%" stopColor="#87133F" />
            </linearGradient>
            <linearGradient id="rosePetalSoft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9D2DE" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E599B2" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Book Spine & Pages (Bottom) */}
          <path
            d="M50 78 C 36 71 22 71 14 74 L 14 45 C 22 42 36 42 50 49 C 64 42 78 42 86 45 L 86 74 C 78 71 64 71 50 78 Z"
            fill="#FFF8FA"
            stroke="url(#roseGradient)"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Inner pages line detail */}
          <path
            d="M50 78 L 50 49"
            stroke="url(#roseGradient)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <path
            d="M20 71 C 28 69 38 69 46 73"
            stroke="url(#roseGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
          <path
            d="M80 71 C 72 69 62 69 54 73"
            stroke="url(#roseGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />

          {/* Rose Stem rising from center spine */}
          <path
            d="M50 49 Q 50 38 50 30"
            stroke="url(#roseGradient)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Rose Leaf */}
          <path
            d="M50 40 C 44 38 38 42 41 47 C 45 48 48 44 50 40 Z"
            fill="url(#rosePetalSoft)"
            stroke="url(#roseGradient)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Rose Bloom Petals */}
          <path
            d="M38 28 C 35 20 44 14 50 17 C 56 14 65 20 62 28 C 60 35 50 40 50 40 C 50 40 40 35 38 28 Z"
            fill="url(#rosePetalSoft)"
            stroke="url(#roseGradient)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M45 22 C 43 18 50 15 53 19 C 55 22 51 26 48 25"
            stroke="url(#roseGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M42 27 C 48 31 52 31 58 27"
            stroke="url(#roseGradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Side petal bloom */}
          <path
            d="M57 26 C 66 24 71 31 66 38 C 62 40 58 36 57 32"
            fill="url(#rosePetalSoft)"
            stroke="url(#roseGradient)"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {showText && (
        <span
          className="text-2xl font-serif font-bold tracking-tight"
          style={{ color: textColor }}
        >
          Líria
        </span>
      )}
    </div>
  );
};
