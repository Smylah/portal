<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import FormInput from '../../Base/FormInput/index.vue'
import FormSelect from '../../Base/FormInput/select.vue'

export default defineComponent({
  name: 'FormTwo',
  components: { FormInput, FormSelect },
  setup() {
    const countries = ref(['Nigeria', 'USA', 'UK'])
    const state = reactive({
      companyAddress: '',
      country: '',
      province: '',
      city: '',
      zipcode: '',
    })
    return {
      countries,
      state,
    }
  },
})
</script>

<template>
  <form action="submit">
    <FormInput
      label="Your company address"
      :modelValue.sync="state.companyAddress"
      placeholder="Your company address"
      type="text"
    />

    <FormSelect
      :data="countries"
      label="Country"
      :modelValue.sync="state.country"
    />

    <FormSelect
      :data="countries"
      label="State/Province"
      :modelValue.sync="state.province"
    />

    <FormSelect :data="countries" label="City" :modelValue.sync="state.city" />

    <FormInput
      label="Postal/Zipcode"
      :modelValue.sync="state.zipcode"
      placeholder="Your zipcode"
      type="text"
    />
  </form>
</template>
