<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { location, talentportfolio } from './TalentPortfolio'
import { skip } from './skip'
import { featuredtalent } from './featuredtalent'
import { others } from './others'
import CompleteCheckMarkIcon from '../Base/Icon/CompleteCheckMarkIcon.vue'
import SkipDash from '../Base/Icon/SkipDash.vue'
import CurlyArrow1 from '../Base/Icon/CurlyArrow1.vue'
import CurlyArrow2 from '../Base/Icon/CurlyArrow2.vue'

export default defineComponent({
  components: { CompleteCheckMarkIcon, SkipDash, CurlyArrow1, CurlyArrow2 },
  name: 'HomeBody',
  data() {
    return {
      hoverValue: false,
      talentPortfolio: [
        {
          id: 1,
          name: 'Josh Emerson',
          img: '../../assets/png/21.png',
          experience: '5 years experience',
          location: <location>{ state: 'Lagos', country: 'Nigeria' },
          skills: [
            { id: 1, name: 'cypress' },
            { id: 2, name: 'Apium' },
            { id: 3, name: 'Selenium Web...' },
            { id: 4, name: 'Javascript' },
            { id: 5, name: 'python' },
          ],
        },
        {
          id: 2,
          name: 'Sonia Balogun',
          img: '../../assets/png/21.png',
          experience: '7 years experience',
          location: <location>{ state: 'Paris', country: 'France' },
          skills: [
            { id: 1, name: 'Apium' },
            { id: 2, name: 'cypress' },
            { id: 3, name: 'Selenium Web...' },
            { id: 4, name: 'Javascript' },
            { id: 5, name: 'Blackbox' },
          ],
        },
        {
          id: 3,
          name: 'Lily Jefferson',
          img: '../../assets/png/Lily.png',
          experience: '12 years experience',
          location: <location>{ state: 'NY', country: 'United States' },
          skills: [
            { id: 1, name: 'Pytest' },
            { id: 2, name: 'Apium' },
            { id: 3, name: 'Selenium Web...' },
            { id: 4, name: 'Javascript' },
            { id: 5, name: 'Python' },
          ],
        },
      ] as Array<talentportfolio>,
      // skip: [
      //   {
      //     id: 1,
      //     text: 'Spending',
      //     span: 'time and money',
      //     text2: 'to post on many job board',
      //     img: '../../assets/png/Frame 13.png',
      //   },
      //   {
      //     id: 2,
      //     text: 'Looking through  ',
      //     span: 'numerous',
      //     text2: 'resumes and portfolios',
      //     img: '../../assets/png/Frame 14.png',
      //   },
      //   {
      //     id: 3,
      //     text: 'Scheduling several interview sessions with candidates',
      //     img: '../../assets/png/Frame 15.png',
      //   },
      // ] as Array<skip>,

      featuredTalents: [
        {
          id: 1,
          name: 'Baker',
          img: '../../assets/png/Baker.png',
          role: 'Senior QA Engineer',
          about:
            'Baker is a senior QA Engineer with over five years of focusing on web/native (mobile) and desktop app development. Baker has experience working across different ...',
          skills: [
            { id: 1, name: 'Appium' },
            { id: 2, name: 'Cypress' },
            { id: 3, name: 'Selenenium webdriver' },
            { id: 4, name: 'Pytest' },
            { id: 5, name: 'Black box...' },
            { id: 6, name: 'Regression' },
            { id: 7, name: 'Perf...' },
          ],
        },
        {
          id: 2,
          name: 'Samuel',
          img: '../../assets/png/Samuel.png',
          role: 'Senior QA Engineer',
          about:
            'Samuel is a senior QA Engineer with over five years of focusing on web/native (mobile) and desktop app development. Samuel has experience working across different ...',
          skills: [
            { id: 1, name: 'Appium' },
            { id: 2, name: 'Cypress' },
            { id: 3, name: 'Selenenium webdriver' },
            { id: 4, name: 'Pytest' },
            { id: 5, name: 'Black box...' },
            { id: 6, name: 'Regression' },
            { id: 7, name: 'Perf...' },
          ],
        },
        {
          id: 3,
          name: 'Azeez',
          img: '../../assets/png/Azeez.png',
          role: 'Senior QA Engineer',
          about:
            'Azeez is a senior QA Engineer with over five years of focusing on web/native (mobile) and desktop app development. Azeez has experience working across different ...',
          skills: [
            { id: 1, name: 'Appium' },
            { id: 2, name: 'Cypress' },
            { id: 3, name: 'Selenenium webdriver' },
            { id: 4, name: 'Pytest' },
            { id: 5, name: 'Black box...' },
            { id: 6, name: 'Regression' },
            { id: 7, name: 'Perf...' },
          ],
        },
      ] as Array<featuredtalent>,

      others: [
        {
          id: 1,
          img: '../../assets/png/Frame 25.png',
          name: 'Create job post in minutes',
          about:
            'Start your process by created a job post about the available job role and ideal candidate you’re looking for. ',
          list: [
            { id: 1, about: 'Take less than 5 minutes' },
            { id: 2, about: 'Dedicated success manager to help' },
          ],
          selected: true,
        },
        {
          id: 2,
          img: '../../assets/png/Frame 43.png',
          name: 'Get matched and interview talents',
          about:
            'Receive a list of talents that match your job requirements within 48 hours and schedule interview calls with preferred candidates.',
          list: [
            { id: 1, about: 'No upfront cost for getting matched' },
            { id: 2, about: 'View up to 12 vetted talent profiles' },
          ],
        },
        {
          id: 3,
          img: '../../assets/png/Frame 44.png',
          name: 'Complete your hire',
          about:
            'Receive a list of talents that match your job requirements within 48 hours and schedule interview calls with preferred candidates.',
          list: [
            { id: 1, about: 'Flexible payment options' },
            { id: 2, about: 'Dedicated talent manager' },
          ],
        },
      ] as Array<others>,
    }
  },
})
</script>

