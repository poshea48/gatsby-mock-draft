/**
 * Basic theme
 */

const palette = {
  primary: {
    contrast: 'white',
    main: '#767676',
  },
  secondary: {
    contrast: '#aaa',
    main: '#242424',
    dark: '#181818',
  },
};

const scrollHeight = {
  compact: '210px',
  mid: '380px',
  reg: '450px',
};

const color = {
  primary: '#2185d0',
  navigation: '#2F4F4F',
  secondary: '#f9fafb',
  auth: '#54c8ff',
  blueSteal: '#B0C4DE',
};
const baseSize = 16;

const typography = {
  baseFontSize: `${baseSize}px`,
};

const zIndex = {
  header: 10,
  overlay: 15,
  drawer: 20,
  headerText: 25,
};

export default {
  palette,
  typography,
  zIndex,
  color,
  scrollHeight,
  size: size => `${size * baseSize}px`,
};
