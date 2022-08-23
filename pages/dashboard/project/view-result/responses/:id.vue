<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import DesignSurvey from '@/components/App/CreateProjectResult/DesignSurvey/index.vue'
import SimpleSurvey from '@/components/App/CreateProjectResult/SimpleSurvey/index.vue'
import FiveSecondTest from '@/components/App/CreateProjectResult/FiveSecondTest/index.vue'
import WebsiteEvaluation from '@/components/App/CreateProjectResult/WebsiteEvaluation/index.vue'
import PrototypeEvaluation from '@/components/App/CreateProjectResult/PrototypeEvaluation/index.vue'
import PreferenceTest from '@/components/App/CreateProjectResult/PreferenceTest/index.vue'
import CardSorting from '@/components/App/CreateProjectResult/CardSorting/index.vue'
import { RootState } from '~/store'
import { splitPath } from '~/utils'
import { dynamicPageTransition } from '~/utils/pageTransition'
import { ProjectComponent } from '~/types'

export default defineComponent({
  name: 'AppProjectViewResultUserSessionsPage',
  components: {
    DesignSurvey,
    SimpleSurvey,
    FiveSecondTest,
    WebsiteEvaluation,
    PrototypeEvaluation,
    PreferenceTest,
    CardSorting,
  },

  transition: (to, from) => {
    const splitFrom = splitPath(from?.path || '')

    if (splitFrom[2] === 'view-result') {
      return 'page-transition-slide-right'
    }

    return dynamicPageTransition({
      to,
      from,
    })
  },

  setup(_, { root }) {
    const result = computed(
      () => (root.$store.state as RootState).projectSuite.viewResult
    )

    const fetchingResult = computed(() => {
      return result.value.loading && root.$route.params.id !== result.value.id
    })

    const resultAnswers = computed(() => {
      // get all question-\d from result.questions

      if (fetchingResult.value) {
        return []
      }

      return Object.entries(result.value.questions)
        .filter(([key]) => /^question-\d+$/.test(key))
        .map(([key, value]) => {
          return {
            index: Number(key.replace(/^question-/, '')),
            type: value.type as ProjectComponent,
          }
        })
        .filter((x) => {
          if (x.type === 'CustomMessage') {
            return false
          }

          const projectTypes = (root.$store.state as RootState).projectSuite
            .viewResult.projectTypesFilter

          if (projectTypes !== 'all') {
            return x.type === projectTypes
          }

          return true
        })
    })

    return { resultAnswers }
  },

  fetch() {},

  head: {
    title: 'Test results responses',
  },
})
</script>

<template>
  <div class="grid gap-y-16">
    <Component
      :is="answer.type"
      v-for="answer in resultAnswers"
      :key="answer.index"
      :numbering="answer.index"
    />
  </div>
</template>