<template>
  <main>
    <section class="container mx-auto text-center py-64 px-210">
      <h5 class="uppercase text-sm font-semibold mb-8">
        Say fare well to Slow hires
      </h5>
      <h1 class="text-5xl font-bold mb-16">
        Hiring <span class="bg-primary50 px-6 pl-0">expert</span> QA Engineers
        just got easier
      </h1>
      <h5 class="mb-32 text-lg font-normal px-64">
        Get matched with vetted QA engineers from different parts of the world
        in x5 times less the time of a typical hire process.
      </h5>

      <nuxt-link
        to="#"
        class="bg-primary500 text-white rounded-md font-normal text-lg px-24 py-10"
        >Hire QA engineers</nuxt-link
      >
    </section>

    <!-- talent portfolio -->
    <section class="my-64 mx-31 flex flex-row space-x-18 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-white w-500" />
      <div class="absolute bg-gradient-to-l from-white w-300" />
      <div
        v-for="talent in talentPortfolio"
        :key="talent.id"
        class="flex space-x-10 border border-neutral200 p-20 rounded-lg"
      >
        <img :src="talent.img" alt="" />
        <div>
          <h5 class="font-semibold text-lg">{{ talent.name }}</h5>
          <p class="font-normal text-sm mb-12">
            {{ talent.experience }} |
            {{ (talent.location.state, talent.location.country) }}
          </p>

          <div class="flex flex-wrap gap-6">
            <p
              v-for="skill in talent.skills"
              :key="skill.id"
              class="bg-primary50 px-8 font-medium text-xs text-primary600 rounded-3xl"
            >
              {{ skill.name }}
            </p>
            <p
              class="bg-primary50 px-8 font-medium text-xs text-primary600 rounded-3xl"
            >
              +6
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- skip the hiring process -->
    <section
      class="container mx-auto bg-neutral50 py-48 rounded-xl text-center"
    >
      <main class="container mx-auto">
        <div class="mb-10">
          <h1 class="mb-24 text-3xl font-medium">
            Skip the long hiring process
          </h1>
          <skip-dash class="ml-337 -mt-25" />
        </div>

        <section class="flex flex-row mx-150 justify-center">
          <div class="">
            <div
              class="flex mx-auto justify-center w-35 h-34 rounded-full bg-destructive500 text-white mb-10"
            >
              1
            </div>

            <article class="text-lg font-medium mb-20">
              Spending
              <span class="text-destructive500">time and money</span> to post on
              many job boards
            </article>
            <img src="../../assets/png/Frame 13.png" alt="pic" class="" />
          </div>

          <curly-arrow1 class="curly-arrow" />

          <div class="">
            <div
              class="flex mx-auto justify-center w-35 h-34 rounded-full bg-destructive500 text-white mb-10"
            >
              2
            </div>
            <article class="text-lg font-medium mb-20">
              Looking through
              <span class="text-destructive500">numerous</span> resumes and
              portfolios
            </article>
            <img src="../../assets/png/Frame 14.png" alt="pic" />
          </div>

          <curly-arrow-2 class="curly-arrow" />

          <div class="">
            <div
              class="flex mx-auto justify-center w-35 h-34 rounded-full bg-destructive500 text-white mb-10"
            >
              3
            </div>
            <article class="text-lg font-medium mb-20">
              Scheduling several interview sessions with candidates
            </article>
            <img src="../../assets/png/Frame 15.png" alt="pic" />
          </div>
        </section>
      </main>
    </section>

    <section class="container mx-auto py-80">
      <div class="text-center mb-52">
        <h4 class="text-3xl font-semibold pb-10">
          Get matched in less than 72 hours
        </h4>
        <h5 class="text-lg font-normal">
          Kick your journey to hiring great QA Engineers with ease
        </h5>
      </div>

      <div v-for="data in others" :key="data.id" class="px-81 space-y-2">
        <div
          class="bg-neutral500 flex justify-center h-34 w-34 text-white rounded-full -ml-16 my-6"
        >
          {{ data.id }}
        </div>

        <div
          class="flex flex-row border-l-4 border-neutral200 hover:border-primary600 transit"
        >
          <article class="mr-106 ml-30">
            <h1 class="font-semibold text-2xl">{{ data.name }}</h1>
            <p class="font-normal text-base mb-16">
              {{ data.about }}
            </p>
            <hr class="mb-18" />

            <div
              v-for="item in data.list"
              :key="item.id"
              class="font-normal text-base flex"
            >
              <p class="flex items-center">
                <complete-check-mark-icon class="mr-5" />{{ item.about }}
              </p>
            </div>
          </article>
          <img :src="data.img" alt="pic" class="-mt-17 mb-77" />
        </div>
      </div>

      <div class="space-x-20 text-lg font-medium py-29 text-center">
        <nuxt-link
          to="#"
          class="bg-primary500 text-white rounded-md px-24 py-10"
          >Start your hire process</nuxt-link
        >
        <nuxt-link to="#" class="text-primary500"
          >See how we get the best talents -></nuxt-link
        >
      </div>
    </section>

    <!-- featured talents -->
    <section class="container mx-auto my-64">
      <div class="mb-30">
        <h3 class="text-3xl font-semibold mb-10">Featured talents</h3>
        <p class="text-base font-normal">
          Meet some of the amazing talents in our network
        </p>
      </div>

      <div class="flex gap-x-35">
        <article
          v-for="talent in featuredTalents"
          :key="talent.id"
          class="bg-neutral50 p-20 text-sm"
        >
          <img :src="talent.img" alt="#" class="mb-20" />
          <h5 class="font-medium text-base">{{ talent.name }}</h5>
          <h6 class="font-normal">{{ talent.role }}</h6>
          <p class="my-16 font-normal">
            {{ talent.about }}
          </p>

          <div class="flex flex-wrap gap-6 mb-20">
            <p
              v-for="skill in talent.skills"
              :key="skill.id"
              class="bg-white border border-solid border-neutral200 px-8 font-medium text-xs rounded-3xl"
            >
              {{ skill.name }}
            </p>
          </div>
          <nuxt-link
            to="#"
            class="px-16 py-8 bg-primary50 font-medium text-primary500 rounded"
            >Hire {{ talent.name }}</nuxt-link
          >
        </article>
      </div>
    </section>

    <section class="container mx-auto">
      <main class="rounded-xl container flex flex-row bg-primary50 px-60">
        <div class="my-60">
          <div class="mb-24 mr-93">
            <h2 class="text-2xl font-semibold mb-10">
              Seamless and fast hiring is just a click away
            </h2>
            <p class="text-base font-normal">
              We take the stress, risk and burden involved in hiring the right
              talent for your company, with dedicated support through the
              process.
            </p>
          </div>

          <div class="space-x-20 text-lg font-medium">
            <nuxt-link
              to="#"
              class="bg-primary500 text-white rounded-md px-24 py-10"
              >Get Started</nuxt-link
            >
            <nuxt-link to="#" class="text-primary500"
              >Not convinced? Learn more -></nuxt-link
            >
          </div>
        </div>

        <img src="../../assets/png/Frame 32.png" alt="" class="mt-27" />
      </main>
    </section>
  </main>
</template>

<style scoped>
.curly-arrow {
  @apply mt-146;
}
</style>
