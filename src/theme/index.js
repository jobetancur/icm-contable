import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import createTheme from '@mui/material/styles/createTheme';
import merge from 'lodash.merge'; // THEME SHADOWS LIST

import shadows from './shadows'; // MUI COMPONENTS OVERRIDE

import componentsOverride from './components'; // LIGHT & DARK THEME OPTIONS

import themesOptions from './themeOptions';
import { THEMES } from '@/utils/constants'; // FONT VARIANTS

import '@fontsource/comfortaa/400.css';
import '@fontsource/comfortaa/500.css';
import '@fontsource/comfortaa/600.css';
import '@fontsource/comfortaa/700.css';
const baseOptions = {
  direction: 'ltr',
  typography: {
    fontFamily: "'Comfortaa', sans-serif"
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
}; // ==============================================================

// ==============================================================
export const createCustomTheme = settings => {
  /**
   * settings.theme value is 'light' or 'dark'
   * update settings in contexts/settingsContext.tsx
   */
  let themeOptions = themesOptions[settings.theme];

  if (!themeOptions) {
    themeOptions = themesOptions[THEMES.LIGHT];
  }

  const mergedThemeOptions = merge({}, baseOptions, themeOptions, {
    direction: settings.direction
  });
  let theme = createTheme(mergedThemeOptions); // OVERRIDE SHADOWS

  theme.shadows = shadows(theme); // OVERRIDE COMPONENTS

  theme.components = componentsOverride(theme);

  if (settings.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};