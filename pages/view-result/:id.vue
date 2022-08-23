<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { Layout } from '~/types'
import Summary from '~/components/App/CreateProjectResult/Summary/index.vue'
import TabSwitcher from '~/components/App/CreateProjectResult/TabSwitcher/index.vue'
import ViewResultResponses from '~/pages/dashboard/project/view-result/responses/:id.vue'
import { RootState } from '~/store'
import UiDialog from '~/components/Base/UiDialog/index.vue'
import CommentSection from '~/components/App/CommentSection/index.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    Summary,
    TabSwitcher,
    ViewResultResponses,
    UiDialog,
    CommentSection,
  },
  layout: 'view-result' as Layout,
  transition: 'page-transition-slide-left',

  setup(_, { root }) {
    const result = computed(
      () => (root.$store.state as RootState).projectSuite.viewResult
    )

    const dialogVisible = computed({
      get() {
        return (root.$store.state as RootState)['view-result'].commentDialog
          .active
      },
      set(val: boolean) {
        root.$store.commit('view-result/toggleCommentDialog', val)
      },
    })

    return { result, dialogVisible }
  },
})
</script>

<template>
  <div class="w-full min-h-full px-16 md:px-0">
    <div class="max-w-[800px] mx-auto pt-32 pb-96 isolate">
      <Summary
        class="mb-32"
        :participants="result.answers.length"
        :responses="result.responses"
        :share-link="result.testDetails.shareLink"
      />

      <div>
        <TabSwitcher class="mb-16" />

        <ViewResultResponses />
      </div>
    </div>

    <div
      :key="$breakpoint.isMobile"
      class="fixed top-56 inset-0 pointer-events-none z-10 pt-96"
    >
      <Tooltip
        v-slot="{ events }"
        label="View comments"
        trigger-class="w-fit h-fit absolute lg:right-40 right-24 flex"
      >
        <span v-on="events">
          <Button
            :readonly="$breakpoint.isMobile"
            class="!rounded-full !w-50 !h-50 !p-0 !shadow-base !bg-surface-default pointer-events-none md:pointer-events-auto opacity-0 md:opacity-100 !border-none"
            @click="$store.commit('view-result/toggleCommentDialog', true)"
          >
            <PIcon
              source="ChatMajor"
              class="text-interactive-disabled fill-icon"
            />
          </Button>
        </span>
      </Tooltip>
    </div>

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
