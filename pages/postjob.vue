<script lang="ts">
import {
  defineComponent,
  reactive,
  provide,
  ref,
  toRefs,
} from '@vue/composition-api'
import CheronLeft from '~/components/Base/Icon/CheronLeft.vue'
import DoneFormIndicator from '~/components/Base/Icon/DoneFormIndicator.vue'
import EyeIcon from '~/components/Base/Icon/EyeIcon.vue'
import FormIndicator from '~/components/Base/Icon/FormIndicator.vue'
import RightArrowIcon from '~/components/Base/Icon/RightArrowIcon.vue'
import LeftArrowIcon from '~/components/Base/Icon/LeftArrowIcon.vue'
import Form1 from '~/components/Forms/PostJob/FormOne.vue'
import Form2 from '~/components/Forms/PostJob/FormTwo.vue'
import Form3 from '~/components/Forms/PostJob/FormThree.vue'
import Form4 from '~/components/Forms/PostJob/FormFour.vue'
import Form5 from '~/components/Forms/PostJob/FormFive.vue'

export default defineComponent({
  name: 'PostJob',
  components: {
    CheronLeft,
    RightArrowIcon,
    LeftArrowIcon,
    EyeIcon,
    FormIndicator,
    DoneFormIndicator,
    Form1,
    Form2,
    Form3,
    Form4,
    Form5,
  },

  setup(_props) {
    const component = 'form1'
    const forms = ref([
      { id: 'form1', name: 'Job Intro', statusCompleted: false },
      { id: 'form2', name: 'Skills', statusCompleted: false },
      { id: 'form3', name: 'Scope', statusCompleted: false },
      { id: 'form4', name: 'Budget', statusCompleted: false },
      { id: 'form5', name: 'Review', statusCompleted: false },
    ])
    const state = reactive({
      jobTitle: '',
      introduction: '',
    })
    provide('form', forms)
    provide('state', state)

    return {
      ...toRefs(state),
      forms,
      component,
    }
  },
})
</script>

<template>
  <main>
    <section class="flex h-[100vh]">
      <aside class="fixed w-[20%] mx-20 my-40 space-y-64 px-16">
        <div>
          <NuxtLink to="/">
            <h5 class="bold-500 flex items-center">
              <CheronLeft class="mr-10" />Back to Home
            </h5>
          </NuxtLink>
        </div>

        <main class="flex flex-col space-y-36">
          <div
            v-for="form in forms"
            :key="form.id"
            class="flex items-center space-x-10"
          >
            <div class="w-36 h-36 rounded-full border-n-300 overflow-hidden">
              <FormIndicator
                v-if="component === form.id"
                class="h-34 w-34 rounded-full"
              />
              <DoneFormIndicator
                v-show="form.statusCompleted"
                class="h-34 w-34"
              />
            </div>
            <p>{{ form.name }}</p>
          </div>
        </main>
      </aside>

      <section class="flex flex-col basis-[60%] mx-auto">
        <h3 class="mt-72 mb-24 font-semibold text-xl text-center">
          Kick off a stress-free hiring process
        </h3>

        <div class="mx-120 space-y-14">
          <keep-alive>
            <component :is="component" />
          </keep-alive>

          <button @click="component = 'form5'">jumpto 5</button>
          <div class="button-container">
            <button v-show="component != 'form1'" class="navbutton">
              <span
                v-if="component === 'form2'"
                @click="
                  ;(component = 'form1'),
                    (activeForm = 'form1'),
                    (forms[1].statusCompleted = false)
                "
                ><LeftArrowIcon class="mr-10" />Previous</span
              >
              <span
                v-if="component === 'form3'"
                @click="
                  ;(component = 'form2'),
                    (activeForm = 'form2'),
                    (forms[2].statusCompleted = false)
                "
                ><LeftArrowIcon class="mr-10" />Previous</span
              >
              <span
                v-if="component === 'form4'"
                @click="
                  ;(component = 'form3'),
                    (activeForm = 'form3'),
                    (forms[3].statusCompleted = false)
                "
                ><LeftArrowIcon class="mr-10" />Previous</span
              >
              <span
                v-if="component === 'form5'"
                @click="
                  ;(component = 'form4'),
                    (activeForm = 'form4'),
                    (forms[4].statusCompleted = false)
                "
                ><LeftArrowIcon class="mr-10" />Previous</span
              >
            </button>

            <button v-show="component != 'form5'" class="navbutton">
              <span
                v-if="component === 'form1'"
                @click="
                  ;(component = 'form2'),
                    (activeForm = 'form2'),
                    (forms[0].statusCompleted = true)
                "
                >Next <RightArrowIcon class="ml-10" />
              </span>
              <span
                v-if="component === 'form2'"
                @click="
                  ;(component = 'form3'),
                    (activeForm = 'form3'),
                    (forms[1].statusCompleted = true)
                "
                >Next <RightArrowIcon class="ml-10" />
              </span>
              <span
                v-if="component === 'form3'"
                @click="
                  ;(component = 'form4'),
                    (activeForm = 'form4'),
                    (forms[2].statusCompleted = true)
                "
                >Next <RightArrowIcon class="ml-10" />
              </span>
              <span
                v-if="component === 'form4'"
                @click="
                  ;(component = 'form5'),
                    (activeForm = 'form5'),
                    (forms[3].statusCompleted = true)
                "
                >Next <RightArrowIcon class="ml-10" />
              </span>
            </button>
          </div>
        </div>
      </section>

      <section class="fixed right-0 w-[20%]">
        <div class="bg-primary50 font-normal rounded-md mt-120 mr-28 p-20">
          <div class="flex justify-end -mt-36">
            <img src="#" alt="#" />
          </div>
          <h6>
            We recommend your job description be as detailed as possible to
            ensure you get talents that fit your requirements. Check out
            <nuxt-link to="#" class="nuxt-link"
              >quick guide on how to setup the perfect job post</nuxt-link
            >.
          </h6>
          <br />
          <h6>
            Free free to reach out to us via the chat bot or
            <nuxt-link to="#" class="nuxt-link">contact support</nuxt-link>.
          </h6>
        </div>
      </section>
    </section>

    <section class="flex justify-center">
      <div
        class="space-x-224 flex fixed <!-- bottom-48 --> bottom py-20 px-60 border-n-300 bg-white shadow-lg"
      >
        <button class="flex items-center">
          <eye-icon class="mr-10" />Preview post
        </button>
        <div class="flex space-x-14">
          <button class="skyeblue-button">Save and continue later</button>
          <button class="blue-button">Publish</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.navbutton {
  @apply flex items-center py-6 px-10 border border-solid border-neutral300 rounded-md;
}
button span {
  @apply flex items-center;
}
.button-container {
  @apply flex flex-row justify-between mx-auto;
  width: 555px;
}
</style>
