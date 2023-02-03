<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Header from '../components/HomePage/Header.vue'
import Form1 from '~/components/Forms/AccountSetup/FormOne.vue'
import Form2 from '~/components/Forms/AccountSetup/FormTwo.vue'

export default defineComponent({
  name: 'AccountSetup',
  components: { Header, Form1, Form2 },
  transition: 'page-transition-slide-left',
  data() {
    return {
      // forms: ['Form1', 'Form2'],
      component: 'Form1',
    }
  },
})
</script>

<template>
  <main>
    <Header />
    <div class="text-center mt-30">
      <h3>Account setup</h3>
      <h5>
        Hello John! Let’s get you set to start hiring awesome QA Engineers for
        your company.
      </h5>
    </div>

    <section class="smallcontainer mx-auto">
      <transition>
        <keep-alive>
          <component :is="component" />
        </keep-alive>
      </transition>

      <div class="flex flex-col my-14 space-y-14">
        <button class="blue-button">
          <span v-if="component === 'Form1'" @click="component = 'Form2'"
            >Continue</span
          >
          <span v-if="component === 'Form2'" @click.prevent=""
            >Complete setup</span
          >
        </button>

        <button
          v-show="component === 'Form2'"
          to="#"
          class="nuxt-link font-medium text-base text-center"
          @click="component = 'Form1'"
        >
          Back to previous page
        </button>
      </div>
    </section>
  </main>
</template>

<style></style>
