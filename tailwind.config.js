const plugin = require('tailwindcss/plugin')
const theme = require('./tailwindConfig/theme')

module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './nuxt.config.{js,ts}',
    './store/**/*.ts',
    // './plugins/**/*.{js,ts}',
  ],
  mode: 'jit',
  theme,
  darkMode: 'class',
  //   important: true,
  variants: {
    aspectRatio: ['responsive', 'hover'],
  },

  plugins: [
    plugin(({ addVariant }) => {
      addVariant('can-hover', ['@media (pointer: fine) and (hover: hover)'])
      addVariant('no-hover', ['@media (hover: none) or (pointer: coarse)'])
      addVariant('supports-backdrop-filter', [
        '@supports (backdrop-filter: blur(1px))',
      ])
      addVariant('not-supports-backdrop-filter', [
        '@supports not (backdrop-filter: blur(1px))',
      ])
      addVariant('landscape', '@media (orientation: landscape)')
      addVariant('portrait', '@media (orientation: portrait)')
      addVariant('lock-html-scroll', [':root[data-overlay-active] &'])
      addVariant('windows', [':root[data-os="windows"] &'])
      addVariant('mac', [':root[data-os="mac"] &'])

      addVariant('lock-html-scroll-self', [':root[data-overlay-active]&'])
      addVariant('windows-os-self', [':root[data-os="windows"]&'])
      addVariant('mac-os-self', [':root[data-os="mac"] &'])

      addVariant('pseudo-focus', ['&[data-pseudo-focus=true]'])
      addVariant('fade-enter', ['.fade-transition-enter &'])
      addVariant('fade-enter-active', ['.fade-transition-enter-active &'])
      addVariant('fade-leave-to', ['.fade-transition-leave-to &'])
      addVariant('fade-leave-active', ['.fade-transition-leave-active &'])
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
}
