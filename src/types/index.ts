export type AppStep =
  | 'OPENING'
  | 'CHAPTER_01'
  | 'CHAPTER_02'
  | 'CHAPTER_03'
  | 'CHAPTER_04'
  | 'TRANSITION_SUMMIT'
  | 'CAKE_CREATOR'
  | 'CAKE_CUSTOMIZE'
  | 'CAKE_PREVIEW'
  | 'CAKE_REVEAL'
  | 'FINAL_MESSAGE'
  | 'ENDING_SUNRISE';

export type CakeTierCount = 1 | 2 | 3;

export type CakeColorId =
  | 'cream'
  | 'forest'
  | 'chocolate'
  | 'sky'
  | 'lavender'
  | 'berry';

export type CakeStyleId = 'classic' | 'forest' | 'mountain';

export type CakeFontId =
  | 'classic'
  | 'elegant'
  | 'handwritten'
  | 'playful'
  | 'bold'
  | 'mountain';

export interface CakeConfig {
  tiers: CakeTierCount;
  color: CakeColorId;
  style: CakeStyleId;
  candles: number;
  text: string;
  font: CakeFontId;
  isLit: boolean;
  isBlownOut: boolean;
  isRotating: boolean;
}

export interface ColorOption {
  id: CakeColorId;
  name: string;
  sub: string;
  frosting: string;
  shadow: string;
  drip: string;
  accent: string;
  textContrast: string;
  swatch: string;
}

export interface StyleOption {
  id: CakeStyleId;
  name: string;
  desc: string;
  iconName: string;
}

export interface FontOption {
  id: CakeFontId;
  name: string;
  cssClass: string;
  sample: string;
}
