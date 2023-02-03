<script lang="ts">
import { defineComponent, inject, toRefs } from '@vue/composition-api'
import FormInput from '../../Base/FormInput/index.vue'
import FormTextarea from '../../Base/FormInput/textarea.vue'

export interface state {
  jobTitle: string
  introduction: string
}

export default defineComponent({
  name: 'FormOne',
  components: { FormInput, FormTextarea },
  setup() {
    const state: state = inject('state', {})

    return {
      ...toRefs(state),
    }
  },
})
</script>
<template>
  <form>
    <FormInput
      :model-value.sync="jobTitle"
      label="Job Title"
      placeholder="e.g Senior QA Engineer proficient in Selenium"
      type="text"
    />
    <FormTextarea
      :model-value.sync="introduction"
      label="Introduction"
      placeholder="Describe your company and the role e.g Our growing startup is looking to hire a Senior QA Engineer proficient in Selenium."
      type="textarea"
    />
  </form>
</template>
