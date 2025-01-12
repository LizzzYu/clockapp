import { CSSObject } from '@emotion/react'
import '@fontsource/ibm-plex-mono'
import '@fontsource-variable/figtree';
import { Variants } from 'framer-motion';
import { breakpoints } from './constants/breakpoints.const';
import { defaultMotionAnimation } from './styles/theme.const';

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
}

export type AppColors = {
	[name in AppColor]: string
}

export const globalStyle: CSSObject = {
	'html': {
		backgroundColor: colors.black,
	},
	'body': {
		backgroundColor: colors.black,
		color: colors.white,
		fontFamily: `'Figtree Variable', 'IBM Plex Mono', monospace`,
		padding: 0,
		margin: 0,
		boxSizing: 'border-box',
	},
	'#reactroot': {
		display: 'flex',
		minHeight: '100vh',
	},
}

// Quick replacement of mui's theme.spacing() function
// Specify CSS measurements in .5x or 1x multiples of 8px units
type SpacingFunc = (...n: number[]) => string
const spacing: SpacingFunc = (...n) => n.map(n => `${n * 8}px`).join(' ')



type MediaQueryFunc = (breakpoint: keyof typeof breakpoints) => string;
const mediaQuery: MediaQueryFunc = (breakpoint, type = 'min') =>
  `@media (${type}-width: ${breakpoints[breakpoint]})`;

const mixins = {
	flexCenter: `
		display: flex;
		justify-content: center;
		align-items: center;
	`,
} as CSSObject;

export interface AppTheme {
	colors: AppColors
	spacing: SpacingFunc
	defaultMotionAnimation: Variants
	breakpoints: typeof breakpoints;
  mediaQuery: MediaQueryFunc;
	mixins: typeof mixins;
}

export const defaultTheme: AppTheme = {
	colors,
	spacing,
	defaultMotionAnimation,
	breakpoints,
  mediaQuery,
	mixins
}