<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Sidebar from '../components/Sidebar/Sidebar.vue'
import Welcome from '../components/HomePage/welcome.vue'

export default defineComponent({
  name: 'WelcomePage',
  components: { Sidebar, Welcome },
  setup() {},
})
</script>

<template>
  <main class="flex">
    <Sidebar />
    <Welcome />
  </main>
</template>
