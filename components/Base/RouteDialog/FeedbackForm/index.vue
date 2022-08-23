<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from '@vue/composition-api'
import UiDialog from '../../UiDialog/index.vue'
import FormLayout from '../../FormLayout/index.vue'
import TextField from '../../TextField/index.vue'
import DropZone from '../../DropZone/index.vue'
import { getFormContent, Form, getFeedbackType } from './utils'
import { formBody, sleep, validRouteDialog } from '~/utils'
import type { OnSubmit, RouteDialog } from '~/types'
import { PostFeedback } from '~/services/feedback'
import { showToasts } from '~/utils/showToast'

export default defineComponent({
  name: 'BaseRouteDialogFeedbackForm',
  components: { UiDialog, FormLayout, TextField, DropZone },
  setup(_, { root }) {
    const dialogActive = ref(false)

    const dialogTitle = ref('')

    const appDialogRoute = computed(() => root.$appState.routeDialog)

    const currentRouteDialog = ref<RouteDialog>(null)

    const textFields = computed(() => getFormContent(currentRouteDialog.value))

    const mobileDialogProps = computed(() => {
      if (root.$breakpoint.isMobile) {
        return {
          from: 'bottom',
          asDrawer: true,
          contentClass: '!rounded-b-none h-fit w-full',
          rootClass: '!p-0 items-end',
        }
      } else return {}
    })

    const removeDialogQuery = () => {
      if (
        root.$route.query.dialog &&
        root.$route.query.dialog === currentRouteDialog.value
      ) {
        root.$router.replace({
          query: {
            ...root.$route.query,
            dialog: undefined,
          },
        })

        root.$store.commit('app/setRouteDialog', '')
      }
    }

    const setRouteDialogState = () => {
      root.$store.commit('app/setRouteDialog', root.$route.query.dialog)
    }

    const toggleDialogActive = async () => {
      setRouteDialogState()

      await nextTick()

      const isActive = () => validRouteDialog.includes(appDialogRoute.value)

      if (isActive()) {
        if (dialogActive.value) {
          dialogActive.value = false

          await sleep(250)
        }

        const getTitle = () => {
          switch (appDialogRoute.value) {
            case 'contact-us':
              return 'Contact us'
            case 'give-feedback':
              return 'Give feedback'
            case 'report-bug':
              return 'Report a bug'
            case 'request-feature':
              return 'Request a feature'
            default:
              return ''
          }
        }

        currentRouteDialog.value = appDialogRoute.value

        dialogTitle.value = getTitle()

        await nextTick()

        if (isActive()) {
          setRouteDialogState()

          dialogActive.value = true
        }
      } else {
        dialogActive.value = false
      }
    }

    const onSubmit: OnSubmit<Form> = async ({ formValues, toggleLoading }) => {
      toggleLoading(true)

      const reqPayload = formBody({
        fields: JSON.stringify({
          type: getFeedbackType(currentRouteDialog.value),
          title: formValues.feedbackTitle,
          content: formValues.feedbackDescription,
        }),
      })

      if (formValues.feedbackFile?.length) {
        reqPayload.append('files', formValues.feedbackFile[0])
      }

      const { error, message } = await PostFeedback(root.$axios, reqPayload)

      showToasts(root.$pToast, message)

      if (!error) {
        removeDialogQuery()
      }

      toggleLoading(false)
    }

    onMounted(async () => {
      await sleep(500)

      toggleDialogActive()
    })

    watch(() => root.$route.query.dialog, toggleDialogActive, {
      immediate: true,
    })

    return {
      dialogActive,
      dialogTitle,
      textFields,
      currentRouteDialog,
      mobileDialogProps,
      validRouteDialog,
      appDialogRoute,
      onSubmit,
      removeDialogQuery,
    }
  },

  head() {
    if (!this.dialogActive) {
      return null
    }

    return {
      title: this.dialogTitle,
    }
  },
})
</script>

<template>
  <UiDialog
    v-if="$appState.mounted"
    :model-value="validRouteDialog.includes(appDialogRoute)"
    :body-class="$breakpoint.isMobile ? undefined : 'pb-0'"
    v-bind="mobileDialogProps"
    transition="slide-y"
    @on-close="removeDialogQuery"
  >
    <template #header>
      <span class="font-semibold lg:font-normal">
        {{ dialogTitle }}
      </span>
    </template>

    <FormLayout
      v-slot="{ idAndError, loading }"
      :name="`route-form-${dialogTitle}`"
      class="min-w-full md:min-w-[558px] isolate"
      @on-submit="onSubmit"
    >
      <div class="grid gap-y-20 px-8 -mb-8 isolate">
        <template v-if="currentRouteDialog !== 'report-bug'">
          <TextField
            v-for="(field, i) in textFields"
            :key="i"
            :label="field.label"
            :placeholder="field.placeholder"
            required
            :autofocus="i === 0 && !$breakpoint.isMobile"
            v-bind="{
              ...idAndError(field.id),
              ...(field.props || {}),
            }"
          />
        </template>

        <template v-else>
          <TextField
            label="Describe the issue"
            placeholder="The more information, the better"
            multiline
            :min-height="92"
            required
            :autofocus="!$breakpoint.isMobile"
            v-bind="idAndError('feedbackDescription')"
          />

          <div>
            <label for="feedbackFile" class="mb-3 inline-block">
              Attach screenshot or screen recording
            </label>

            <DropZone id="feedbackFile" accept="image/*,video/*" />
          </div>
        </template>
      </div>

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
  </UiDialog>
</template>
