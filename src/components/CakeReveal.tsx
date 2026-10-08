import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CakeConfig } from '../types';
import { Cake3D } from './Cake3D';
import { audioEngine } from '../utils/audio';
import { Sparkles, Wind, RotateCw, ArrowRight, Flame } from 'lucide-react';

interface CakeRevealProps {
  config: CakeConfig;
  onUpdateConfig: (newConfig: Partial<CakeConfig>) => void;
  onNext: () => void;
}

export const CakeReveal: React.FC<CakeRevealProps> = ({
  config,
  onUpdateConfig,
  onNext,
}) => {
  const [revealPhase, setRevealPhase] = useState<'igniting' | 'celebrating'>('igniting');
  const [litProgress, setLitProgress] = useState<number>(0);
  const [hasBlownCandles, setHasBlownCandles] = useState<boolean>(false);

  // Trigger ignition sequence on mount
  useEffect(() => {
    // 1. Initial dark cinematic pause
    setLitProgress(0);
    onUpdateConfig({ isLit: false, isBlownOut: false, isRotating: true });

    // Step 2: Ignite candles sequentially
    const totalCandles = config.candles;
    let currentLit = 0;

    const interval = setInterval(() => {
      currentLit++;
      setLitProgress(currentLit);
      // Play soft ignition sound
      audioEngine.playCandleSparkle(1 + (currentLit / totalCandles) * 0.4);

      if (currentLit >= totalCandles) {
        clearInterval(interval);
        onUpdateConfig({ isLit: true });
        setRevealPhase('celebrating');

        // Play celebration audio & trigger mountain confetti burst!
        audioEngine.playCelebrationChimes();
        launchConfetti();
      }
    }, 180);

    return () => clearInterval(interval);
  }, []);

  const launchConfetti = () => {
    try {
      // Golden, forest emerald, and champagne confetti burst
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#d4af37', '#10b981', '#f59e0b', '#fef08a', '#34d399', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.75 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.75 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {
      // Fallback
    }
  };

  const handleBlowOut = () => {
    setHasBlownCandles(true);
    onUpdateConfig({ isBlownOut: true });
    audioEngine.playBlowOut();
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fef3c7', '#cbd5e1', '#d4af37'],
    });
  };

  const handleRelight = () => {
    setHasBlownCandles(false);
    onUpdateConfig({ isBlownOut: false, isLit: true });
    audioEngine.playCandleSparkle(1.2);
  };

  return (
    <div className="fixed inset-0 z-40 bg-[#030806]/95 backdrop-blur-xl flex flex-col items-center justify-between py-8 px-4 text-center select-none overflow-y-auto">
      {/* Top Banner: Big cinematic celebration title */}
      <div className="pt-6 sm:pt-10 z-10 transition-all duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#14281f]/70 border border-[#274b37] text-amber-300 text-xs font-mono uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>SUMMIT CELEBRATION</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-mountain tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-[0_10px_25px_rgba(251,191,36,0.4)]">
          HAPPY BIRTHDAY, FIKRI! 🎂
        </h1>
        <p className="text-xs sm:text-sm font-mono text-[#a6bba9] tracking-widest uppercase mt-2">
          UNTUK LANGKAH YANG SUDAH SEJAUH INI & PUNCAK-PUNCAK BERIKUTNYA
        </p>
      </div>

      {/* Center: Grand 3D Rotating Cake with glowing halo */}
      <div className="relative my-auto flex flex-col items-center justify-center w-full max-w-xl py-6">
        {/* Glow halo */}
        <div
          className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
          style={{
            background: config.isLit && !config.isBlownOut
              ? 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          }}
        />

        {/* 3D Cake */}
        <div className="w-full flex items-center justify-center transform scale-105 sm:scale-115">
          <Cake3D
            config={config}
            isCinematic={true}
          />
        </div>

        {/* Live Candle lighting indicator during ignition */}
        {revealPhase === 'igniting' && (
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-amber-300 bg-[#0d1c15] px-3.5 py-1.5 rounded-full border border-[#234232]">
            <Flame className="w-3.5 h-3.5 animate-bounce" />
            <span>Menyalakan lilin ke-{litProgress} dari {config.candles}...</span>
          </div>
        )}
      </div>

      {/* Bottom Controls & Next CTA */}
      <div className="pb-6 sm:pb-8 z-10 w-full max-w-lg space-y-4">
        {/* Interactive action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Blow Candles button */}
          {!hasBlownCandles ? (
            <button
              onClick={handleBlowOut}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#132c20] hover:bg-[#1a3a2b] border border-[#2f5d44] text-[#f4efe6] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-105"
            >
              <Wind className="w-4 h-4 text-sky-300" />
              <span>Tiup Lilin & Buat Harapan 💨</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#132c20] hover:bg-[#1a3a2b] border border-[#2f5d44] text-amber-300 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Nyalakan Lilin Lagi 🕯️</span>
            </button>
          )}

          {/* Toggle Rotation */}
          <button
            onClick={() => onUpdateConfig({ isRotating: !config.isRotating })}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0e1d16] hover:bg-[#14291f] border border-[#213f30] text-[#a1b7a9] text-xs font-mono transition-colors"
          >
            <RotateCw className={`w-3.5 h-3.5 ${config.isRotating ? 'animate-spin' : ''}`} />
            <span>{config.isRotating ? 'Stop Spin' : '360° Spin'}</span>
          </button>
        </div>

        {/* Wish blown message */}
        {hasBlownCandles && (
          <p className="text-xs text-amber-300 font-mono animate-fade-in">
            ✨ Harapanmu telah dipanjatkan di puncak tertinggi. Semoga tercapai, Fikri!
          </p>
        )}

        {/* Read Final Message Button */}
        <div>
          <button
            onClick={onNext}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#214d38] to-[#2e684c] hover:from-[#2a5e45] hover:to-[#387a59] text-[#f7f2ea] text-sm font-bold tracking-wide border border-[#447c5d] shadow-[0_10px_30px_rgba(20,55,38,0.7)] transition-all hover:scale-105"
          >
            <span>BACA PESAN TERAKHIR</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
