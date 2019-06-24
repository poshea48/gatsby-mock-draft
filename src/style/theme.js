/**
 * Basic theme
 */

const background = {
  default: {
    primary: '#013369',
    secondary1: '#d50a0a',
  },
  ARI: {
    primary: '#97233F',
    secondary1: '#000000',
    secondary2: '#FFB612',
  },
  ATL: {
    primary: '#A71930',
    secondary1: '#A5ACAF',
    secondary2: '#000000',
  },
  BAL: {
    primary: '#241773',
    secondary1: '#9E7C0C',
    secondary2: '#000000',
  },
  BUF: {
    primary: '#00338D',
    secondary1: '#C60c30',
    secondary2: '#000000',
  },
  CAR: {
    primary: '#0085CA',
    secondary1: '#BFC0BF',
    secondary2: '#000000',
  },
  CHI: {
    primary: '#F26522',
    secondary1: '#00142F',
    secondary2: '#000000',
  },
  CIN: {
    primary: '#FB4F14',
    secondary1: '#000000',
    secondary2: '#000000',
  },
  CLE: {
    primary: '#22150C',
    secondary1: '#FB4F14',
    secondary2: '#000000',
  },
  DAL: {
    primary: '#0C264C',
    secondary1: '#B0B7BC',
    secondary2: '#000000',
  },
  DEN: {
    primary: '#002244',
    secondary1: '#FB4F14',
    secondary2: '#000000',
  },
  DET: {
    primary: '#046EB4',
    secondary1: '#B0B7BC',
    secondary2: '#000000',
  },
  GB: {
    primary: '#24423C',
    secondary1: '#FCBE14',
    secondary2: '#000000',
  },
  HOU: {
    primary: '#00143F',
    secondary1: '#C9243F',
    secondary2: '#000000',
  },
  IND: {
    primary: '#003D79',
    secondary1: '#FFFFFF',
    secondary2: '#000000',
  },
  JAX: {
    primary: '#D8A328',
    secondary1: '#136677',
    secondary2: '#9E7A2C',
  },
  KC: {
    primary: '#CA2430',
    secondary1: '#FFB612',
    secondary2: '#000000',
  },
  LAC: {
    primary: '#0A2342',
    secondary1: '#2072BA',
    secondary2: '#FDB515',
  },
  LAR: {
    primary: '#95774C',
    secondary1: '#002147',
    secondary2: '#000000',
  },
  MIA: {
    primary: '#0091A0',
    secondary1: '#FF8500',
    secondary2: '#002760',
  },
  MIN: {
    primary: '#4F2E84',
    secondary1: '#FEC62F',
    secondary2: '#000000',
  },
  NYG: {
    primary: '#192E6C',
    secondary1: '#B20032',
    secondary2: '#000000',
  },
  NYJ: {
    primary: '#203731',
    secondary1: '#FFFFFF',
    secondary2: '#000000',
  },
  NE: {
    primary: '#0A2342',
    secondary1: '#C81F32',
    secondary2: '#B0B7BD',
  },
  NO: {
    primary: '#A08A58',
    secondary1: '#000000',
    secondary2: '#000000',
  },
  OAK: {
    primary: '#C4C9CC',
    secondary1: '#000000',
    secondary2: '#000000',
  },
  PHI: {
    primary: '#014A53',
    secondary1: '#BBC4C9',
    secondary2: '#000000',
  },
  PIT: {
    primary: '#FFC20E',
    secondary1: '#000000',
    secondary2: '#DA2128',
  },

  SF: {
    primary: '#C9243F',
    secondary1: '#C8AA76',
    secondary2: '#000000',
  },
  SEA: {
    primary: '#002A5C',
    secondary1: '#7AC142',
    secondary2: '#B2B7BB',
  },

  TB: {
    primary: '#D40909',
    secondary1: '#B0B9BF',
    secondary2: '#000000',
  },
  TEN: {
    primary: '#4095D1',
    secondary1: '#00295B',
    secondary2: '#DA2128',
  },
  WAS: {
    primary: '#FFC20F',
    secondary1: '#7C1415',
    secondary2: '#000000',
  },
};

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
  background,
  palette,
  typography,
  zIndex,
  color,
  scrollHeight,
  size: size => `${size * baseSize}px`,
};
