<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import SortSteps from '~/components/App/CreateProject/SortSteps/index.vue'
import Steps from '~/components/App/CreateProject/Steps/index.vue'
import {
  scrollMain,
  splitPath,
  layoutSizing,
  projectWarningDuplicateId,
  sleep,
} from '~/utils'
import { dynamicPageTransition } from '~/utils/pageTransition'
import eventKey from '~/utils/eventKey'
import { RootState } from '~/store'
import PreviewDialog from '~/components/App/CreateProject/PreviewDialog/index.vue'
import type { GetProjectForm } from '~/store/projectSuite'
import { TestDetail } from '~/database/models/Project/TestDetail'
import VisibilityChange from '~/components/Base/VisibilityChange/index.vue'

interface WatchProjectForm extends GetProjectForm {
  progress: TestDetail['progress']
}

export default defineComponent({
  name: 'AppProjectIndexPage',
  components: { SortSteps, Steps, PreviewDialog, VisibilityChange },

  transition: (to, from) => {
    const splitFrom = splitPath(from?.path || '')

    if (splitFrom[1] === 'project') {
      return 'page-transition-slide-right'
    }

    return dynamicPageTransition({
      to,
      from,
    })
  },

  setup(_, { root }) {
    const stepsKey = ref(performance.now())

    const vuexState = computed(
      () => (root.$store.state as RootState).projectSuite
    )

    const showWarning = computed(() => {
      return vuexState.value.create.showWarning
    })

    const watchValues = computed(() => {
      const state = root.$store.getters[
        'projectSuite/getProjectForm'
      ] as GetProjectForm

      return JSON.stringify({
        ...state,
        progress: (root.$store.state as RootState).projectSuite.detail.progress,
      })
    })

    const stopTabbing = computed(() => {
      if (showWarning.value) {
        return {
          keydown: (evt: KeyboardEvent) => {
            if (eventKey(evt) === 'tab') {
              evt.preventDefault()
            }
          },
          focus: () => {
            const warningDuplicateBtn = document.getElementById(
              projectWarningDuplicateId
            )

            if (warningDuplicateBtn) {
              warningDuplicateBtn.focus({
                preventScroll: true,
              })
            }
          },
        }
      } else return {}
    })

    // TODO: SET TYPE
    const updateStepsKey = (section: any) => {
      if (section) {
        stepsKey.value = performance.now()

        const nextSection = document.getElementById(section.id)

        if (nextSection) {
          const { layoutPadding } = layoutSizing

          const scrollY = nextSection.offsetTop - layoutPadding

          scrollMain(scrollY)
        }
      }
    }

    const autosave = () => root.$store.dispatch('projectSuite/create/autosave')

    watch(
      () => vuexState.value.create.section.uploading.length,
      (nv, ov) => {
        if (ov > nv) {
          autosave()
        }
      }
    )

    watch(
      () => watchValues.value,
      async (nv, ov) => {
        if (vuexState.value.create.fetching) {
          return
        }

        if (vuexState.value.create.empty) {
          const newVal = JSON.parse(nv) as WatchProjectForm
          const oldVal = JSON.parse(ov) as WatchProjectForm

          if (
            (newVal.thankYouScreen.title === ' ' &&
              oldVal.thankYouScreen.title === '') ||
            (newVal.thankYouScreen.title === '' &&
              oldVal.thankYouScreen.title === ' ')
          ) {
            return
          }

          root.$store.commit('projectSuite/create/setEmpty', false)

          if (newVal.items.length === oldVal.items.length && newVal.progress) {
            return
          }

          await sleep(500)
        }

        autosave()
      }
    )

    const flashWarning = async () => {
      const warningDuplicateBtn = document.getElementById(
        projectWarningDuplicateId
      )

      if (warningDuplicateBtn?.offsetParent) {
        warningDuplicateBtn.offsetParent.classList.remove(
          'before:animate-[pulse_250ms_1_350ms]',
          'before:animate-[pulse_250ms_1]'
        )

        await sleep()

        warningDuplicateBtn.offsetParent.classList.add(
          'before:animate-[pulse_250ms_1]'
        )
      }
    }

    return {
      stepsKey,
      showWarning,
      stopTabbing,
      updateStepsKey,
      autosave,
      flashWarning,
    }
  },

  fetch({ store, route }) {
    store.dispatch('projectSuite/detail/setId', route.params.id).then(() => {
      store.dispatch('projectSuite/create/fetch')
    })
  },
})
</script>

<template>
  <VisibilityChange @state:hidden="autosave">
    <div
      :tabindex="showWarning ? '0' : undefined"
      class="mt-32 max-w-app mx-auto pb-112 min-w-full"
      :class="{ 'pointer-events-none relative': showWarning }"
      v-on="stopTabbing"
    >
      <div
        v-if="showWarning"
        class="pseudo !pointer-events-auto"
        @click="flashWarning"
      />

      <div
        :inert="showWarning || undefined"
        class="w-full grid grid-cols-[auto,1fr] grid-flow-col gap-x-32 min-w-full"
      >
        <SortSteps @shuffled="updateStepsKey" />
        <Transition name="fade-transition" mode="out-in">
          <Steps
            :key="stepsKey"
            :style="{
              '--fade-enter-duration': '500ms',
            }"
          />
        </Transition>
      </div>

      <PreviewDialog />
    </div>
  </VisibilityChange>
</template>
