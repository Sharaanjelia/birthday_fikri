import React from 'react';
import { CakeConfig, CakeTierCount, CakeColorId, CakeStyleId, CakeFontId, AppStep } from '../types';
import { Cake3D } from './Cake3D';
import { COLOR_OPTIONS, STYLE_OPTIONS, FONT_OPTIONS } from '../utils/cakeConstants';
import {
  Sparkles,
  Flame,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCw,
  Compass,
  Palette,
  Type,
  Layers,
} from 'lucide-react';

interface CakeWorkshopProps {
  currentStep: AppStep;
  config: CakeConfig;
  onUpdateConfig: (newConfig: Partial<CakeConfig>) => void;
  onNext: () => void;
  onPrev: () => void;
  onLightCandles: () => void;
}

export const CakeWorkshop: React.FC<CakeWorkshopProps> = ({
  currentStep,
  config,
  onUpdateConfig,
  onNext,
  onPrev,
  onLightCandles,
}) => {
  const currentColor =
    COLOR_OPTIONS.find((c) => c.id === config.color) || COLOR_OPTIONS[0];
  const currentFont =
    FONT_OPTIONS.find((f) => f.id === config.font) || FONT_OPTIONS[0];

  // ================= STEP 7: CAKE CREATOR =================
  if (currentStep === 'CAKE_CREATOR') {
    return (
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-20 max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 font-semibold uppercase">
              STEP 1 OF 3 · CAKE ARCHITECTURE
            </span>
            <h1 className="text-2xl sm:text-4xl font-mountain text-[#f8f3ea]">
              BUILD YOUR BIRTHDAY CAKE
            </h1>
            <p className="text-sm sm:text-base text-[#b7c7bc] font-light">
              &ldquo;Choose your cake.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Live Cake Preview Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0e1d16]/80 border border-[#234233] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="w-full flex items-center justify-between text-xs font-mono text-[#a2b5a9] mb-2 px-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  REALTIME PREVIEW
                </span>
                <span>{config.tiers} TIER CAKE</span>
              </div>

              <div className="w-full flex items-center justify-center py-4 min-h-[310px]">
                <Cake3D config={config} />
              </div>

              <div className="w-full mt-2 pt-3 border-t border-[#1d3529] flex items-center justify-between text-xs text-[#8ca395]">
                <span>Warna: <strong className="text-[#f5f1e8]">{currentColor.name}</strong></span>
                <span>Style: <strong className="text-[#f5f1e8] capitalize">{config.style}</strong></span>
              </div>
            </div>

            {/* Controls Column */}
            <div className="lg:col-span-7 space-y-6 bg-[#0c1a14]/90 p-6 sm:p-8 rounded-2xl border border-[#214332] shadow-xl">
              {/* 1. CAKE LEVEL / TIERS */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono text-[#9bb3a4] tracking-wider uppercase flex items-center gap-1.5 font-bold">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>1. CAKE LEVEL (TIERS)</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {([1, 2, 3] as CakeTierCount[]).map((tierCount) => (
                    <button
                      key={`tier-${tierCount}`}
                      type="button"
                      onClick={() => onUpdateConfig({ tiers: tierCount })}
                      className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all border ${
                        config.tiers === tierCount
                          ? 'bg-[#1b4330] border-emerald-400 text-white shadow-md'
                          : 'bg-[#11231a] border-[#223f30] text-[#cfc6b8] hover:bg-[#162d22]'
                      }`}
                    >
                      <div className="font-mountain">{tierCount} {tierCount === 1 ? 'TIER' : 'TIERS'}</div>
                      <div className="text-[10px] text-[#869b8e] font-normal mt-0.5">
                        {tierCount === 1 ? 'Satu Tingkat' : tierCount === 2 ? 'Dua Tingkat' : 'Tiga Tingkat'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. CAKE COLOR */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono text-[#9bb3a4] tracking-wider uppercase flex items-center gap-1.5 font-bold">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>2. CAKE COLOR (FLAVOR / FROSTING)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {COLOR_OPTIONS.map((c) => {
                    const isSelected = config.color === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => onUpdateConfig({ color: c.id })}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all text-left ${
                          isSelected
                            ? 'bg-[#1c4331] border-emerald-400 ring-1 ring-emerald-400 text-white'
                            : 'bg-[#10231a] border-[#213d2f] text-[#cfc7b9] hover:bg-[#152e22]'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border shadow-sm shrink-0 ${c.swatch}`}
                        />
                        <div className="overflow-hidden">
                          <div className="text-xs font-medium truncate">{c.name}</div>
                          <div className="text-[10px] text-[#859b8e] truncate">{c.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. CAKE STYLE */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono text-[#9bb3a4] tracking-wider uppercase flex items-center gap-1.5 font-bold">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>3. CAKE STYLE</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {STYLE_OPTIONS.map((s) => {
                    const isSelected = config.style === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => onUpdateConfig({ style: s.id })}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#1c4331] border-emerald-400 text-white shadow-md'
                            : 'bg-[#10231a] border-[#213d2f] text-[#cfc7b9] hover:bg-[#152e22]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mountain text-xs font-bold">{s.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-300" />}
                        </div>
                        <p className="text-[11px] text-[#8ea396] leading-tight">
                          {s.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. CANDLE COUNT SLIDER */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-[#9bb3a4] tracking-wider uppercase flex items-center gap-1.5 font-bold">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>4. CANDLE COUNT (1 — 20)</span>
                  </label>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#183929] border border-[#2d5c43] text-amber-300 font-mono text-xs font-bold">
                    Candles: {config.candles}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-[#6c8275]">1</span>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={config.candles}
                    onChange={(e) => onUpdateConfig({ candles: parseInt(e.target.value) || 1 })}
                    className="w-full h-2 bg-[#172c21] rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <span className="text-xs font-mono text-[#6c8275]">20</span>
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-4 flex items-center justify-between border-t border-[#1d382b]">
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-4 py-2.5 rounded-lg border border-[#2b4b39] text-xs font-semibold text-[#b8c9bd] hover:bg-[#14291f] transition-colors"
                >
                  ← KEMBALI KE PUNCAK
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#214d38] to-[#2e684c] hover:from-[#2a5e45] hover:to-[#387a59] text-white text-xs sm:text-sm font-semibold tracking-wide border border-[#447c5d] shadow-md transition-all"
                >
                  <span>LANJUT KE TULISAN KUE</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ================= STEP 8: BIRTHDAY MESSAGE CUSTOMIZATION =================
  if (currentStep === 'CAKE_CUSTOMIZE') {
    const quickPresets = [
      'HAPPY BIRTHDAY, FIKRI',
      'KEEP CLIMBING, FIKRI! 🏔️',
      'SUMMIT REACHED! 🎉',
      'SELAMAT ULANG TAHUN TEMENKU',
    ];

    return (
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-20 max-w-6xl mx-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 font-semibold uppercase">
              STEP 2 OF 3 · MESSAGE ENGRAVER
            </span>
            <h1 className="text-2xl sm:text-4xl font-mountain text-[#f8f3ea]">
              MAKE IT YOURS
            </h1>
            <p className="text-sm sm:text-base text-[#b7c7bc] font-light">
              &ldquo;Choose the words on your cake.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Live Cake Preview Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0e1d16]/80 border border-[#234233] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="w-full flex items-center justify-between text-xs font-mono text-[#a2b5a9] mb-2 px-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  REALTIME ENGRAVING PREVIEW
                </span>
                <span className="text-amber-300 font-medium">{currentFont.name}</span>
              </div>

              <div className="w-full flex items-center justify-center py-4 min-h-[310px]">
                <Cake3D config={config} />
              </div>

              <div className="w-full mt-2 pt-3 border-t border-[#1d3529] text-center">
                <p className="text-xs text-[#8ea395]">
                  Teks Terpasang: <strong className="text-[#f5f1e8] font-mono">&ldquo;{config.text}&rdquo;</strong>
                </p>
              </div>
            </div>

            {/* Controls Column */}
            <div className="lg:col-span-7 space-y-6 bg-[#0c1a14]/90 p-6 sm:p-8 rounded-2xl border border-[#214332] shadow-xl">
              {/* Text Input */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono text-[#9bb3a4] tracking-wider uppercase flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-amber-400" />
                    <span>TULISAN DI KUE (MAX 32 KARAKTER)</span>
                  </span>
                  <span className="text-[11px] font-mono text-amber-400">
                    {config.text.length}/32
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={32}
                    value={config.text}
                    onChange={(e) => onUpdateConfig({ text: e.target.value.toUpperCase() })}
                    placeholder="HAPPY BIRTHDAY, FIKRI"
                    className="w-full px-4 py-3 rounded-xl bg-[#12241b] border border-[#2e5540] text-[#f8f4ec] font-mono text-sm placeholder-[#577262] focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-inner"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] text-[#71887b] self-center">Contoh cepat:</span>
                  {quickPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => onUpdateConfig({ text: preset })}
                      className="px-2.5 py-1 rounded-md bg-[#162e22] hover:bg-[#1e3c2c] border border-[#294a37] text-[11px] font-mono text-[#cbd9cf] transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono text-[#9bb3a4] tracking-wider uppercase flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>FONT SELECTOR (PILIH GAYA HURUF)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {FONT_OPTIONS.map((f) => {
                    const isSelected = config.font === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => onUpdateConfig({ font: f.id })}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#1c4331] border-emerald-400 ring-1 ring-emerald-400 text-white shadow-md'
                            : 'bg-[#10231a] border-[#213d2f] text-[#cfc7b9] hover:bg-[#152e22]'
                        }`}
                      >
                        <div className="text-[11px] font-mono text-[#8ca395] mb-1">
                          {f.name}
                        </div>
                        <div className={`text-base truncate text-amber-300 ${f.cssClass}`}>
                          {f.sample}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-4 flex items-center justify-between border-t border-[#1d382b]">
                <button
                  type="button"
                  onClick={onPrev}
                  className="px-4 py-2.5 rounded-lg border border-[#2b4b39] text-xs font-semibold text-[#b8c9bd] hover:bg-[#14291f] transition-colors"
                >
                  ← KEMBALI KE LEVEL KUE
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#214d38] to-[#2e684c] hover:from-[#2a5e45] hover:to-[#387a59] text-white text-xs sm:text-sm font-semibold tracking-wide border border-[#447c5d] shadow-md transition-all"
                >
                  <span>LIHAT HASIL KUE</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ================= STEP 9: FINAL CAKE PREVIEW =================
  if (currentStep === 'CAKE_PREVIEW') {
    return (
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-20 max-w-5xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 font-semibold uppercase">
              STEP 3 OF 3 · EXPEDITION COMPLETION
            </span>
            <h1 className="text-3xl sm:text-5xl font-mountain text-[#f8f3ea]">
              YOUR CAKE IS READY.
            </h1>
            <p className="text-sm sm:text-base text-[#b7c7bc] font-light max-w-xl mx-auto">
              Seluruh racikan kue puncak telah dipersiapkan khusus untuk Fikri Rahman.
            </p>
          </div>

          {/* Grand Centerpiece */}
          <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0f2119] to-[#07130e] border border-[#2a4e3b] shadow-[0_30px_70px_rgba(0,0,0,0.7)] flex flex-col items-center">
            {/* Interactive 3D Cake with rotation slider */}
            <div className="py-4 w-full flex items-center justify-center">
              <Cake3D config={config} />
            </div>

            {/* Cake Configuration Passport / Certificate */}
            <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-6 border-t border-[#1d3529] text-center text-xs">
              <div className="p-2.5 rounded-lg bg-[#0c1a14] border border-[#1e382b]">
                <div className="text-[10px] font-mono text-[#779182] uppercase">TINGKAT KUE</div>
                <div className="font-semibold text-[#f5f1e8] mt-0.5">{config.tiers} Tiers</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0c1a14] border border-[#1e382b]">
                <div className="text-[10px] font-mono text-[#779182] uppercase">PALET WARNA</div>
                <div className="font-semibold text-amber-300 mt-0.5 capitalize">{currentColor.name}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0c1a14] border border-[#1e382b]">
                <div className="text-[10px] font-mono text-[#779182] uppercase">GAYA / THEME</div>
                <div className="font-semibold text-emerald-300 mt-0.5 capitalize">{config.style}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0c1a14] border border-[#1e382b]">
                <div className="text-[10px] font-mono text-[#779182] uppercase">JUMLAH LILIN</div>
                <div className="font-semibold text-orange-300 mt-0.5">{config.candles} Lilin</div>
              </div>
            </div>

            {/* Rotation toggle button */}
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onUpdateConfig({ isRotating: !config.isRotating })}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-colors border ${
                  config.isRotating
                    ? 'bg-[#183929] border-emerald-400 text-emerald-300'
                    : 'bg-[#0f1f18] border-[#223d30] text-[#a0b5a8] hover:text-white'
                }`}
              >
                <RotateCw className={`w-3 h-3 ${config.isRotating ? 'animate-spin' : ''}`} />
                <span>{config.isRotating ? 'Hentikan Putaran 360°' : 'Putar Kue 360°'}</span>
              </button>
            </div>

            {/* LIGHT THE CANDLES CTA */}
            <div className="pt-8">
              <button
                type="button"
                onClick={onLightCandles}
                className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-400 hover:via-yellow-400 hover:to-orange-400 text-[#1f1609] font-extrabold text-base sm:text-lg tracking-wider shadow-[0_15px_40px_rgba(245,158,11,0.5)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.8)] transform hover:-translate-y-1 transition-all duration-300"
              >
                <Flame className="w-5 h-5 text-[#854d0e] fill-current animate-bounce" />
                <span>LIGHT THE CANDLES 🕯️</span>
                <Sparkles className="w-5 h-5 text-[#854d0e]" />
              </button>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={onPrev}
                className="text-xs text-[#8ca395] hover:text-[#d0ded6] transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali mengedit tulisan</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
};
