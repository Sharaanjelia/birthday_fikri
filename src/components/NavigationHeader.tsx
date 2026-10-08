import React from 'react';
import { AppStep } from '../types';
import { audioEngine } from '../utils/audio';
import { Volume2, VolumeX, ArrowLeft, ArrowRight, Compass, Mountain } from 'lucide-react';

interface NavigationHeaderProps {
  currentStep: AppStep;
  onNavigate: (step: AppStep) => void;
  audioPlaying: boolean;
  onToggleAudio: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentStep,
  onNavigate,
  audioPlaying,
  onToggleAudio,
}) => {
  // Step definitions order
  const stepOrder: AppStep[] = [
    'OPENING',
    'CHAPTER_01',
    'CHAPTER_02',
    'CHAPTER_03',
    'CHAPTER_04',
    'TRANSITION_SUMMIT',
    'CAKE_CREATOR',
    'CAKE_CUSTOMIZE',
    'CAKE_PREVIEW',
    'CAKE_REVEAL',
    'FINAL_MESSAGE',
    'ENDING_SUNRISE',
  ];

  const currentIndex = stepOrder.indexOf(currentStep);

  // Elevation and Stage Info
  const getElevationInfo = () => {
    switch (currentStep) {
      case 'OPENING':
        return { stage: 'BASECAMP', alt: '0 mdpl', progress: '00 / 05' };
      case 'CHAPTER_01':
        return { stage: 'LEMBAH AWAL', alt: '850 mdpl', progress: '01 / 05' };
      case 'CHAPTER_02':
        return { stage: 'TANJAKAN CURAM', alt: '1,680 mdpl', progress: '02 / 05' };
      case 'CHAPTER_03':
        return { stage: 'PUNCAK BAYANGAN', alt: '2,420 mdpl', progress: '03 / 05' };
      case 'CHAPTER_04':
        return { stage: 'CAMPSITE SENJA', alt: '2,890 mdpl', progress: '04 / 05' };
      case 'TRANSITION_SUMMIT':
        return { stage: 'THE SUMMIT', alt: '3,142 mdpl', progress: '05 / 05' };
      case 'CAKE_CREATOR':
        return { stage: 'CAKE WORKSHOP', alt: 'Summit Lab', progress: 'CAKE 1/3' };
      case 'CAKE_CUSTOMIZE':
        return { stage: 'WORD ENGRAVER', alt: 'Summit Lab', progress: 'CAKE 2/3' };
      case 'CAKE_PREVIEW':
        return { stage: 'READY TO IGNITE', alt: 'Summit Lab', progress: 'CAKE 3/3' };
      case 'CAKE_REVEAL':
        return { stage: 'THE CELEBRATION', alt: 'Midnight Summit', progress: 'REVEAL' };
      case 'FINAL_MESSAGE':
        return { stage: 'STARLIT SUMMIT', alt: 'Heartfelt Words', progress: 'FINAL' };
      case 'ENDING_SUNRISE':
        return { stage: 'GOLDEN DAWN', alt: 'New Horizon', progress: 'END' };
      default:
        return { stage: 'JOURNEY', alt: '', progress: '' };
    }
  };

  const info = getElevationInfo();

  // Navigation handlers
  const canGoBack = currentIndex > 0;
  const canGoNext = currentIndex < stepOrder.length - 1 && currentStep !== 'CAKE_REVEAL';

  const handlePrev = () => {
    if (canGoBack) {
      onNavigate(stepOrder[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onNavigate(stepOrder[currentIndex + 1]);
    }
  };

  // Hide header in full-screen cinematic reveal to maintain pure focus
  if (currentStep === 'CAKE_REVEAL') {
    return (
      <header className="fixed top-4 right-4 z-50">
        <button
          onClick={onToggleAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 text-white/70 hover:text-white text-xs transition-colors"
          title={audioPlaying ? 'Mute ambient sound' : 'Unmute ambient sound'}
        >
          {audioPlaying ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{audioPlaying ? 'Suara Alam On' : 'Suara Alam Off'}</span>
        </button>
      </header>
    );
  }

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 py-3 bg-[#08110db3] backdrop-blur-md border-b border-[#1f372a]/70">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Expedition Badge & Elevation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('OPENING')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#14291f] border border-[#2d523f] flex items-center justify-center text-amber-400 group-hover:border-amber-400/60 transition-colors">
              <Mountain className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#a89b88] font-bold">
                FIKRI RAHMAN
              </div>
              <div className="text-xs text-[#e5ded2] font-semibold flex items-center gap-1.5">
                <span>{info.stage}</span>
                <span className="text-[#647c6e]">·</span>
                <span className="text-amber-400/90 font-mono text-[11px]">{info.alt}</span>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Stage Progress Marker (e.g. 01 / 05) */}
        <div className="hidden sm:flex items-center gap-3 bg-[#0d1c16]/80 px-3.5 py-1.5 rounded-full border border-[#234232]">
          <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '20s' }} />
          <span className="text-xs font-mono text-[#dcd4c5] tracking-wider font-semibold">
            {info.progress}
          </span>
          {/* Subtle Progress Bar */}
          <div className="w-20 h-1.5 bg-[#172d22] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500"
              style={{
                width: `${((currentIndex) / (stepOrder.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Right: Sound toggle and Quick Nav */}
        <div className="flex items-center gap-2">
          {/* Ambient sound toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
              audioPlaying
                ? 'bg-[#183526] border-emerald-500/60 text-emerald-300'
                : 'bg-[#111f18] border-[#223d30] text-[#a09482] hover:text-[#e4ded4]'
            }`}
            title={audioPlaying ? 'Matikan Suara Alam Pegunungan' : 'Nyalakan Suara Alam Pegunungan'}
          >
            {audioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline font-mono text-[11px]">Breeze On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden md:inline font-mono text-[11px]">Audio</span>
              </>
            )}
          </button>

          {/* Previous step arrow */}
          {canGoBack && (
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-[#111f18] border border-[#223d30] text-[#cfc7b9] hover:text-white hover:bg-[#192f24] transition-colors"
              title="Kembali ke pos sebelumnya"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          {/* Next step arrow */}
          {canGoNext && (
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-[#111f18] border border-[#223d30] text-[#cfc7b9] hover:text-white hover:bg-[#192f24] transition-colors"
              title="Lanjut ke pos berikutnya"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
