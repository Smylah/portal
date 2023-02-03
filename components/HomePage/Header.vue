<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DropdownIcon from '../Base/Icon/DropdownIcon.vue'
import UnbugQaIcon from '../Base/Icon/UnbugQaIcon.vue'

export default defineComponent({
  name: 'HeaderComponent',

  components: { DropdownIcon, UnbugQaIcon },

  props: {},

  computed: {
    homepage() {
      if (this.$route.path === '/') {
        return true
      } else {
        return false
      }
    },
  },
})
</script>

<template>
  <header>
    <nav
      class="container mx-auto my-24 flex justify-between text-lg font-medium"
    >
      <div class="flex space-x-24 items-center">
        <unbug-qa-icon />

        <div v-show="homepage" class="flex flex-row space-x-24">
          <nuxt-link to="link">For employers</nuxt-link>
          <nuxt-link to="link">For QA engineers</nuxt-link>
          <nuxt-link to="link">Company</nuxt-link>
          <nuxt-link to="link">Pricing</nuxt-link>
          <nuxt-link to="link" class="flex items-center"
            >Resources <dropdown-icon class="ml-10" />
          </nuxt-link>
        </div>
      </div>

      <div v-show="homepage" class="space-x-24">
        <nuxt-link to="/login" class="text-primary600"> Login</nuxt-link>
        <nuxt-link
          to="/SignUp"
          class="bg-primary500 text-white px-20 py-8 rounded-md"
        >
          Get started
        </nuxt-link>
      </div>
    </nav>
  </header>
</template>
