<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'
import { Layout, OnSubmit } from '~/types'
import type { AnswerTestState } from '~/store/answer-test'
import WelcomePage from '~/components/AnswerTest/WelcomePage/index.vue'

interface State {
  buttonText?: string
  title?: string
  message?: string
  name?: string
  error?: boolean
}

export default defineComponent({
  name: 'AnswerTestIndexPage',
  components: { WelcomePage },
  layout: 'preview-test' as Layout,
  transition: 'answer-page-transition',
  setup(_, { root }) {
    const showAlert = ref(false)

    const startingTest = ref(false)

    const loading = computed(() => {
      return (root.$store.state['answer-test'] as AnswerTestState).loading
    })

    const state = computed(() => {
      const answerTestState = root.$store.state[
        'answer-test'
      ] as AnswerTestState
      const welcomeScreen = answerTestState.form.welcomeScreen

      if (!welcomeScreen) {
        return {
          error: true,
        } as State
      }

      const { buttonText, message, title } = welcomeScreen

      return {
        buttonText,
        message,
        title,
        name: answerTestState.username,
      } as State
    })

    const exitTest = () => {
      window.location.replace('about:blank')
    }

    const beginTest: OnSubmit<{ name: string }> = async ({
      toggleLoading,
      formValues,
      refreshForm,
    }) => {
      toggleLoading(true)

      const { error } = await root.$store.dispatch(
        'answer-test/beginTest',
        formValues.name
      )

      if (!error) {
        showAlert.value = false
      } else {
        refreshForm()
      }

      toggleLoading(false)
    }

    const nextStep = async () => {
      // if (!state.value.name) {
      //   showAlert.value = true
      // } else {
      //   // go to next step
      //   await root.$store.dispatch('answer-test/beginTest')
      // }
      startingTest.value = true

      await root.$store.dispatch('answer-test/beginTest')

      startingTest.value = false
    }

    return {
      showAlert,
      startingTest,
      state,
      loading,
      exitTest,
      beginTest,
      nextStep,
    }
  },

  head: {
    title: 'Answer tests',
    meta: [
      {
        hid: 'description',
        name: 'descrition',
        content: 'Answer tests. Design survey',
      },
    ],
  },
})
</script>

<template>
  <WelcomePage
    :title="state.title"
    :message="state.message"
    :button-text="state.buttonText"
    :starting-test="startingTest"
    @nextStep="nextStep"
  />
</template>

<style lang="postcss"></style>
