/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppStep, CakeConfig } from './types';
import { MountainScenery } from './components/MountainScenery';
import { NavigationHeader } from './components/NavigationHeader';
import { StoryChapters } from './components/StoryChapters';
import { CakeWorkshop } from './components/CakeWorkshop';
import { CakeReveal } from './components/CakeReveal';
import { FinalMessage } from './components/FinalMessage';
import { audioEngine } from './utils/audio';

const STEP_SEQUENCE: AppStep[] = [
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

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('OPENING');
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);

  // Persistent Cake Configuration state
  const [cakeConfig, setCakeConfig] = useState<CakeConfig>({
    tiers: 2,
    color: 'forest',
    style: 'mountain',
    candles: 10,
    text: 'HAPPY BIRTHDAY, FIKRI',
    font: 'mountain',
    isLit: false,
    isBlownOut: false,
    isRotating: false,
  });

  const updateCakeConfig = (changes: Partial<CakeConfig>) => {
    setCakeConfig((prev) => ({ ...prev, ...changes }));
  };

  const handleNavigate = (nextStep: AppStep) => {
    setCurrentStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    const currentIndex = STEP_SEQUENCE.indexOf(currentStep);
    if (currentIndex < STEP_SEQUENCE.length - 1) {
      handleNavigate(STEP_SEQUENCE[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = STEP_SEQUENCE.indexOf(currentStep);
    if (currentIndex > 0) {
      handleNavigate(STEP_SEQUENCE[currentIndex - 1]);
    }
  };

  const handleToggleAudio = () => {
    const newState = audioEngine.toggleMute();
    setAudioPlaying(newState);
  };

  const handleLightCandles = () => {
    handleNavigate('CAKE_REVEAL');
  };

  const handleRestart = () => {
    setCakeConfig((prev) => ({
      ...prev,
      isLit: false,
      isBlownOut: false,
      isRotating: false,
    }));
    handleNavigate('OPENING');
  };

  return (
    <main className="relative min-h-screen bg-[#0b1310] text-[#f4efe6] overflow-x-hidden">
      {/* Dynamic Mountain Background & Celestial Backdrop */}
      <MountainScenery currentStep={currentStep} />

      {/* Expedition Header & Navigation Progress Bar */}
      <NavigationHeader
        currentStep={currentStep}
        onNavigate={handleNavigate}
        audioPlaying={audioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Journey Content Router */}
      <div className="relative z-10">
        {/* Chapters 1 to 5: Story & Summit arrival */}
        {(currentStep === 'OPENING' ||
          currentStep === 'CHAPTER_01' ||
          currentStep === 'CHAPTER_02' ||
          currentStep === 'CHAPTER_03' ||
          currentStep === 'CHAPTER_04' ||
          currentStep === 'TRANSITION_SUMMIT') && (
          <StoryChapters
            currentStep={currentStep}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}

        {/* Chapters 7 to 9: Cake Creator, Customization, and Review */}
        {(currentStep === 'CAKE_CREATOR' ||
          currentStep === 'CAKE_CUSTOMIZE' ||
          currentStep === 'CAKE_PREVIEW') && (
          <CakeWorkshop
            currentStep={currentStep}
            config={cakeConfig}
            onUpdateConfig={updateCakeConfig}
            onNext={handleNext}
            onPrev={handlePrev}
            onLightCandles={handleLightCandles}
          />
        )}

        {/* Chapter 10: Cinematic Cake Reveal with sequential candles & confetti */}
        {currentStep === 'CAKE_REVEAL' && (
          <CakeReveal
            config={cakeConfig}
            onUpdateConfig={updateCakeConfig}
            onNext={handleNext}
          />
        )}

        {/* Chapters 11 & 12: Final Message & Ending Golden Sunrise */}
        {(currentStep === 'FINAL_MESSAGE' || currentStep === 'ENDING_SUNRISE') && (
          <FinalMessage
            currentStep={currentStep}
            onNext={handleNext}
            onRestart={handleRestart}
          />
        )}
      </div>
    </main>
  );
}
