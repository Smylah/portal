import { NuxtConfig } from '@nuxt/types'
import { htmlAttrs } from './utils'

const title = 'User testing platform for product teams'

const description =
  'Crowd empowers teams to make confident product, design and marketing decisions from instantly actionable user insights anytime, anywhere.'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Portal',
    title,
    htmlAttrs: {
      lang: htmlAttrs.lang,
    },
    bodyAttrs: {
      class: htmlAttrs.class,
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og-title',
        content: `${title} - Crowd`,
        property: 'og:title',
      },
      {
        hid: 'og-type',
        content: 'article',
        property: 'og:type',
      },
      {
        hid: 'og-image',
        content:
          'https://res.cloudinary.com/crowd-mvp/image/upload/v1661800625/static/png/thumbnail_zwizc69.png',
        property: 'og:image',
      },
      {
        hid: 'og-url',
        content: 'https://crowdapp.io',
        property: 'og:url',
      },
      {
        hid: 'twitter-card',
        content: 'summary_large_image',
        name: 'twitter:card',
      },
      {
        hid: 'og-description',
        content: description,
        property: 'og:description',
      },
      {
        hid: 'og-site_name',
        content: 'Crowd',
        property: 'og:site_name',
      },
      {
        hid: 'twitter-image-alt',
        content: 'Make confident product decisions with user insights',
        property: 'twitter:image:alt',
      },
      {
        hid: 'twitter_site',
        content: '@UseCrowdApp',
        name: 'twitter:site',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://res.cloudinary.com/crowd-mvp/image/upload/v1656851512/static/favicon.png',
      },
      {
        rel: 'preconnect',
        hid: 'google-font-preconnect-1',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        hid: 'google-font-preconnect-2',
        href: 'https://fonts.gstatic.com',
        crossorigin: '',
      },
      // {
      //   rel: 'stylesheet',
      //   hid: 'google-roboto-and-epilogue-font',
      //   href: 'https://fonts.googleapis.com/css2?family=Epilogue:wght@500&family=Roboto&display=swap&family=Mulish&display=swap',
      // },
      {
        rel: 'stylesheet',
        hid: 'google-inter',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@hulkapps/polaris-vue/dist/polaris-vue.min.css',
    '@assets/css/tailwind.css',
    '@assets/css/reset.css',
    '@assets/css/sf-pro-display.css',
    '@assets/css/sf-pro-text.css',
    '@assets/css/utilities.css',
    '@assets/css/variables.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/register-libraries',
    '@/plugins/register-components',
    '@/plugins/fullscreenLoading',
    '@/plugins/breakpoint',
    '@/plugins/init',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',

    // For Vite ⚡
    'nuxt-vite',

    // For tailwind
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: process.env.API_BASE_URL,
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.API_BASE_URL,
      https: true,
      retry: true,
      credentials: true,
      debug: process.env.NODE_ENV === 'development',
      headers: {
        common: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      },
    },
    otherPrefix: process.env.OTHER_CHOICE_PREFIX,
    skipQuestion: process.env.SKIP_QUESTION_VALUE,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // For tailwind
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    // quiet: true
  },

  vite: {
    // build: true,
    // ssr: {
    //   noExternal: ['@lodash'],
    // },
  },

  router: {
    middleware: [],
  },

  loading: '~/components/Base/LoadingBar',

  loadingIndicator: '~/assets/html/loading-indicator.html',

  server: {
    ...(process.env.NODE_ENV === 'production' ? {} : { port: 2222 }),
    host: '0.0.0.0',
  },

  serverMiddleware: [],

  env: {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    GOOGLE_OAUTH_REDIRECT_URL: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },

  extends: ['@nuxtjs/eslint-config-typescript'],

  transition: {},
} as unknown as NuxtConfig
