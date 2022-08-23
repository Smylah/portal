<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Layout, OnSubmitArgs } from '~/types'
import { formBody, splitPath } from '~/utils'
import { dynamicPageTransition } from '~/utils/pageTransition'
import DialogButton from '~/components/Base/DialogButton/index.vue'
import { Form } from '~/components/Base/RouteDialog/FeedbackForm/utils'
import { PostFeedback } from '~/services/feedback'
import { showToasts } from '~/utils/showToast'

export default defineComponent({
  name: 'AppIntegrationsPage',
  components: { DialogButton },
  layout: 'app' as Layout,
  transition: (to, from) =>
    dynamicPageTransition({
      to,
      from,
      useFade:
        !from ||
        splitPath(to.path).length === splitPath(from?.path || '').length,
    }),
  setup(_, { root }) {
    const onSubmit = async (
      { formValues, toggleLoading }: OnSubmitArgs<Form>,
      close: () => void
    ) => {
      toggleLoading(true)

      const reqPayload = formBody({
        fields: JSON.stringify({
          type: 'integration',
          title: formValues.feedbackTitle,
          content: formValues.feedbackDescription,
        }),
      })

      const { error, message } = await PostFeedback(root.$axios, reqPayload)

      showToasts(root.$pToast, message)

      if (!error) {
        close()
      }

      toggleLoading(false)
    }

    return { onSubmit }
  },

  head: {
    title: 'Integrations',
    meta: [
      {
        name: 'description',
        content: "Suggest apps you'd like to see integrated in Crowd!",
        vmid: 'description',
        hid: 'description',
      },
    ],
  },
})
</script>

<template>
  <div class="w-full py-32 px-32">
    <div class="max-w-app mx-auto">
      <div
        class="max-w-[800px] p-20 rounded-lg bg-surface-default shadow-2 grid"
      >
        <h2 class="text-heading font-semibold">Available integrations</h2>

        <p class="my-20">
          We currently don't have any integrations available but we're working
          on making some available for you in due time. Kindly use the button
          below to recommend an integration you'd like to use with Crowd.
        </p>

        <hr class="h-1 w-full bg-[#F7F7F7] mb-20 justify-self-end" />

        <div class="flex justify-end">
          <DialogButton
            primary
            :dialog-attrs="{
              title: 'Recommend an integration',
              bodyClass: 'min-w-[612px] pb-0',
              transition: 'slide-y',
            }"
          >
            Recommend an Integration

            <template #dialog="{ close }">
              <FormLayout
                v-slot="{ idAndError, loading }"
                name="suggest-integration"
                @on-submit="(evt) => onSubmit(evt, close)"
              >
                <TextField
                  label="What integration would offer more value to you"
                  placeholder="e.g Slack, Notion, Google Drive"
                  v-bind="idAndError('feedbackTitle')"
                  required
                  autofocus
                />

                <TextField
                  label="Describe the value it would offer"
                  placeholder="The details of your recommendation"
                  v-bind="idAndError('feedbackDescription')"
                  required
                  multiline
                  :min-height="92"
                />

                <div class="sticky bottom-0 z-1 bg-surface-default">
                  <hr class="h-1 w-[calc(100%+40px)] -ml-20" />

                  <div class="h-78 flex-centered">
                    <Button
                      primary
                      size="large"
                      full-width
                      type="submit"
                      :loading="loading"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </FormLayout>
            </template>
          </DialogButton>
        </div>
      </div>
    </div>
  </div>
</template>
