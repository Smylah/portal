<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HomeHeader from "../components/HomePage/HomeHeader.vue"
import HomeBody from "../components/HomePage/HomeBody.vue"

export default defineComponent({
  name: 'HomePage',
  components: {HomeHeader, HomeBody},
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
  <div class="">
    <HomeHeader />
    <HomeBody />
  </div>
</template>

<style lang="postcss"></style>
