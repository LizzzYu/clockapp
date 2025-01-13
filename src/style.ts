import { CSSObject } from '@emotion/react';
import '@fontsource/ibm-plex-mono';
import '@fontsource-variable/figtree';
import { Variants } from 'framer-motion';
import { breakpoints } from './constants/breakpoints.const';
import { defaultMotionAnimation } from './styles/theme.const';

/**
 * Enum for application color names.
 * Provides a consistent way to reference colors in the app.
 */
export enum AppColor {
  White = 'white',
  Black = 'black',
  Red = 'red',
  SecondaryBlack = 'secondaryBlack',
  Transparent = 'transparent',
  Raspberry = 'raspberry',
  LightRaspberry = 'lightRaspberry',
  DarkRaspberry = 'darkRaspberry',
  Green = 'green',
  LightGreen = 'lightGreen',
  Grey = 'grey',
  LightBrey = 'lightGrey',
  DarkGrey = 'darkGrey',
  LeaderYellow = 'leaderYellow',
  BrightBlueberry = 'brightBlueberry',
}

/**
 * Object containing hex values for application colors.
 * Maps color names (defined in AppColor) to their respective hex codes.
 */
const colors: AppColors = {
  white: '#ffffff',
  black: '#000000',
  red: '#FF0000',
  secondaryBlack: '#333',
  transparent: 'transparent',
  raspberry: '#D81E5B',
  lightRaspberry: '#E04B7C',
  darkRaspberry: '#7d1135',
  green: '#014122',
  lightGreen: '#78BE43',
  grey: '	#BEBEBE',
  lightGrey: '#CCCCCC',
  darkGrey: '#5B5B5B',
  leaderYellow: '#EACA24',
  brightBlueberry: '#0C8AD6',
};

/**
 * Type definition for the AppColors object.
 * Ensures all keys are valid AppColor values, and all values are strings (hex codes).
 */
export type AppColors = {
  [name in AppColor]: string;
};

/**
 * Global styles applied to the entire application.
 * Sets default styles for the `html`, `body`, and `#reactroot` elements.
 */
export const globalStyle: CSSObject = {
  html: {
    backgroundColor: colors.black,
  },
  body: {
    backgroundColor: colors.black,
    color: colors.white,
    fontFamily: `'Figtree Variable', 'IBM Plex Mono', monospace`,
    margin: 0,
    boxSizing: 'border-box',
    padding: `calc(env(safe-area-inset-top, 0px)) calc(env(safe-area-inset-right, 0px)) 
              calc(env(safe-area-inset-bottom, 0px)) calc(env(safe-area-inset-left, 0px))`,
  },
  '#reactroot': {
    display: 'flex',
    minHeight: '100dvh',
  },
};

// Quick replacement of mui's theme.spacing() function
// Specify CSS measurements in .5x or 1x multiples of 8px units
type SpacingFunc = (...n: number[]) => string;
const spacing: SpacingFunc = (...n) => n.map((n) => `${n * 8}px`).join(' ');

/**
 * Media query function generator.
 * Creates media query strings based on breakpoints and type (min or max width).
 * Example: mediaQuery('Desktop') => "@media (min-width: 1024px)"
 */
type MediaQueryFunc = (breakpoint: keyof typeof breakpoints) => string;
const mediaQuery: MediaQueryFunc = (breakpoint, type = 'min') =>
  `@media (${type}-width: ${breakpoints[breakpoint]})`;

/**
 * Common CSS mixins for frequently used styles.
 * Example: `flexCenter` centers content using flexbox.
 */
const mixins = {
  flexCenter: `
		display: flex;
		justify-content: center;
		align-items: center;
	`,
} as CSSObject;

/**
 * Interface defining the structure of the application's theme object.
 * Includes colors, spacing, animations, breakpoints, media queries, and mixins.
 */
export interface AppTheme {
  colors: AppColors; // Application color palette
  spacing: SpacingFunc; // Function for generating consistent spacing
  defaultMotionAnimation: Variants; // Default animation variants for Framer Motion
  breakpoints: typeof breakpoints; // Responsive breakpoints for the app
  mediaQuery: MediaQueryFunc; // Function for creating media queries
  mixins: typeof mixins; // Predefined reusable CSS mixins
}

/**
 * The default theme object for the application.
 * Provides centralized styling and configuration for components.
 */
export const defaultTheme: AppTheme = {
  colors,
  spacing,
  defaultMotionAnimation,
  breakpoints,
  mediaQuery,
  mixins,
};
