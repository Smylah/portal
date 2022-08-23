import { defineComponent, onMounted, computed } from '@vue/composition-api'
import { AppState } from '~/store/app/state'
import { VueElement } from '~/types'
import { nextFrame, sleep } from '~/utils'

let called = false

export default defineComponent({
  setup(_, { root: { $fullscreenLoading, $store } }) {
    const mounted = computed(() => ($store.state.app as AppState).mounted)

    if (!called) {
      $fullscreenLoading.show({
        message: 'Loading...',
        id: 'app-loading',
      })

      onMounted(async () => {
        await sleep(200)

        $store.commit('app/mountApp')

        await nextFrame()

        $fullscreenLoading.hide({
          id: 'app-loading',
        })
      })

      called = true
    }

    const tooltips = computed(() => $store.getters['app/tooltips'] as string[])

    const closeAllTooltips = () => {
      const activeTooltips = tooltips.value

      if (activeTooltips.length) {
        activeTooltips.forEach((id) => {
          const tooltipRoot = document.getElementById(id) as VueElement

          if (tooltipRoot) {
            tooltipRoot.__vue__.close()
          }
        })
      }
    }

    const closeTooltipEvents = computed(() => {
      return tooltips.value.length
        ? {
            wheel: closeAllTooltips,
            scroll: closeAllTooltips,
          }
        : {}
    })

    return {
      mounted,
      tooltips,
      closeTooltipEvents,
      closeAllTooltips,
    }
  },
})
