<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import HomeHeader from "../components/HomePage/HomeHeader.vue"
import HomeBody from "../components/HomePage/HomeBody.vue"

export default defineComponent({
  name: 'HomePage',
  components: {HomeHeader, HomeBody},
  layout: 'talent',
  transition: 'page-transition-slide-left',

  setup(_props, {root}) {
    // onMounted( ()=> {
    //   console.log(root.$route.path)
    // })

    const tryout1 = ()=> {
      console.log("fired")
    }
    
    return {
      tryout1
    }
  },

  head: () => ({
    titleTemplate: '',
    title: '',
  }),
})
</script>

<template>
  <div class="" @click="tryout1">
    <HomeHeader />
    <HomeBody />
  </div>
</template>

<style lang="postcss"></style>
