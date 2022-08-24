<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AppIcon from '../Icon/AppIcon.vue'

export default defineComponent({
  name: 'BaseHeaderLogo',
  components: { AppIcon },
  setup() {
    const scrollToTop = () =>
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

    return { scrollToTop }
  },
})
</script>

<template>
  <h1
    class="text-[20.07px] leading-[20.57px] font-medium transition-opacity active:opacity-70"
  >
    <NuxtLink to="/" class="inline-flex items-end" @click.native="scrollToTop">
      <AppIcon />

      <PBadge class="bg-surface-neutral-default font-sf-pro-text ml-4">
        Beta
      </PBadge>
    </NuxtLink>
  </h1>
</template>
