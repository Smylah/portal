<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// import layouts from '~/mixins/layouts'
import RightArrowIcon from '../Base/Icon/RightArrowIcon.vue'
import CompleteCheckMarkIcon from '../Base/Icon/CompleteCheckMarkIcon.vue'

export default defineComponent({
  name: 'TaskLinkComponent',

  components: { RightArrowIcon, CompleteCheckMarkIcon },
  //   mixins: [layouts],

  props: {
    TaskName: {
      type: String,
    },
    TaskLink: {
      type: String,
    },
  },

  setup(_props) {},
})
</script>
    
<template>
  <NuxtLink
    class="
      flex
      justify-between
      items-center
      bg-white
      pl-[1.35rem]
      py-[1.2rem]
      pr-[1.65rem]
      rounded-[8px]
      w-[34rem]
    "
    :to="TaskLink"
  >
    <div class="flex items-center">
      <CompleteCheckMarkIcon />
      <p
        class="
          text-[1.2rem]
          leading-[1.75rem]
          font-medium
          text-[#111827]
          pl-[1.4rem]
        "
      >
        {{ TaskName }}
      </p>
    </div>
    <RightArrowIcon stroke="#6B7280" />
  </NuxtLink>
</template>
    