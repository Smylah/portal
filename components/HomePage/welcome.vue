<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import DazzleGirlWithDrinkOnSkateboard1 from '../Base/Icon/dazzle-girl-with-drink-on-skateboard1.vue'
import YellowStar from '../Base/Icon/YellowStar.vue'

export default defineComponent({
  name: 'WelcomeComponent',
  components: { YellowStar, DazzleGirlWithDrinkOnSkateboard1 },

  setup() {
    const name = 'John'
    const howItWorks = ref([
      {
        id: 1,
        about:
          'Start your process by created a job post about the available job role and ideal candidate you’re looking for. ',
      },
      {
        id: 2,
        about:
          'Receive a list of talents that match your job requirements within 48 hours and schedule interview calls with preferred candidates.',
      },
      {
        id: 3,
        about:
          'Select your preferred candidate(s) for hire and complete the hiring process in less than 48 hours. ',
      },
    ])
    return {
      name,
      howItWorks,
    }
  },
})
</script>
<template>
  <main class="flex mt-37 ml-17">
    <div class="p-32 space-y-20">
      <h3>Welcome {{ name }}!</h3>
      <p>
        We’re super excited to have you aboard. Hire expert QA Engineers just
        got way easier for you and we’re here to help every step of the way!
      </p>
      <div>
        <p class="mb-10">Here’s a quick summary of how hiring works again:</p>
        <div v-for="data in howItWorks" :key="data.id" class="space-y-16">
          <div class="flex">
            <i><YellowStar class="mr-10 mt-3" /></i>
            <span class="text-sm">{{ data.about }}</span>
          </div>
        </div>
      </div>
      <p>
        Click the button below to start your hire process. If you have question
        feel free to quick an quick onboarding call with us.
      </p>
      <div class="flex space-x-20">
        <nuxt-link to="/postjob" class="blue-button px-16"
          >Create your first job post</nuxt-link
        >
        <nuxt-link to="#" class="skyeblue-button px-16"
          >Book onboarding call</nuxt-link
        >
      </div>
    </div>
    <div class="mt-48 mr-97">
      <dazzle-girl-with-drink-on-skateboard-1 />
    </div>
  </main>
</template>
