import Vue from 'vue'
import { Plugin } from '@nuxt/types'
import { getAlphabetIndex, getOS, oneFrame, setClientOs, sleep } from '~/utils'
import { AppState } from '~/store/app/state'
import { RootState } from '~/store'
import { Theme } from '~/types/shim'

const init: Plugin = function (
  { app, store, $axios, $user, route, $cookies },
  inject
) {
  if (process.client) {
    const answerTestProxy = new Proxy(
      {},
      {
        get(_, path: 'title') {
          if (path === 'title') {
            const app = store.$router.app

            const question = app.$route.params.question

            const qNumber = question.replace('-instruction', '')

            if (question.endsWith('-instruction')) {
              return `Question ${qNumber} instructions`
            }

            const formState = ((app.$store.state as RootState)['answer-test']
              .form[`question-${Number(qNumber.replace(/[a-zA-Z]/, ''))}`] ||
              {}) as Record<string, any>

            const followUpQuestion =
              formState.followUpQuestions?.[
                getAlphabetIndex(qNumber.replace(/\d+/, ''))
              ] || {}

            return `${followUpQuestion.title || 'Answer test'}`
          }

          return undefined
        },
      }
    )

    inject('answerQuestionTitle', answerTestProxy)

    document.body.addEventListener('touchstart', () => {}, { passive: true })

    const themeProxy = new Proxy(store.state.app.theme, {
      get(_, path: keyof Theme) {
        return (store.state as RootState).app.theme[path]
      },
      set(_, path: keyof Theme, val: ('light' | 'dark') | boolean) {
        const newTheme =
          typeof val === 'string'
            ? val
            : path === 'dark' && val
            ? 'dark'
            : 'light'

        if (/^(?:light|dark)$/.test(newTheme)) {
          store.commit('app/setTheme', newTheme)

          $cookies.set('theme', newTheme === 'light' ? '1' : '0')

          return true
        }

        return false
      },
    })

    window.$theme = themeProxy

    inject('theme', themeProxy)

    // const getInitialTheme = () => {
    //   const cookiesTheme = `${$cookies.get('theme') || ''}`

    //   if (cookiesTheme === '1') {
    //     return 'light'
    //   }

    //   if (cookiesTheme === '0') {
    //     return 'dark'
    //   }

    //   // match device theme instead
    //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

    //   if (prefersDark) {
    //     return 'dark'
    //   }

    //   return 'light'
    // }

    // window.$theme.is = getInitialTheme()

    const appStateProxy = new Proxy(
      {},
      {
        get(
          _,
          path: keyof AppState | 'touchdevice' | 'strictTouch' | 'routeKey'
        ) {
          if (path === 'os') {
            return getOS()
          }

          if (path === 'touchdevice' || path === 'strictTouch') {
            const touchdevice = !!(
              'ontouchstart' in window ||
              navigator.maxTouchPoints > 0 ||
              // @ts-expect-error
              navigator.msMaxTouchPoints > 0
            )

            if (path === 'touchdevice') {
              return touchdevice
            }

            const noHoverAndPointer = window.matchMedia(
              '(hover: none) and (pointer: coarse)'
            )

            return touchdevice && noHoverAndPointer.matches
          }

          if (
            /\/(?:answer|preview)-test/.test(route.path) &&
            path === 'routeKey'
          ) {
            return app.router.app.$route.fullPath
              .replace(/\??confirm=1/, '')
              .replace(/\?$/, '')
          }

          if (path === 'isPreview') {
            return !!route.path.startsWith('/preview-test')
          }

          return (store.state as RootState).app[path]
        },
      }
    )

    inject('appState', appStateProxy)

    window.history.scrollRestoration = 'auto'

    // add html id
    document.documentElement.id = 'unbug-qa'

    setClientOs()

    sleep(oneFrame).then(() => {
      // add overlay element

      const overlay = document.createElement('div')

      const id = 'app-overlay'

      overlay.id = id

      document.body.append(overlay)

      const OverlayComponent = Vue.extend({
        name: 'OverlayTargetComponent',
        extends: app,
        render(h) {
          return h('TeleportTarget', {
            key: store.state.app.globalKey,
            props: {
              name: 'overlay',
              multiple: true,
            },
          })
        },
      })

      const overlayEl = new OverlayComponent()

      overlayEl.$mount(`#${id}`)
    })

    Vue.directive('autofocus', {
      inserted(el, binding) {
        const { value } = binding

        if (value === false) {
          return
        }

        const getDelay = () => {
          const frame = (1 / 60) * 1000

          if (typeof value === 'boolean') {
            return 0
          }

          if (typeof value === 'object' && value?.delay) {
            return value.delay
          }

          return Math.max(Number(value || 0) || frame, frame)
        }

        sleep(Number(getDelay())).then(() => {
          el.focus()
        })
      },
    })
  }

  $axios.onResponseError(({ response }) => {
    if (response?.status === 401 && $user.loggedIn) {
      $user.logout(false)
    }
  })
}

export default init
