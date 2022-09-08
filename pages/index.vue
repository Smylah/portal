<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HomeHeader from "../components/Home/HomeHeader.vue"

export default defineComponent({
  name: 'HomePage',
  components: {HomeHeader},
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
  <div class="px-[4.5rem] py-[2.5rem]">
    <HomeHeader />
    
  </div>
</template>

<style lang="postcss"></style>
