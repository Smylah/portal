<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { ProjectComponent, Layout } from '~/types'
import GoogleIcon from '~/components/Base/Icon/GoogleIcon.vue'
import { googleOAuthUrl } from '~/utils/oauth/google'

export default defineComponent({
  name: 'AnswerTestDonePage',
  components: { GoogleIcon },

  layout: 'preview-test' as Layout,

  transition: 'answer-done-page-transition',

  setup(_, { root }) {
    const template = computed(() => {
      return root.$route.params.qType as ProjectComponent
    })

    const isPreview = computed(() =>
      root.$route.path.startsWith('/preview-test/')
    )

    const getGoogleOAuthUrl = computed(() => {
      return googleOAuthUrl(root.$nuxt.context.env)
    })

    return { template, isPreview, getGoogleOAuthUrl }
  },

  head: {
    title: 'Test completed!',
    meta: [
      {
        hid: 'description',
        name: 'descrition',
        content: 'You have successfully answered this test',
      },
    ],
  },
})
</script>

<template>
  <div class="min-h-full flex w-full relative">
    <div
      class="z-1 lg:z-[auto] w-full xl:w-[45%] bg-surface-default grid md:grid-rows-[1fr,auto] grid-rows-[auto,auto,auto] px-20 xl:pl-64 pb-56"
      :class="{
        'pt-[min(100px,5.3%)] xxl:pt-[min(140px,10.3%)]': isPreview,
        'pt-[min(140px,10.3%)] xxl:pt-[min(140px,14.3%)]': !isPreview,
        'text-center': /xxs|xs|sm|md|lg/.test($breakpoint.is),
      }"
    >
      <div>
        <div class="grid justify-items-center lg:justify-items-start">
          <Img
            src="static/png/answer-test/flag.png"
            alt="Welcome 3d icon"
            class="w-222 h-180 mt-[5%] lg:mt-[10%]"
          />

          <h2
            class="font-medium text-[18px] leading-[24px] px-16 lg:px-0 text-center lg:text-left lg:text-[28px] lg:leading-[36.5px] mb-16 font-sf-pro-display"
          >
            Thank you!
          </h2>

          <p class="mb-32 max-w-[517px] lg:text-[16px] lg:leading-[22px] text-center">
            Thank you for participating in this test and sharing your awesome
            feedback.
          </p>
        </div>
      </div>

      <div
        v-if="$breakpoint.isMobile"
        class="rounded-lg bg-sky-light h-full w-full"
      >
        <TeleportTarget name="signup-actions" />
      </div>

      <div class="md:mb-52 h-fit mt-32 md:mt-0">
        <p class="flex items-center justify-center lg:justify-start space-x-8">
          <span class="leading-[17.22px] text-text-subdued">
            This test was created with
          </span>
          <AppIcon />
        </p>
      </div>
    </div>

    <div
      :class="[
        $breakpoint.isMobile
          ? 'hidden'
          : 'w-full absolute inset-0 lg:inset-[auto] lg:relative xl:w-[55%] blur-lg lg:blur-none',
      ]"
    >
      <Teleport
        :key="`${!$breakpoint.isMobile}-teleport`"
        :disabled="!$breakpoint.isMobile"
        to="signup-actions"
        class="h-full w-full"
      >
        <div
          class="grid justify-items-center h-full content-center p-32 md:p-0"
        >
          <h2
            class="md:text-display-small text-heading-sm md:text-[24px] font-semibold md:max-w-[320px] text-center max-w-[250px]"
          >
            Start collecting your own insights with Crowd.
          </h2>

          <p class="text-text-subdued text-heading mt-10 mb-20 text-center">
            It's free! no credit card required
          </p>

          <div class="md:min-w-[210px]">
            <Button
              full-width
              size="large"
              v-bind="
                $user.loggedIn
                  ? {
                      to: '/dashboard',
                    }
                  : {
                      href: getGoogleOAuthUrl,
                    }
              "
              class="bg-surface-default"
            >
              <div class="flex items-center">
                <GoogleIcon class="w-19 h-19 mr-4" />

                Signup with Google
              </div>
            </Button>

            <p class="text-center my-12">Or</p>

            <Button
              size="large"
              primary
              full-width
              to="/auth/sign-up"
            >
              Signup with email
            </Button>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>
