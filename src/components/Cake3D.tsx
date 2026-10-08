import React from 'react';
import { CakeConfig } from '../types';
import { COLOR_OPTIONS, FONT_OPTIONS } from '../utils/cakeConstants';

interface Cake3DProps {
  config: CakeConfig;
  className?: string;
  isCinematic?: boolean;
  manualRotationDeg?: number;
}

export const Cake3D: React.FC<Cake3DProps> = ({
  config,
  className = '',
  isCinematic = false,
  manualRotationDeg = 0,
}) => {
  const colorData =
    COLOR_OPTIONS.find((c) => c.id === config.color) || COLOR_OPTIONS[0];
  const fontData =
    FONT_OPTIONS.find((f) => f.id === config.font) || FONT_OPTIONS[0];

  // Calculate tier dimensions
  const tiers = config.tiers;
  const candleCount = Math.max(1, Math.min(20, config.candles));

  // Determine top tier width to distribute candles
  const topTierWidth = tiers === 1 ? 230 : tiers === 2 ? 180 : 135;
  const topTierHeight = tiers === 1 ? 75 : tiers === 2 ? 65 : 55;

  // Generate candle positions in an arc on top tier
  const candlesList = Array.from({ length: candleCount }).map((_, i) => {
    const fraction = candleCount === 1 ? 0.5 : (i + 0.5) / candleCount;
    // Oval top distribution
    const angle = Math.PI * (0.15 + fraction * 0.7);
    const rx = (topTierWidth / 2) * 0.78;
    const ry = (topTierHeight / 2) * 0.45;
    const cx = Math.cos(angle) * rx;
    const cy = -Math.sin(angle) * ry;
    return {
      id: i,
      x: cx,
      y: cy,
      delay: i * 0.12, // For sequential lighting
    };
  });

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Ambient glow behind cake when lit */}
      {config.isLit && !config.isBlownOut && (
        <div
          className="absolute -top-12 w-72 h-72 rounded-full pointer-events-none transition-opacity duration-1000 animate-glow"
          style={{
            background:
              'radial-gradient(circle, rgba(251, 191, 36, 0.35) 0%, rgba(245, 158, 11, 0.15) 45%, rgba(0,0,0,0) 70%)',
          }}
        />
      )}

      {/* Rotating 3D Wrapper */}
      <div
        className={`relative transition-transform duration-500 flex flex-col items-center ${
          config.isRotating ? 'animate-cake-spin' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: !config.isRotating
            ? `rotateY(${manualRotationDeg}deg)`
            : undefined,
        }}
      >
        {/* SVG Rendered Multi-Tier Cake */}
        <svg
          viewBox="-160 -160 320 340"
          className="w-full h-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Frosting Linear Gradients */}
            <linearGradient id="tierGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colorData.shadow} />
              <stop offset="35%" stopColor={colorData.frosting} />
              <stop offset="85%" stopColor={colorData.frosting} />
              <stop offset="100%" stopColor={colorData.shadow} />
            </linearGradient>

            <linearGradient id="topSurfaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colorData.frosting} stopOpacity="1" />
              <stop offset="100%" stopColor={colorData.drip} stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="goldPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a3728" />
              <stop offset="50%" stopColor="#8d6e53" />
              <stop offset="100%" stopColor="#2b1f16" />
            </linearGradient>

            <radialGradient id="plaqueGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fdfbf7" />
              <stop offset="85%" stopColor="#e8dcbe" />
              <stop offset="100%" stopColor="#c5ad7d" />
            </radialGradient>

            <radialGradient id="candleFlameGrad" cx="50%" cy="70%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Pedestal Stand / Mountain Slab */}
          <g transform="translate(0, 115)">
            {/* Pedestal Base */}
            <ellipse cx="0" cy="24" rx="140" ry="24" fill="#141c18" opacity="0.8" />
            <path
              d="M -135,16 C -135,16 0,26 135,16 L 125,28 C 0,38 -125,28 -125,28 Z"
              fill="#22332a"
            />
            {/* Pedestal Stone Plate Top */}
            <ellipse cx="0" cy="15" rx="135" ry="22" fill="#2d4538" stroke="#486e5b" strokeWidth="1.5" />
            <ellipse cx="0" cy="13" rx="128" ry="19" fill="#1e3027" stroke="#3b5647" strokeWidth="1" />
          </g>

          {/* ================= TIER 1 (BASE TIER) ================= */}
          <g transform="translate(0, 50)">
            {/* Body */}
            <path
              d="M -120,0 L -120,55 C -120,78 120,78 120,55 L 120,0 Z"
              fill="url(#tierGrad)"
            />
            {/* Bottom Trim Ribbon */}
            <path
              d="M -120,52 C -120,75 120,75 120,52 L 120,57 C 120,80 -120,80 -120,57 Z"
              fill={colorData.accent}
              opacity="0.9"
            />
            {/* Top Surface */}
            <ellipse cx="0" cy="0" rx="120" ry="24" fill="url(#topSurfaceGrad)" stroke={colorData.shadow} strokeWidth="0.8" />

            {/* Frosting Drips on Tier 1 */}
            <path
              d="M -118,2 C -105,16 -95,6 -85,14 C -75,22 -65,10 -50,18 C -35,24 -20,10 -5,17 C 10,24 25,12 40,19 C 55,24 70,12 85,16 C 100,20 110,6 118,2"
              fill="none"
              stroke={colorData.drip}
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Style Decors on Tier 1 */}
            {config.style === 'forest' && (
              <g opacity="0.9">
                {/* Mini pine sprigs and forest berries */}
                <path d="M -90,38 L -90,24 M -90,26 L -96,30 M -90,26 L -84,30 M -90,30 L -98,35 M -90,30 L -82,35" stroke="#22543d" strokeWidth="2" strokeLinecap="round" />
                <path d="M 85,38 L 85,24 M 85,26 L 79,30 M 85,26 L 91,30 M 85,30 L 77,35 M 85,30 L 93,35" stroke="#22543d" strokeWidth="2" strokeLinecap="round" />
                {/* Berries */}
                <circle cx="-88" cy="40" r="3" fill="#be123c" />
                <circle cx="-94" cy="42" r="2.5" fill="#9f1239" />
                <circle cx="86" cy="40" r="3" fill="#be123c" />
                <circle cx="92" cy="42" r="2.5" fill="#9f1239" />
              </g>
            )}

            {config.style === 'classic' && (
              <g opacity="0.85">
                {/* Pearl beads around Tier 1 */}
                {[-100, -80, -60, -40, -20, 0, 20, 40, 60, 80, 100].map((px) => (
                  <circle key={`pearl-1-${px}`} cx={px} cy={55 + Math.cos(px / 65) * 12} r="2.5" fill={colorData.accent} />
                ))}
              </g>
            )}

            {config.style === 'mountain' && (
              <g opacity="0.85">
                {/* Subtle contour topo lines */}
                <path d="M -110,30 Q -50,42 0,38 Q 60,34 110,32" fill="none" stroke={colorData.accent} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <path d="M -105,45 Q -40,56 10,52 Q 60,48 105,46" fill="none" stroke={colorData.accent} strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
              </g>
            )}
          </g>

          {/* ================= TIER 2 (MIDDLE TIER) ================= */}
          {tiers >= 2 && (
            <g transform="translate(0, -3)">
              {/* Body */}
              <path
                d="M -92,0 L -92,48 C -92,68 92,68 92,48 L 92,0 Z"
                fill="url(#tierGrad)"
              />
              {/* Bottom Trim Ribbon */}
              <path
                d="M -92,46 C -92,66 92,66 92,46 L 92,50 C 92,70 -92,70 -92,50 Z"
                fill={colorData.accent}
                opacity="0.85"
              />
              {/* Top Surface */}
              <ellipse cx="0" cy="0" rx="92" ry="19" fill="url(#topSurfaceGrad)" stroke={colorData.shadow} strokeWidth="0.8" />

              {/* Drip on Tier 2 */}
              <path
                d="M -90,2 C -78,14 -68,5 -58,12 C -45,18 -32,8 -18,15 C -4,20 12,8 26,14 C 42,20 56,8 70,14 C 80,18 86,4 90,2"
                fill="none"
                stroke={colorData.drip}
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* Style Decors Tier 2 */}
              {config.style === 'forest' && (
                <g opacity="0.95">
                  <path d="M -70,30 L -70,18 M -70,20 L -75,24 M -70,20 L -65,24" stroke="#22543d" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 68,30 L 68,18 M 68,20 L 63,24 M 68,20 L 73,24" stroke="#22543d" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="-68" cy="32" r="2.5" fill="#be123c" />
                  <circle cx="70" cy="32" r="2.5" fill="#be123c" />
                </g>
              )}

              {config.style === 'classic' && (
                <g opacity="0.85">
                  {[-75, -55, -35, -15, 0, 15, 35, 55, 75].map((px) => (
                    <circle key={`pearl-2-${px}`} cx={px} cy={48 + Math.cos(px / 50) * 9} r="2.2" fill={colorData.accent} />
                  ))}
                </g>
              )}
            </g>
          )}

          {/* ================= TIER 3 (TOP TIER IF 3 TIERS) ================= */}
          {tiers >= 3 && (
            <g transform="translate(0, -48)">
              {/* Body */}
              <path
                d="M -68,0 L -68,42 C -68,58 68,58 68,42 L 68,0 Z"
                fill="url(#tierGrad)"
              />
              {/* Bottom Trim Ribbon */}
              <path
                d="M -68,40 C -68,56 68,56 68,40 L 68,44 C 68,60 -68,60 -68,44 Z"
                fill={colorData.accent}
                opacity="0.85"
              />
              {/* Top Surface */}
              <ellipse cx="0" cy="0" rx="68" ry="15" fill="url(#topSurfaceGrad)" stroke={colorData.shadow} strokeWidth="0.8" />

              {/* Drip on Tier 3 */}
              <path
                d="M -66,2 C -52,10 -40,4 -28,11 C -14,16 2,6 18,12 C 34,16 48,6 66,2"
                fill="none"
                stroke={colorData.drip}
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
          )}

          {/* ================= STYLE-SPECIFIC TOPPERS ================= */}
          {config.style === 'mountain' && (
            <g transform={`translate(0, ${tiers === 1 ? 40 : tiers === 2 ? -12 : -56})`}>
              {/* Mini Snowy Mountain Peak Topper */}
              <path d="M -30,-4 L -12,-34 L 2,-18 L 18,-38 L 36,-4 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
              {/* Snow caps */}
              <path d="M -12,-34 L -18,-24 L -12,-21 L -7,-25 Z" fill="#ffffff" />
              <path d="M 18,-38 L 11,-26 L 18,-23 L 26,-27 Z" fill="#ffffff" />
              {/* Golden Expedition Flag */}
              <path d="M 18,-38 L 18,-48 L 30,-43 L 18,-39" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
            </g>
          )}

          {config.style === 'forest' && (
            <g transform={`translate(0, ${tiers === 1 ? 45 : tiers === 2 ? -6 : -52})`}>
              {/* Mini Evergreen Pine Tree Topper */}
              <path d="M 0,-36 L -10,-24 L -6,-24 L -14,-12 L -8,-12 L -16,0 L 16,0 L 8,-12 L 14,-12 L 6,-24 L 10,-24 Z" fill="#14532d" stroke="#166534" strokeWidth="1" />
              {/* Golden Star or Berry top */}
              <circle cx="0" cy="-38" r="3.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            </g>
          )}

          {config.style === 'classic' && (
            <g transform={`translate(0, ${tiers === 1 ? 45 : tiers === 2 ? -6 : -52})`}>
              {/* Golden Crown / Rosette topper */}
              <path d="M -14,-18 L -18, -4 L 18, -4 L 14,-18 L 6,-8 L 0,-22 L -6,-8 Z" fill="url(#plaqueGrad)" stroke="#b45309" strokeWidth="1" />
            </g>
          )}

          {/* ================= CANDLES ON TOPMOST TIER ================= */}
          <g
            transform={`translate(0, ${
              tiers === 1 ? 42 : tiers === 2 ? -10 : -54
            })`}
          >
            {candlesList.map((candle) => {
              const flameVisible = config.isLit && !config.isBlownOut;
              return (
                <g key={`candle-${candle.id}`} transform={`translate(${candle.x}, ${candle.y})`}>
                  {/* Candle Base Shadow */}
                  <ellipse cx="0" cy="0" rx="3.5" ry="1.8" fill="#111827" opacity="0.6" />

                  {/* Candle Body */}
                  <rect
                    x="-3"
                    y="-28"
                    width="6"
                    height="28"
                    rx="2"
                    fill="#fef3c7"
                    stroke="#d97706"
                    strokeWidth="0.6"
                  />
                  {/* Decorative stripes */}
                  <line x1="-3" y1="-22" x2="3" y2="-20" stroke="#f59e0b" strokeWidth="1.2" />
                  <line x1="-3" y1="-14" x2="3" y2="-12" stroke="#f59e0b" strokeWidth="1.2" />
                  <line x1="-3" y1="-6" x2="3" y2="-4" stroke="#f59e0b" strokeWidth="1.2" />

                  {/* Wick */}
                  <line x1="0" y1="-28" x2="0" y2="-32" stroke="#374151" strokeWidth="1" />

                  {/* Candle Flame */}
                  {flameVisible && (
                    <g
                      className="animate-flame origin-bottom"
                      style={{
                        animationDelay: `${candle.delay}s`,
                      }}
                    >
                      {/* Outer Glow Halo */}
                      <circle
                        cx="0"
                        cy="-38"
                        r="12"
                        fill="url(#candleFlameGrad)"
                        opacity="0.5"
                      />
                      {/* Main Flame Teardrop */}
                      <path
                        d="M 0,-44 C -4,-39 -4,-33 0,-32 C 4,-33 4,-39 0,-44 Z"
                        fill="#f59e0b"
                      />
                      {/* Inner Bright Core */}
                      <path
                        d="M 0,-41 C -2,-38 -2,-34 0,-33 C 2,-34 2,-38 0,-41 Z"
                        fill="#fffbeb"
                      />
                    </g>
                  )}

                  {/* Smoke wisps after blowing out */}
                  {config.isBlownOut && (
                    <g opacity="0.75" className="animate-float">
                      <path
                        d="M 0,-33 Q -3,-40 1,-46 Q 4,-52 -1,-58"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* ================= CUSTOM BIRTHDAY TEXT PLAQUE ================= */}
          {/* Mounted on the front of the cake */}
          <g
            transform={`translate(0, ${
              tiers === 1 ? 75 : tiers === 2 ? 65 : 62
            })`}
          >
            {/* Wooden or Gold Plaque plate */}
            <rect
              x="-110"
              y="-15"
              width="220"
              height="30"
              rx="6"
              fill="url(#plaqueGrad)"
              stroke="#92400e"
              strokeWidth="1.5"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />
            {/* Subtle inner border */}
            <rect
              x="-106"
              y="-12"
              width="212"
              height="24"
              rx="4"
              fill="none"
              stroke="#b45309"
              strokeWidth="0.8"
              opacity="0.8"
            />
            {/* Rivets / Mountain Screws */}
            <circle cx="-102" cy="0" r="1.8" fill="#78350f" />
            <circle cx="102" cy="0" r="1.8" fill="#78350f" />

            {/* Custom Inscription Text */}
            <text
              x="0"
              y="4"
              textAnchor="middle"
              className={`${fontData.cssClass}`}
              fill="#451a03"
              fontSize={config.text.length > 22 ? '11' : config.text.length > 15 ? '13' : '15'}
              fontWeight="bold"
              letterSpacing="0.04em"
            >
              {config.text || 'HAPPY BIRTHDAY, FIKRI'}
            </text>
          </g>
        </svg>
      </div>

      {/* Cinematic Candle Glow reflection under the stand */}
      {config.isLit && !config.isBlownOut && (
        <div
          className="w-48 h-6 rounded-full blur-md -mt-3 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse, rgba(245, 158, 11, 0.45) 0%, rgba(0,0,0,0) 80%)',
          }}
        />
      )}

      {/* Badges / Sub-tag on preview */}
      {!isCinematic && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#d1c7b7]">
          <span className="px-2.5 py-1 rounded bg-[#16251e] border border-[#2b4437] text-emerald-300 font-medium">
            {config.tiers} {config.tiers === 1 ? 'Tier' : 'Tiers'}
          </span>
          <span className="px-2.5 py-1 rounded bg-[#16251e] border border-[#2b4437] text-amber-300 font-medium capitalize">
            {colorData.name}
          </span>
          <span className="px-2.5 py-1 rounded bg-[#16251e] border border-[#2b4437] text-[#e8dfcf] font-medium capitalize">
            {config.style} Style
          </span>
          <span className="px-2.5 py-1 rounded bg-[#16251e] border border-[#2b4437] text-orange-300 font-medium">
            {config.candles} {config.candles === 1 ? 'Candle' : 'Candles'}
          </span>
        </div>
      )}
    </div>
  );
};
