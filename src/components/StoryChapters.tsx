import React, { useState, useEffect, useRef } from 'react';
import { AppStep } from '../types';
import defaultFikriPhoto from '../assets/images/fikri_puncak_tandikek_1791447517553.jpg';
import {
  ArrowRight,
  Compass,
  Footprints,
  Sparkles,
  Flame,
  Award,
  Layers,
  HeartHandshake,
  CheckCircle2,
  Tent,
  Upload,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';

interface StoryChaptersProps {
  currentStep: AppStep;
  onNext: () => void;
  onPrev: () => void;
}

export const StoryChapters: React.FC<StoryChaptersProps> = ({
  currentStep,
  onNext,
  onPrev,
}) => {
  // Counter animation for Chapter 03 IP 4.00
  const [gpaCounter, setGpaCounter] = useState<number>(0);
  const [activeTabCard, setActiveTabCard] = useState<number>(0);
  const [climbingProgress, setClimbingProgress] = useState<number>(2);

  // Custom photo upload state for Chapter 01 Polaroid
  const DEFAULT_FIKRI_PHOTO = defaultFikriPhoto;
  const [userPhoto, setUserPhoto] = useState<string | null>(DEFAULT_FIKRI_PHOTO);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setUserPhoto(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (currentStep === 'CHAPTER_03') {
      setGpaCounter(0);
      const duration = 1600;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const easeOutVal = 1 - (1 - progress) * (1 - progress);
        const currentVal = easeOutVal * 4.0;
        setGpaCounter(parseFloat(currentVal.toFixed(2)));

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setGpaCounter(4.0);
        }
      };

      requestAnimationFrame(updateCounter);
    }
  }, [currentStep]);

  // ================= PAGE 1 — OPENING =================
  if (currentStep === 'OPENING') {
    return (
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center max-w-4xl mx-auto">
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          {/* Subtle badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14281f]/80 border border-[#2b4c39] text-[#9fc0af] text-xs uppercase tracking-widest font-mono">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>A Summit Tribute For A Lifetime Friend</span>
          </div>

          {/* Main Hero Header */}
          <div className="space-y-3">
            <h2 className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#a99c89]">
              FOR FIKRI RAHMAN
            </h2>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-mountain tracking-wide text-[#f5ede0] leading-tight drop-shadow-md">
              A Little Journey for Someone <br className="hidden sm:inline" />
              Who Has Come This Far.
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-base sm:text-lg md:text-xl text-[#cfc5b3] max-w-2xl mx-auto leading-relaxed font-light">
            Before you reach the cake, there are a few things I want you to read.
          </p>

          {/* Decorative mountain icon & line */}
          <div className="flex items-center justify-center gap-3 py-2 text-[#466957]">
            <div className="h-px w-16 bg-[#284a3b]" />
            <span className="text-amber-400 font-mono text-xs">▲ ▲ ▲</span>
            <div className="h-px w-16 bg-[#284a3b]" />
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              onClick={onNext}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#214a36] to-[#2c6146] hover:from-[#2a5d44] hover:to-[#387856] text-[#f7f2ea] font-medium tracking-wide border border-[#44785b] shadow-[0_10px_30px_rgba(18,48,34,0.6)] hover:shadow-[0_14px_35px_rgba(25,72,50,0.8)] transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="text-sm sm:text-base font-semibold tracking-wider">
                START THE JOURNEY
              </span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ================= PAGE 2 — CHAPTER 01 (CHILDHOOD) =================
  if (currentStep === 'CHAPTER_01') {
    return (
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Content Column */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 font-semibold uppercase">
                01 — THE BEGINNING
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f4eee3] leading-snug">
                &ldquo;Some journeys begin long before we realize it.&rdquo;
              </h2>
            </div>

            <div className="space-y-4 text-[#d5cbba] text-base sm:text-lg leading-relaxed font-light">
              <p className="p-4 rounded-xl bg-[#11231a]/80 border border-[#234332] shadow-sm">
                Kita sudah kenal dari kecil banget. Dari zaman SD, sampai akhirnya sekarang kita sudah sama-sama punya perjalanan masing-masing.
              </p>
              <p className="p-4 rounded-xl bg-[#11231a]/80 border border-[#234332] shadow-sm">
                Sempat nggak nyangka juga kalau anak-anak yang dulu cuma main dan ngobrol biasa, sekarang sudah mulai sibuk mengejar jalan hidup masing-masing.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onNext}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-[#1a382a] hover:bg-[#234a38] text-[#f7f2ea] text-sm font-semibold tracking-wide border border-[#37664f] shadow-md transition-all hover:translate-x-1"
              >
                <span>KEEP WALKING</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Nostalgic Visual / Polaroid Column */}
          <div className="md:col-span-5 flex flex-col items-center">
            {/* Hidden File Input for Custom Photo Upload */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            {/* Polaroid Frame */}
            <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-500 bg-[#fbf8f2] text-[#2c221a] p-4 pb-6 rounded-sm shadow-[0_20px_35px_rgba(0,0,0,0.6)] border border-[#e5dcce] max-w-xs w-full">
              {/* Pin / Tape accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#c8b79f]/80 -rotate-3 backdrop-blur-sm shadow-sm" />

              {/* Photo Area */}
              <div className="aspect-square bg-[#12261c] rounded-sm relative overflow-hidden flex flex-col items-center justify-center text-white border border-[#3b5947]/30">
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt="Fikri Rahman di Puncak Gunung"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* Warm Nostalgic Childhood Friends & Mountain Illustration */
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="chSky" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#133023" />
                        <stop offset="65%" stopColor="#25543d" />
                        <stop offset="100%" stopColor="#d99b54" />
                      </linearGradient>
                      <linearGradient id="chHill1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1b4530" />
                        <stop offset="100%" stopColor="#2b6247" />
                      </linearGradient>
                      <linearGradient id="chHill2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#112e20" />
                        <stop offset="100%" stopColor="#1d4d36" />
                      </linearGradient>
                    </defs>

                    {/* Sky */}
                    <rect width="200" height="200" fill="url(#chSky)" />

                    {/* Warm Mountain Sun */}
                    <circle cx="155" cy="60" r="22" fill="#fed7aa" opacity="0.9" />
                    <circle cx="155" cy="60" r="32" fill="#fde68a" opacity="0.25" />

                    {/* Distant Mountain Peak with Snowcap */}
                    <polygon points="120,45 75,115 165,115" fill="#1e3f30" opacity="0.8" />
                    <polygon points="120,45 106,68 120,64 134,68" fill="#f8fafc" opacity="0.85" />

                    {/* Second Mountain */}
                    <polygon points="65,65 25,125 105,125" fill="#173528" opacity="0.6" />
                    <polygon points="65,65 52,85 65,81 78,85" fill="#f1f5f9" opacity="0.75" />

                    {/* Mid Hill Layer with Pine Trees */}
                    <path
                      d="M 0,135 Q 60,110 130,122 T 200,118 L 200,200 L 0,200 Z"
                      fill="url(#chHill1)"
                    />
                    {/* Pine silhouettes */}
                    <polygon points="35,110 28,126 42,126" fill="#0d261a" />
                    <polygon points="35,118 25,136 45,136" fill="#0d261a" />
                    <polygon points="58,115 52,128 64,128" fill="#0d261a" />
                    <polygon points="58,122 49,138 67,138" fill="#0d261a" />
                    <polygon points="172,110 167,122 177,122" fill="#0d261a" />
                    <polygon points="172,116 164,130 180,130" fill="#0d261a" />

                    {/* Foreground Green Ridge */}
                    <path
                      d="M 0,165 Q 90,138 200,158 L 200,200 L 0,200 Z"
                      fill="url(#chHill2)"
                    />

                    {/* Winding Trail */}
                    <path
                      d="M 20,200 Q 75,178 115,168 T 160,152"
                      fill="none"
                      stroke="#e5b882"
                      strokeWidth="3.5"
                      strokeDasharray="5 3"
                      opacity="0.8"
                    />

                    {/* Two Childhood Friends Walking Hand/Side by Side */}
                    <g transform="translate(70, 142)">
                      <ellipse cx="0" cy="18" rx="5" ry="9" fill="#f59e0b" />
                      <rect x="-7" y="11" width="4" height="9" rx="1.5" fill="#059669" />
                      <circle cx="0" cy="6" r="4.5" fill="#fed7aa" />
                      <path d="M -4,5 Q 0,2 4,5 Q 6,5 7,6 L 4,7 Z" fill="#b45309" />
                      <line x1="-2" y1="26" x2="-3" y2="36" stroke="#1f2937" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="2" y1="26" x2="3" y2="36" stroke="#1f2937" strokeWidth="2.2" strokeLinecap="round" />
                    </g>

                    <g transform="translate(88, 144)">
                      <ellipse cx="0" cy="18" rx="5" ry="9" fill="#0284c7" />
                      <rect x="3" y="11" width="4" height="9" rx="1.5" fill="#d97706" />
                      <circle cx="0" cy="6" r="4.5" fill="#fed7aa" />
                      <path d="M -4,5 Q 0,1 4,5 Q 5,7 4,8 L -4,8 Z" fill="#451a03" />
                      <line x1="4" y1="14" x2="13" y2="9" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" />
                      <line x1="-2" y1="26" x2="-2" y2="36" stroke="#1f2937" strokeWidth="2.2" strokeLinecap="round" />
                      <line x1="2" y1="26" x2="4" y2="35" stroke="#1f2937" strokeWidth="2.2" strokeLinecap="round" />
                    </g>

                    {/* Soaring White Paper Airplane */}
                    <g transform="translate(48, 56) rotate(-12)">
                      <path d="M 0,0 L 20,6 L 0,12 L 4,6 Z" fill="#ffffff" opacity="0.95" />
                      <path d="M 4,6 L 20,6" stroke="#cbd5e1" strokeWidth="0.8" />
                    </g>
                    <path
                      d="M 18,88 Q 28,72 45,62"
                      fill="none"
                      stroke="#fef08a"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                  </svg>
                )}
              </div>

              {/* Polaroid Caption */}
              <div className="mt-4 text-center">
                <p className="font-handwritten text-xl font-bold text-[#382618]">
                  {userPhoto === DEFAULT_FIKRI_PHOTO
                    ? 'Fikri di Puncak Tandikek'
                    : 'Temen Masa Kecil'}
                </p>
                <p className="text-[11px] font-mono text-[#786a5b] tracking-wider mt-0.5">
                  {userPhoto === DEFAULT_FIKRI_PHOTO
                    ? '2438 MDPL · Jejak Nyata Pendakian'
                    : 'Dari Zaman SD Menuju Puncak'}
                </p>
              </div>
            </div>

            {/* Custom Photo Upload & Reset Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#132c20] hover:bg-[#1b3d2c] border border-[#2d5740] text-emerald-300 text-xs font-mono transition-colors shadow-sm"
              >
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload Foto Lain</span>
              </button>

              {userPhoto !== DEFAULT_FIKRI_PHOTO && (
                <button
                  type="button"
                  onClick={() => setUserPhoto(DEFAULT_FIKRI_PHOTO)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#1a1f1d] hover:bg-[#28322e] border border-[#35453e] text-amber-300 text-xs font-mono transition-colors"
                  title="Gunakan Foto Puncak Tandikek"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Foto Tandikek</span>
                </button>
              )}

              {userPhoto && (
                <button
                  type="button"
                  onClick={() => setUserPhoto(null)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#1a1f1d] hover:bg-[#28322e] border border-[#35453e] text-[#a9beb2] text-xs font-mono transition-colors"
                  title="Kembalikan ke ilustrasi temen masa kecil"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Ilustrasi</span>
                </button>
              )}
            </div>

            <p className="text-xs font-mono text-[#8b9e93] mt-2 flex items-center gap-1.5 text-center">
              <span>🍃</span>
              <span>Langkah pertama selalu bermula dari sini</span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ================= PAGE 3 — CHAPTER 02 (KEEP GOING) =================
  if (currentStep === 'CHAPTER_02') {
    return (
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Visual Ridge / Footsteps Track */}
          <div className="md:col-span-5 order-2 md:order-1 flex flex-col items-center">
            <div className="w-full max-w-xs p-5 rounded-2xl bg-[#0f2118]/80 border border-[#234533] shadow-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Footprints className="w-3.5 h-3.5 text-amber-400" />
                  <span>JALUR MENANJAK</span>
                </span>
                <span className="text-amber-400 font-bold">1,680 mdpl</span>
              </div>

              {/* Interactive trail path with footsteps */}
              <div className="relative h-64 bg-[#091510] rounded-xl border border-[#1b3628] p-4 flex flex-col justify-between overflow-hidden">
                {/* Slanted trail line */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <line x1="20%" y1="90%" x2="80%" y2="10%" stroke="#4ade80" strokeWidth="3" strokeDasharray="6 4" />
                  </svg>
                </div>

                {/* Footstep checkpoints */}
                {[
                  { pos: 4, label: 'Puncak Semakin Dekat', elev: '1,680m', reached: climbingProgress >= 4 },
                  { pos: 3, label: 'Melewati Ragu & Lelah', elev: '1,420m', reached: climbingProgress >= 3 },
                  { pos: 2, label: 'Terus Melangkah Maju', elev: '1,150m', reached: climbingProgress >= 2 },
                  { pos: 1, label: 'Tanjakan Berbatu Dimulai', elev: '950m', reached: climbingProgress >= 1 },
                ].map((step) => (
                  <button
                    key={`step-${step.pos}`}
                    onClick={() => setClimbingProgress(step.pos)}
                    className={`relative z-10 flex items-center justify-between p-2 rounded-lg text-xs font-mono transition-all text-left ${
                      step.reached
                        ? 'bg-[#183929] border border-emerald-500/50 text-[#f5f2eb]'
                        : 'bg-[#0f1f17]/50 border border-[#1c3527] text-[#6d7f75]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          step.reached ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-[#294234]'
                        }`}
                      />
                      <span>{step.label}</span>
                    </div>
                    <span className="text-[10px] text-amber-300">{step.elev}</span>
                  </button>
                ))}
              </div>

              <div className="text-center text-[11px] text-[#93a69b]">
                <span className="italic">&ldquo;Setiap tapak kaki membuktikan kamu tidak menyerah.&rdquo;</span>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="md:col-span-7 order-1 md:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 font-semibold uppercase">
                02 — KEEP GOING
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f4eee3] leading-snug">
                &ldquo;You kept going, even when you weren't sure of yourself.&rdquo;
              </h2>
            </div>

            <div className="space-y-4 text-[#d5cbba] text-base sm:text-lg leading-relaxed font-light">
              <p className="p-4 rounded-xl bg-[#11231a]/80 border border-[#234332] shadow-sm">
                Aku tahu dulu kamu pernah merasa kurang percaya diri sama diri kamu sendiri.
              </p>
              <p className="p-4 rounded-xl bg-[#11231a]/80 border border-[#234332] shadow-sm">
                Mungkin ada masa ketika semuanya terasa nggak mudah dan kamu sempat merasa ingin menyerah.
              </p>
              <p className="p-4 rounded-xl bg-[#11231a]/80 border border-[#234332] shadow-sm">
                Tapi kamu tetap melanjutkan perjalananmu.
              </p>
              <p className="p-4 rounded-xl bg-[#183827] border border-[#35664b] text-[#f7f2ea] font-normal shadow-sm">
                Dan menurutku, itu sendiri sudah menjadi sesuatu yang patut kamu banggakan.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onNext}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-[#1a382a] hover:bg-[#234a38] text-[#f7f2ea] text-sm font-semibold tracking-wide border border-[#37664f] shadow-md transition-all hover:translate-x-1"
              >
                <span>KEEP CLIMBING</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ================= PAGE 4 — CHAPTER 03 (LOOK AT YOU NOW) =================
  if (currentStep === 'CHAPTER_03') {
    const reflectionCards = [
      {
        title: 'Growing',
        desc: 'Dari yang dulu lebih pendiam dan pemalu, sekarang berani melangkah menghadapi dunia luas.',
        icon: Sparkles,
      },
      {
        title: 'Learning',
        desc: 'Berproses tekun di Teknik Informatika hingga membuktikan dedikasi luar biasa dengan IP 4.00.',
        icon: Award,
      },
      {
        title: 'Connecting',
        desc: 'Menemukan circle & lingkungan pertemanan positif yang benar-benar menghargai dirimu apa adanya.',
        icon: HeartHandshake,
      },
      {
        title: 'Becoming',
        desc: 'Menjadi Fikri yang punya cerita, menikmati setiap pendakian, dan bangga pada jalannya sendiri.',
        icon: Layers,
      },
    ];

    return (
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-24 max-w-5xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono tracking-[0.25em] text-emerald-400 font-semibold uppercase">
              03 — LOOK AT YOU NOW
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#f4eee3] leading-snug">
              &ldquo;Look how far you've come.&rdquo;
            </h2>
          </div>

          {/* Academic & Growth Centerpiece: IP 4.00 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#132c21] to-[#0c1c15] border border-[#2e5942] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Counter Highlight */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-[#091610]/90 border border-[#214332] text-center">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>TEKNIK INFORMATIKA</span>
                </div>

                <div className="my-2">
                  <div className="text-5xl sm:text-6xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                    IP {gpaCounter.toFixed(2)}
                  </div>
                  <div className="text-xs font-mono text-amber-300/80 tracking-wider mt-1">
                    PERFECT SCORE · PRESTASI MEMBANGGAKAN
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#9eb6a8]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hasil kerja keras & ketekunanmu</span>
                </div>
              </div>

              {/* Sincere Words */}
              <div className="md:col-span-7 space-y-3.5 text-[#d5cbba] text-base leading-relaxed font-light">
                <p>
                  Dan sekarang lihat kamu. Kamu sudah kuliah di <strong className="text-emerald-300 font-medium">Teknik Informatika</strong>. Kamu bahkan bisa mencapai <strong className="text-amber-300 font-medium">IP 4</strong>.
                </p>
                <p>
                  Yang paling aku senang bukan cuma soal nilainya, tapi karena kamu sekarang menemukan lingkungan yang membuat kamu merasa dihargai.
                </p>
                <p>
                  Kamu yang dulu lebih pendiam dan introvert, sekarang mulai bisa bergaul, punya lingkungan, punya cerita, dan menikmati perjalananmu sendiri.
                </p>
                <p className="text-amber-200 font-normal italic">
                  &ldquo;Aku senang banget dengarnya.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* 4 Reflection Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {reflectionCards.map((card, idx) => {
              const Icon = card.icon;
              const isSelected = activeTabCard === idx;
              return (
                <button
                  key={card.title}
                  onClick={() => setActiveTabCard(idx)}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    isSelected
                      ? 'bg-[#183a2a] border-emerald-400/80 shadow-md transform -translate-y-1'
                      : 'bg-[#102219]/80 border-[#223f30] hover:bg-[#14291f]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-[#224734] flex items-center justify-center text-amber-300">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-sm text-[#f4efe5]">
                      {card.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#a9beb2] line-clamp-3 leading-relaxed">
                    {card.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <div className="text-center pt-2">
            <button
              onClick={onNext}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#214a36] to-[#2c6146] hover:from-[#2a5d44] hover:to-[#387856] text-[#f7f2ea] text-sm font-semibold tracking-wide border border-[#44785b] shadow-lg transition-all"
            >
              <span>ONE MORE STEP</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ================= PAGE 5 — CHAPTER 04 (FROM AN OLD FRIEND) =================
  if (currentStep === 'CHAPTER_04') {
    return (
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-24 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Campsite Atmosphere Header */}
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#352026]/80 border border-[#6b3844] text-rose-300 text-xs font-mono">
              <Tent className="w-3.5 h-3.5 text-amber-400" />
              <span>Campsite di Atas Awan · Matahari Senja</span>
            </div>
            <h2 className="text-xs font-mono tracking-[0.25em] text-amber-400 font-semibold uppercase">
              04 — FROM AN OLD FRIEND
            </h2>
          </div>

          {/* Sincere Letter Container */}
          <div className="p-6 sm:p-10 rounded-2xl bg-[#111e18]/90 border border-[#2b4b39] backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.6)] space-y-6">
            <div className="space-y-4 text-[#ded5c7] text-base sm:text-lg leading-relaxed font-light">
              <p>Aku mungkin cuma temen masa kecilmu.</p>
              <p>
                Tapi aku benar-benar senang melihat kamu tumbuh sejauh ini.
              </p>
              <p>
                Melihat kamu menemukan hal-hal yang bikin kamu senang, menemukan orang-orang yang menghargai kamu, dan mulai lebih percaya sama diri kamu sendiri.
              </p>
              <p>
                Jadi kalau suatu hari kamu merasa perjalananmu berat lagi, semoga kamu ingat kalau kamu sudah pernah melewati banyak hal sampai sejauh ini.
              </p>
              <div className="p-4 rounded-xl bg-[#192f23] border border-[#335d45] text-[#f7f3ec] font-normal space-y-1">
                <p>Jangan terlalu keras sama diri sendiri.</p>
                <p>Pelan-pelan aja.</p>
                <p className="font-semibold text-amber-300">Yang penting tetap jalan.</p>
              </div>
            </div>

            {/* Standout Big Quote */}
            <div className="py-6 text-center border-y border-[#264333]">
              <blockquote className="font-mountain text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 tracking-wider">
                &ldquo;You have already come so far.&rdquo;
              </blockquote>
            </div>

            {/* Footer button */}
            <div className="text-center pt-2">
              <button
                onClick={onNext}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#2a5940] to-[#387555] hover:from-[#31694b] hover:to-[#438a64] text-[#f7f2ea] text-sm font-semibold tracking-wide border border-[#528d6c] shadow-[0_10px_30px_rgba(26,68,46,0.6)] transition-all hover:scale-[1.02]"
              >
                <span>REACH THE SUMMIT</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ================= PAGE 6 — TRANSITION TO CAKE (SUMMIT ARRIVAL) =================
  if (currentStep === 'TRANSITION_SUMMIT') {
    return (
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center max-w-3xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          {/* Summit reached trophy icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1b3b2b] to-[#34664c] border-2 border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.3)]">
            <span className="text-4xl">🏔️</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-mountain tracking-wider text-[#fcf8f2] drop-shadow-lg">
              YOU MADE IT.
            </h1>

            <div className="space-y-2 text-base sm:text-xl text-[#dcd4c5] font-light max-w-xl mx-auto">
              <p>Tapi perjalanan ini belum selesai.</p>
              <p className="text-[#a4b8ab]">Karena sekarang...</p>
              <p className="font-mountain text-xl sm:text-2xl text-amber-300 font-bold tracking-wide pt-2">
                IT'S TIME TO BUILD YOUR BIRTHDAY CAKE.
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4">
            <button
              onClick={onNext}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-[#1f1609] font-bold tracking-wider shadow-[0_12px_35px_rgba(245,158,11,0.4)] hover:shadow-[0_16px_45px_rgba(245,158,11,0.6)] transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="text-sm sm:text-base">BUILD MY CAKE 🎂</span>
              <ArrowRight className="w-5 h-5 text-[#1f1609] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return null;
};
