<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'HomePage',
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
  <div>Home Page</div>
</template>

<style lang="postcss"></style>
