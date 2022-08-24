const { colorPrefix } = require('../utils')

const onInteractive = colorPrefix('on', {
  interactive: '#FFF',
  primary: '#FFF',
  critical: '#fff',
})

module.exports = {
  // COMMON
  'dark-divider': '#333',

  // BASE
  ...colorPrefix('dark-base', {
    surface: '#F0F0F0',
    'on-surface': '#111213',
    primary: '#267DFF',
    secondary: '#CCC',
    interactive: '#2E72D2',
    critical: '#D82C0D',
    warning: '#FFC453',
    success: '#008060',
    highlight: '#5BCDDA',
  }),

  // BACKGROUND
  ...colorPrefix('dark-background', {
    default: '#181818',
    hovered: '#F1F2F3',
    pressed: '#EDEEEF',
    selected: '#EDEEEF',
  }),

  // SURFACE
  ...colorPrefix('dark-surface', {
    default: '#222',
    subdued: '#FAFBFB',
    hovered: '#F6F6F7',
    pressed: '#F1F2F3',
    depressed: '#EDEEEF',
    disabled: '#FAFBFB',

    //   color-surface-selected-*
    ...colorPrefix('selected', {
      default: '#F2F7FE',
      hovered: '#EDF4FE',
      pressed: '#E5EFFD',
    }),

    ...colorPrefix('warning', {
      default: '#FFD79D',
      subdued: '#FFF5EA',
      'subdued-hover': '#FFF2E2',
      'subdued-pressed': '#FFEBD3',
    }),

    ...colorPrefix('critical', {
      default: '#FED3D1',
      subdued: '#FFF4F4',
      'subdued-hovered': '#FFF0F0',
      'subdued-pressed': '#FFE9E8',
      'subdued-depressed': '#FEBCB9',
    }),

    ...colorPrefix('success', {
      default: '#AEE9D1',
      subdued: '#F1F8F5',
      'subdued-hovered': '#ECF6F1',
      'subdued-pressed': '#E2F1EA',
    }),

    ...colorPrefix('highlight', {
      default: '#A4E8F2',
      subdued: '#EBF9FC',
      'subdued-hovered': '#E4F7FA',
      'subdued-pressed': '#D5F3F8',
    }),

    ...colorPrefix('neutral', {
      default: '#E4E5E7',
      subdued: '#F6F6F7',
      'subdued-hovered': '#DBDDDF',
      'subdued-pressed': '#C9CCD0',
      disabled: '#F1F2F3',
    }),

    ...colorPrefix('primary', {
      default: '#F1F8F5',
      hovered: '#B3D0C3',
      pressed: '#A2BCB0',
    }),
  }),

  // TEXT
  ...colorPrefix('dark-text', {
    default: '#fff',
    subdued: '#6D7175',
    disabled: '#8C9196',
    critical: '#D72C0D',
    warning: '#916A00',
    success: '#008060',
    highlight: '#347C84',

    ...onInteractive,
  }),

  // ICON
  ...colorPrefix('dark-icon', {
    default: '#5C5F62',
    subdued: '#8C9196',
    hovered: '#1A1C1D',
    pressed: '#44474A',
    disabled: '#BABEC3',
    critical: '#D72C0D',
    warning: '#B98900',
    success: '#007F5F',
    highlight: '#00A0AC',

    ...onInteractive,
  }),

  // INTERACTIVE
  ...colorPrefix('dark-interactive', {
    default: '#2C6ECB',
    hovered: '#1F5199',
    depressed: '#103262',
    disabled: '#BDC1CC',

    ...colorPrefix('critical', {
      '': '#D82C0D',
      hovered: '#CD290C',
      depressed: '#670F03',
      disabled: '#FD938D',
    }),
  }),

  // BORDER
  ...colorPrefix('dark-border', {
    default: '#1d1e1f',
    subdued: '#C9CCCF',
    hovered: '#999EA4',
    depressed: '#575959',
    disabled: '#D2D5D8',

    ...colorPrefix('critical', {
      default: '#FD5749',
      subdued: '#E0B3B2',
      disabled: '#FFA7A3',
    }),

    ...colorPrefix('success', {
      default: '#00A47C',
      subdued: '#95C9B4',
    }),

    ...colorPrefix('highlight', {
      default: '#449DA7',
      subdued: '#98C6CD',
    }),
  }),

  // FOCUSED
  ...colorPrefix('dark-focused', {
    default: '#458FFF',
  }),

  // ACTION
  ...colorPrefix('dark-action', {
    ...colorPrefix('primary', {
      default: '#267DFF',
      hovered: '#1D70ED',
      pressed: '#1D70ED',
      depressed: '#0451C4',
      disabled: '#F1F1F1',
    }),

    ...colorPrefix('critical', {
      default: '#D82C0D',
      hovered: '#BC2200',
      pressed: '#A21B00',
      depressed: '#6C0F00',
      disabled: '#F1F1F1',
    }),

    ...colorPrefix('secondary', {
      default: '#FFF',
      hovered: '#F6F6F7',
      pressed: '#F1F2F3',
      depressed: '#6D7175',
      disabled: '#FFF',
    }),
  }),

  // DECORATIVE
  ...colorPrefix('dark-decorative', {
    ...colorPrefix('surface', {
      one: '#FFC96B',
      two: '#FFC4B0',
      three: '#92E6B5',
      four: '#91E0D6',
      five: '#FDC9D0',
    }),

    ...colorPrefix('icon', {
      one: '#7E5700',
      two: '#AF294E',
      three: '#006D41',
      four: '#006A68',
      five: '#AE2B4C',
    }),

    ...colorPrefix('text', {
      one: '#3D2800',
      two: '#490B1C',
      three: '#002F19',
      four: '#002D2D',
      five: '#4F0E1F',
    }),
  }),

  // OTHER COLOR SCHEME RANDOMLY FOUND
  ...colorPrefix('dark-sky', {
    light: '#F4F6F8',
  }),
}
