import Vue from 'vue'
import { Plugin } from '@nuxt/types'

import Breakpoint from 'ui-breakpoint'

import { Breakpoints, BreakpointOutput } from '~/types'

type ScreenSizes = { [key in Breakpoints]: `${number}${'px' | ''}` }

const screenSizes: ScreenSizes = {
  xxs: '0px',
  xs: '325px',
  sl: '400px',
  sm: '600px',
  md: '1080px',
  lg: '1264px',
  xl: '1327px',
  xxl: '1800px',
}

let installed = false

const breakpointState = Vue.observable({
  state: {} as BreakpointOutput,
})

const mobileRegExp = /^(?:xxs|xs|sl|sm)$/

const breakpointPlugin: Plugin = function ({ store }, inject) {
  if (!installed) {
    const updateBreakpoint = (br: BreakpointOutput) => {
      breakpointState.state = {
        ...br,
        isMobile: mobileRegExp.test(br.is || ''),
        isTablet: /^(?:md)$/.test(br.is || ''),
        isLaptop: /^(?:lg|xl|xxl)$/.test(br.is || ''),
      }
    }

    const breakpoint: BreakpointOutput = new Breakpoint({
      config: screenSizes,
      useOrientation: true,
      onChange: (evt: BreakpointOutput) => {
        const isMobile = mobileRegExp.test(evt.is || '')

        if (isMobile !== breakpointState.state.isMobile) {
          store.commit('app/updateGlobalKey')
        }

        updateBreakpoint(evt)
      },
    })

    updateBreakpoint({
      is: breakpoint.is,
      orientation: breakpoint.orientation,
    })

    installed = true

    const breakpointProxy = new Proxy(breakpointState.state, {
      get(_, path: keyof BreakpointOutput) {
        if (!installed) {
          return null
        }

        if (path === 'smaller' || path === 'larger') {
          return (val: string) => {
            const breakpoints = Object.keys(screenSizes)

            const breakpointIndex = breakpoints.indexOf(val)

            if (breakpointIndex < 0) {
              return false
            }

            return path === 'smaller'
              ? breakpoints.indexOf(breakpointState.state.is) <= breakpointIndex
              : breakpoints.indexOf(breakpointState.state.is) >= breakpointIndex
          }
        }

        return breakpointState.state[path]
      },
    })

    inject('breakpoint', breakpointProxy)
  }
}

export default breakpointPlugin
