<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Header from '../components/HomePage/Header.vue'
import HomeBody from '../components/HomePage/HomeBody.vue'
import Footer from '../components/Footer/index.vue'

export default defineComponent({
  name: 'HomePage',
  components: { Header, HomeBody, Footer },
  transition: 'page-transition-slide-left',

  data() {},

  head() {
    return {
      title: 'UnbugQA Portal',
      meta: [{ hid: 'Homepage', name: 'Homepage', content: 'Homepage' }],
    }
  },
})
</script>

<template>
  <div>
    <Header />
    <HomeBody />
    <Footer />
  </div>
</template>
