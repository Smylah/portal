<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import FormInput from '../../Base/FormInput/index.vue'
import FormSelect from '../../Base/FormInput/select.vue'
import FormTextArea from '../../Base/FormInput/textarea.vue'

export default defineComponent({
  name: 'FormFour',
  components: { FormInput, FormSelect, FormTextArea },
  setup() {
    const data = ref(['USD', 'NGN', 'GBP', 'EUR'])
    const payRateData = ref(['Per Hour', 'per day'])
    const state = reactive({
      currency: '',
      amount: '',
      payRate: '',
      benefits: '',
    })
    return {
      state,
      data,
      payRateData,
    }
  },
})
</script>
<template>
  <form>
    <FormInput
      label="Currency"
      :modelValue.sync="state.currency"
      placeholder="United States Dollars (USD)"
    />

    <label>Amount</label>
    <div class="flex space-x-30">
      <FormInput :modelValue.sync="state.amount" placeholder="amount" />
      <FormSelect
        :data="payRateData"
        class="basis-1/2"
        :model-value.sync="state.payRate"
      />
    </div>

    <FormTextArea
      label="Benefits (Optional)"
      :model-value.sync="state.benefits"
      placeholder="List any benefits you offer here"
    />
  </form>
</template>
