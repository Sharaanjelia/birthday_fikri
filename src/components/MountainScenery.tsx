import React from 'react';
import { AppStep } from '../types';

interface MountainSceneryProps {
  currentStep: AppStep;
}

export const MountainScenery: React.FC<MountainSceneryProps> = ({ currentStep }) => {
  // Theme variants based on current stage
  const isNight =
    currentStep === 'CAKE_REVEAL' ||
    currentStep === 'FINAL_MESSAGE';

  const isCampSunset = currentStep === 'CHAPTER_04';

  const isSunriseEnd = currentStep === 'ENDING_SUNRISE';

  const isSummitGolden =
    currentStep === 'TRANSITION_SUMMIT' ||
    currentStep === 'CAKE_CREATOR' ||
    currentStep === 'CAKE_CUSTOMIZE' ||
    currentStep === 'CAKE_PREVIEW';

  const isSteepClimb = currentStep === 'CHAPTER_02';
  const isAcademicTwilight = currentStep === 'CHAPTER_03';

  // Sky gradient styling
  const getSkyStyle = () => {
    if (isNight) {
      return 'bg-gradient-to-b from-[#030706] via-[#08120e] to-[#0d1c16]';
    }
    if (isCampSunset) {
      return 'bg-gradient-to-b from-[#19192b] via-[#3d2433] via-[#633332] to-[#1c2c23]';
    }
    if (isSunriseEnd) {
      return 'bg-gradient-to-b from-[#18233c] via-[#4d3248] via-[#a3523f] via-[#d97736] to-[#f4b266]';
    }
    if (isSummitGolden) {
      return 'bg-gradient-to-b from-[#0b1b1f] via-[#1a3838] via-[#524430] to-[#1c2b22]';
    }
    if (isAcademicTwilight) {
      return 'bg-gradient-to-b from-[#0a1128] via-[#132238] via-[#1a3636] to-[#0f1f1a]';
    }
    if (isSteepClimb) {
      return 'bg-gradient-to-b from-[#0c1618] via-[#152a28] via-[#213d35] to-[#14231d]';
    }
    // Default Opening & Chapter 1
    return 'bg-gradient-to-b from-[#091512] via-[#102720] via-[#263e32] to-[#12241b]';
  };

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none overflow-hidden transition-colors duration-1000 z-0 ${getSkyStyle()}`}
    >
      {/* Stars layer (prominent at night and twilight) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isNight ? 'opacity-90' : isCampSunset || isAcademicTwilight ? 'opacity-60' : 'opacity-25'
        }`}
      >
        {/* Twinkling star field */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {[
            { cx: '12%', cy: '14%', r: '1.4', dur: '3s' },
            { cx: '25%', cy: '8%', r: '1.8', dur: '4s' },
            { cx: '38%', cy: '22%', r: '1.2', dur: '2.5s' },
            { cx: '48%', cy: '12%', r: '1.6', dur: '3.8s' },
            { cx: '62%', cy: '18%', r: '2.0', dur: '4.2s' },
            { cx: '75%', cy: '9%', r: '1.3', dur: '2.8s' },
            { cx: '88%', cy: '25%', r: '1.9', dur: '3.5s' },
            { cx: '18%', cy: '32%', r: '1.1', dur: '3.2s' },
            { cx: '82%', cy: '38%', r: '1.5', dur: '4.5s' },
            { cx: '5%', cy: '28%', r: '1.3', dur: '3s' },
            { cx: '94%', cy: '15%', r: '1.4', dur: '2.9s' },
            { cx: '55%', cy: '6%', r: '1.7', dur: '5s' },
            { cx: '30%', cy: '36%', r: '1.2', dur: '3.4s' },
            { cx: '68%', cy: '30%', r: '1.3', dur: '3.1s' },
          ].map((st, i) => (
            <circle
              key={`star-${i}`}
              cx={st.cx}
              cy={st.cy}
              r={st.r}
              fill="#fef08a"
              className="animate-pulse"
              style={{ animationDuration: st.dur }}
            />
          ))}
          {/* Subtle shooting star at night */}
          {isNight && (
            <line
              x1="65%"
              y1="8%"
              x2="55%"
              y2="18%"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
              className="animate-pulse"
            />
          )}
        </svg>
      </div>

      {/* Sun / Moon celestial body */}
      <div
        className="absolute transition-all duration-1000 ease-out"
        style={{
          top: isSunriseEnd ? '32%' : isNight ? '12%' : isCampSunset ? '46%' : '24%',
          right: isSunriseEnd ? '25%' : isNight ? '18%' : '20%',
        }}
      >
        {isNight ? (
          // Crescent Moon
          <div className="relative w-16 h-16 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.35)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M 50 10 A 40 40 0 1 0 90 50 A 32 32 0 1 1 50 10 Z"
                fill="#fdfbf7"
                opacity="0.95"
              />
            </svg>
          </div>
        ) : isSunriseEnd ? (
          // Radiant Golden Sunrise
          <div className="relative flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-200 blur-xl opacity-80 animate-pulse" />
            <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-100 shadow-[0_0_80px_rgba(251,191,36,0.9)]" />
          </div>
        ) : isCampSunset ? (
          // Warm Sunset Orb
          <div className="w-24 h-24 rounded-full bg-gradient-to-t from-rose-500 to-amber-400 blur-md opacity-85 shadow-[0_0_60px_rgba(244,63,94,0.6)]" />
        ) : (
          // Ambient soft alpine sun glow
          <div className="w-32 h-32 rounded-full bg-amber-200/20 blur-3xl" />
        )}
      </div>

      {/* Atmospheric Fog / Drifting Cloud Layers */}
      <div className="absolute inset-x-0 bottom-1/4 h-64 opacity-35 mix-blend-screen pointer-events-none animate-fog-slow">
        <svg viewBox="0 0 1440 320" className="w-[120%] h-full -ml-[10%]">
          <path
            fill="#dbeafe"
            fillOpacity="0.4"
            d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,218.7C672,213,768,139,864,133.3C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Layer 1: Distant Jagged Mountains */}
      <div className="absolute inset-x-0 bottom-16 sm:bottom-20 h-80 sm:h-96 opacity-60 transition-opacity duration-1000">
        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Snowy Jagged Summits */}
          <path
            d="M 0,380 L 140,240 L 220,290 L 380,140 L 460,210 L 620,110 L 740,230 L 890,90 L 1020,220 L 1180,130 L 1300,240 L 1440,160 L 1440,400 L 0,400 Z"
            fill={isNight ? '#0b1612' : isCampSunset ? '#261b2a' : isSunriseEnd ? '#5a2d34' : '#142820'}
          />
          {/* Snowcaps on peaks */}
          <polygon points="380,140 350,175 375,170 388,172 410,174" fill={isNight ? '#22382f' : '#f1f5f9'} opacity="0.65" />
          <polygon points="620,110 590,145 615,140 635,144 650,146" fill={isNight ? '#22382f' : '#f1f5f9'} opacity="0.7" />
          <polygon points="890,90 855,130 885,124 905,126 925,132" fill={isNight ? '#22382f' : '#f1f5f9'} opacity="0.75" />
          <polygon points="1180,130 1150,165 1178,160 1205,166" fill={isNight ? '#22382f' : '#f1f5f9'} opacity="0.65" />
        </svg>
      </div>

      {/* Layer 2: Mid-Range Ridge with Pine Silhouettes */}
      <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 opacity-85 transition-colors duration-1000">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Ridge Curve */}
          <path
            d="M 0,320 L 0,180 Q 220,120 480,190 T 960,160 Q 1200,120 1440,210 L 1440,320 Z"
            fill={isNight ? '#070f0c' : isCampSunset ? '#1a1820' : isSunriseEnd ? '#3b1d28' : '#0d1e17'}
          />
          {/* Pine Trees along ridge */}
          {[60, 110, 150, 240, 290, 340, 420, 520, 580, 680, 740, 820, 910, 1020, 1110, 1200, 1310, 1380].map((tx, idx) => (
            <polygon
              key={`tree-${idx}`}
              points={`${tx},165 ${tx - 10},195 ${tx - 6},195 ${tx - 12},220 ${tx + 12},220 ${tx + 6},195 ${tx + 10},195`}
              fill={isNight ? '#040907' : isCampSunset ? '#100f14' : '#08140f'}
              opacity="0.9"
            />
          ))}
        </svg>
      </div>

      {/* Layer 3: Foreground Trail / Camp Ridge */}
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M 0,180 L 0,120 Q 380,70 720,110 T 1440,80 L 1440,180 Z"
            fill={isNight ? '#020604' : '#060f0b'}
          />
          {/* Subtle trail path on foreground */}
          <path
            d="M 120,180 Q 420,110 740,135 T 1320,110"
            fill="none"
            stroke={isNight ? '#10241b' : '#1c382b'}
            strokeWidth="8"
            strokeDasharray="16 10"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Campfire Visual Highlight when on Chapter 4 (Camp Under The Stars) */}
      {isCampSunset && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          {/* Warm Campfire Glow Circle */}
          <div className="w-56 h-36 rounded-full bg-gradient-to-t from-amber-500/30 via-orange-600/20 to-transparent blur-2xl animate-campfire" />
        </div>
      )}
    </div>
  );
};
