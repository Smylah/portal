import { RouteDialog, ThemeIs } from '~/types'

export interface AppState {
  mounted: boolean
  globalKey: number
  dialogs: string[]
  fullscreenLoadingMessage: null | string
  routeDialog: RouteDialog
  allowMobileView: boolean
  alertDialog: {
    id: string
    key: string
    active: boolean
    title: string
    subtitle: string
    actions: {
      label: string
      attrs?: Record<string, any>
      events?: Record<string, any>
    }[]
  }
  theme: {
    is: ThemeIs
    dark: boolean
    light: boolean
  }
  os?: string
  isPreview?: boolean
}

export default function state(): AppState {
  return {
    mounted: false,
    globalKey: 0,
    dialogs: [],
    fullscreenLoadingMessage: null,
    routeDialog: null,
    alertDialog: {
      id: '',
      key: '',
      active: false,
      title: '',
      subtitle: '',
      actions: [],
    },
    allowMobileView: false,
    theme: {
      is: null,
      dark: null,
      light: null,
    },
  }
}
