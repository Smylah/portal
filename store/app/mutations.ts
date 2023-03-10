import { MutationTree } from 'vuex'
import { AppState } from './state'
import { oneFrame, setClientOs, sleep } from '~/utils'
import { RouteDialog, ThemeIs } from '~/types'

const mutation: MutationTree<AppState> = {
  setTheme(state, theme: ThemeIs) {
    if (!/^(?:light|dark)$/.test(theme)) {
      throw new Error('Invalid theme!')
    }

    state.theme.is = theme

    if (theme === 'dark') {
      state.theme.light = false
      state.theme.dark = true
    } else {
      state.theme.dark = false
      state.theme.light = true
    }

    const previousTheme = theme === 'light' ? 'dark' : 'light'

    document.documentElement.classList.add(previousTheme)

    document.documentElement.classList.replace(previousTheme, theme)
  },

  setAllowMobileView(state, val: boolean) {
    state.allowMobileView = val
  },

  mountApp(state) {
    state.mounted = true

    document.dispatchEvent(
      new Event('app-mounted', {
        cancelable: false,
      })
    )
  },

  addToDialogs(state, id: string) {
    state.dialogs = Array.from(new Set([...state.dialogs, id]))
    //   .filter((id) => {
    //   if (/^(?:dialog-|flip-)/.test(id)) {
    //     return true
    //   }

    //   const rootEl = document.getElementById(id) as Record<string, any>

    //   if (rootEl && rootEl.__vue__) {
    //     if (!('payload' in rootEl.__vue__)) {
    //       return true
    //     }

    //     return rootEl.__vue__.payload.active
    //   }

    //   return false
    // })
  },

  removeFromDialogs(state, id: string) {
    state.dialogs = state.dialogs.filter((x) => x !== id)
    // .filter((id) => {
    //   if (/^(?:dialog-|flip-)/.test(id)) {
    //     return true
    //   }

    //   const rootEl = document.getElementById(id) as Record<string, any>

    //   if (rootEl && rootEl.__vue__) {
    //     if (!('payload' in rootEl.__vue__)) {
    //       return true
    //     }

    //     return rootEl.__vue__.payload.active
    //   }
    //   return false
    // })
  },

  setRouteDialog(state, name: RouteDialog) {
    state.routeDialog = name
  },

  fullscreenLoadingMessage(state, message: string) {
    state.fullscreenLoadingMessage = message
  },

  updateAlertDialog(state, payload: AppState['alertDialog']) {
    state.alertDialog = {
      ...state.alertDialog,
      ...payload,
    }
  },

  updateGlobalKey(state) {
    state.globalKey += 1

    sleep(oneFrame).then(setClientOs)
  },
}

export default mutation
