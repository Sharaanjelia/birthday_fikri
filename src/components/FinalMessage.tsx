import React, { useState } from 'react';
import { AppStep } from '../types';
import {
  ArrowRight,
  RotateCcw,
  Sparkles,
  Mountain,
  Copy,
  Check,
  Sun,
  Award,
} from 'lucide-react';

interface FinalMessageProps {
  currentStep: AppStep;
  onNext: () => void;
  onRestart: () => void;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({
  currentStep,
  onNext,
  onRestart,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCard = () => {
    const textToCopy = `🏔️ A Journey to the Summit — For Fikri Rahmat 🏔️
"Satu hal yang aku harap kamu ingat. Kamu sudah sampai sejauh ini. Jadi kalau suatu hari perjalananmu terasa berat lagi, jangan lupa sama semua hal yang sudah berhasil kamu lewati.

Semoga kamu terus menemukan hal-hal yang bikin kamu bahagia.
Semoga kuliahmu lancar (Teknik Informatika).
Semoga langkahmu setelah ini semakin jauh.
Dan semoga setiap perjalanan, termasuk perjalananmu naik gunung, selalu membawa kamu ke tempat-tempat indah.

Tetap jadi Fikri yang terus belajar, terus tumbuh, dan terus jalan.
Semangat terus ya, Fikri. 🏔️
I'm genuinely happy to see how far you've come.

Happy Birthday, Fikri Rahmat! Keep climbing. Keep growing. Keep going."`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ================= PAGE 11 — FINAL MESSAGE =================
  if (currentStep === 'FINAL_MESSAGE') {
    return (
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-24 max-w-4xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 font-semibold uppercase">
              MIDNIGHT SUMMIT REFLECTION
            </span>
            <h1 className="text-3xl sm:text-5xl font-mountain text-[#f8f3ea]">
              ONE LAST THING...
            </h1>
          </div>

          {/* Letter Card */}
          <div className="p-6 sm:p-10 rounded-2xl bg-[#0f2119]/90 border border-[#264b38] backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.6)] space-y-6">
            <div className="space-y-4 text-[#ded5c7] text-base sm:text-lg leading-relaxed font-light">
              <p className="font-normal text-amber-200">
                Satu hal yang aku harap kamu ingat.
              </p>
              <p>
                Kamu sudah sampai sejauh ini.
              </p>
              <p>
                Jadi kalau suatu hari perjalananmu terasa berat lagi, jangan lupa sama semua hal yang sudah berhasil kamu lewati.
              </p>
              <div className="p-4 rounded-xl bg-[#14281f] border border-[#274b37] space-y-2 text-sm sm:text-base">
                <p>✨ Semoga kamu terus menemukan hal-hal yang bikin kamu bahagia.</p>
                <p>🎓 Semoga kuliahmu lancar.</p>
                <p>🚀 Semoga langkahmu setelah ini semakin jauh.</p>
                <p>🏔️ Dan semoga setiap perjalanan, termasuk perjalananmu naik gunung, selalu membawa kamu ke tempat-tempat indah.</p>
              </div>
            </div>

            {/* Standout Highlights */}
            <div className="py-4 space-y-3 text-center border-y border-[#1e3c2c]">
              <p className="font-mountain text-lg sm:text-xl text-[#f3eedf] tracking-wide">
                Tetap jadi Fikri yang terus belajar, terus tumbuh, dan terus jalan.
              </p>
              <p className="font-mountain text-xl sm:text-2xl font-bold text-amber-400">
                Semangat terus ya, Fikri. 🏔️
              </p>
            </div>

            {/* Final Touching Line */}
            <div className="text-center pt-2">
              <p className="font-serif italic text-lg sm:text-xl text-emerald-300">
                &ldquo;I'm genuinely happy to see how far you've come.&rdquo;
              </p>
            </div>

            {/* Button */}
            <div className="text-center pt-4">
              <button
                onClick={onNext}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#214d38] to-[#2e684c] hover:from-[#2a5e45] hover:to-[#387a59] text-[#f7f2ea] text-sm font-bold tracking-wide border border-[#447c5d] shadow-lg transition-all hover:scale-105"
              >
                <span>LIHAT MATAHARI TERBIT DI PUNCAK</span>
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ================= FINAL SCREEN — ENDING / SUMMIT SUNRISE =================
  if (currentStep === 'ENDING_SUNRISE') {
    return (
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center max-w-4xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Sunrise badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '16s' }} />
            <span>Fajar Emas di Puncak Tertinggi</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-mountain tracking-wider text-[#fdf8ee] drop-shadow-md">
              THE JOURNEY CONTINUES...
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl text-amber-300">
              Happy Birthday, Fikri Rahmat.
            </p>
          </div>

          {/* Core Mantra */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#14231b]/80 border border-[#2f5540] shadow-xl max-w-xl mx-auto space-y-3">
            <p className="font-mountain text-lg sm:text-xl font-bold tracking-widest text-[#f5ede0]">
              KEEP CLIMBING. KEEP GROWING. KEEP GOING.
            </p>
            <p className="text-xs sm:text-sm text-[#b2c7b8] font-light">
              Dari temen masa kecil sejak zaman SD yang selalu mendoakan dan bangga dengan setiap langkahmu.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleCopyCard}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#132c20] hover:bg-[#1a3a2b] border border-[#2f5d44] text-[#f4efe6] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Pesan Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-300" />
                  <span>Salin Kartu Kenangan 📋</span>
                </>
              )}
            </button>

            <button
              onClick={onRestart}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-[#1f1609] font-bold text-xs sm:text-sm tracking-wide shadow-lg transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform" />
              <span>RESTART THE JOURNEY ↺</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return null;
};
