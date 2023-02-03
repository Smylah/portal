<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import FormSelect from '../../Base/FormInput/select.vue'
import FormTextArea from '../../Base/FormInput/textarea.vue'

export default defineComponent({
  name: 'FormThree',
  components: { FormSelect, FormTextArea },
  setup() {
    const data = ref(['contract', 'partime', 'fulltime'])
    const state = reactive({
      typeOfHire: '',
      durationOfHire: '',
      responsibilities: '',
      mustHaves: '',
    })
    return {
      data,
      state,
    }
  },
})
</script>
<template>
  <form>
    <div class="flex space-x-30">
      <FormSelect
        label="Type of hire"
        :data="data"
        type="text"
        :modelValue.sync="state.typeOfHire"
        class="basis-1/2"
      />
      <FormSelect
        label="Duration of hire"
        :data="data"
        type="text"
        :modelValue.sync="state.durationOfHire"
        class="basis-1/2"
      />
    </div>

    <FormTextArea
      label="Responsibilities"
      placeholder="List out the responsibities of the talent at your company in detail"
      :modelValue.sync="state.responsibilities"
    />
    <FormTextArea
      label="Must haves (Optional)"
      placeholder="List compulsory requirements here"
      :modelValue.sync="state.mustHaves"
    />
  </form>
</template>
