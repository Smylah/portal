<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { NuxtError } from '@nuxt/types'
import layouts from '~/mixins/layouts'

export default defineComponent({
  name: 'DefaultLayout',

  components: {},
  mixins: [layouts],

  props: {
    error: {
      type: Object as () => NuxtError,
      default: () =>
        ({
          statusCode: 500,
          message: 'An error occured',
        } as NuxtError),
    },
  },

  setup(_props) {},

  head() {
    return {
      title: this.error.statusCode,
      meta: [
        {
          hid: 'description',
          name: 'descrition',
          content: this.errorMessage,
        },
      ],
    }
  },
})
</script>

<template>
  <div>Error layout</div>
</template>
