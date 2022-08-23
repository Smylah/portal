<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { ProjectComponent, Layout } from '~/types'
import SimpleSurvey from '~/components/AnswerTest/Template/SimpleSurvey/index.vue'
import DesignSurvey from '~/components/AnswerTest/Template/DesignSurvey/index.vue'
import FiveSecondTest from '~/components/AnswerTest/Template/FiveSecondTest/index.vue'
import PreferenceTest from '~/components/AnswerTest/Template/PreferenceTest/index.vue'
import CardSorting from '~/components/AnswerTest/Template/CardSorting/index.vue'
import WebsiteEvaluation from '~/components/AnswerTest/Template/WebsiteEvaluation/index.vue'
import PrototypeEvaluation from '~/components/AnswerTest/Template/PrototypeEvaluation/index.vue'
import CustomMessage from '~/components/AnswerTest/Template/CustomMessage/index.vue'
import { features } from '~/utils'
// import ConfrimDialog from '~/components/AnswerTest/ConfrimDialog/index.vue'
import UiDialog from '~/components/Base/UiDialog/index.vue'
import CommentSection from '~/components/App/CommentSection/index.vue'
import FadeTransition from '~/components/Base/FadeTransition/index.vue'
import { RootState } from '~/store'
import AnswerTestPageTransition from '~/components/Base/AnswerTestPageTransition/index.vue'

export default defineComponent({
  name: 'AnswerTestQuestionPage',
  components: {
    SimpleSurvey,
    DesignSurvey,
    FiveSecondTest,
    PreferenceTest,
    CardSorting,
    WebsiteEvaluation,
    PrototypeEvaluation,
    CustomMessage,
    // ConfrimDialog,
    UiDialog,
    CommentSection,
    FadeTransition,
    AnswerTestPageTransition,
  },

  layout: 'preview-test' as Layout,
  validate(ctx) {
    const { qType } = ctx.route.params

    return !!Object.values(features).find((x) => x.projectComponent === qType)
  },
  transition: 'answer-page-transition',

  setup(_, { root }) {
    const template = computed(() => {
      return root.$route.params.qType as ProjectComponent
    })

    const dialogVisible = computed({
      get() {
        return (root.$store.state as RootState)['view-result'].commentDialog
          .active
      },
      set(val: boolean) {
        root.$store.commit('view-result/toggleCommentDialog', val)
      },
    })

    return { template, dialogVisible }
  },

  head() {
    return {
      title: `${this.$answerQuestionTitle.title}`,
      meta: [
        {
          hid: 'description',
          name: 'descrition',
          content: 'Preview tests. FILL THIS UP',
        },
      ],
    }
  },
})
</script>

<template>
  <div class="h-full">
    <div
      :key="$breakpoint.isMobile"
      class="fixed top-12 inset-0 pointer-events-none z-10 md:pt-96"
    >
      <Tooltip
        v-if="!$breakpoint.isMobile"
        v-slot="{ events }"
        label="View comments"
        trigger-class="w-fit h-fit absolute lg:right-40 right-24 flex"
      >
        <span v-on="events">
          <FadeTransition>
            <Button
              v-if="
                $route.query.confirm !== '1' &&
                $route.name !== 'preview-test-:shareLink-done'
              "
              :readonly="$breakpoint.isMobile"
              class="!rounded-full !w-50 !h-50 !p-0 !shadow-base !bg-surface-default pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100 !border-none"
              @click="$store.commit('view-result/toggleCommentDialog', true)"
            >
              <PIcon
                source="ChatMajor"
                class="text-interactive-disabled fill-icon"
              />
            </Button>
          </FadeTransition>
        </span>
      </Tooltip>
    </div>

    <AnswerTestPageTransition>
      <Component :is="template" />
    </AnswerTestPageTransition>

    <!-- <ConfrimDialog /> -->

    <UiDialog
      v-model="dialogVisible"
      v-bind="$attrs"
      from="right"
      as-drawer
      title="Comments"
      root-class="!p-0 !bg-black/0"
      content-class="!rounded-none w-380 !grid-rows-[57px,calc(100%-57px)]"
      header-class="!h-57"
      body-class="!pb-0 !px-0"
    >
      <CommentSection divide-footer />
    </UiDialog>
  </div>
</template>
