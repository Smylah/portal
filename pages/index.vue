<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'IndexPage',
  components: {},
  layout: 'talent',
  transition: 'page-transition-slide-left',
  setup() {},

  head: () => ({
    titleTemplate: '',
    title: '',
  }),
})
</script>

<template>
  <div>Hello world</div>
</template>

<style lang="postcss"></style>
