<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import FormInput from '../../Base/FormInput/index.vue'
import FormSelect from '../../Base/FormInput/select.vue'

export default defineComponent({
  name: 'FormOne',
  components: { FormInput, FormSelect },
  setup() {
    const roleData = ref(['Manager', 'Director'])
    const industryData = ref(['IT', 'Engineering'])
    const companySizeData = ref([5, 10, 20, 30, 50])
    const state = reactive({
      companyName: '',
      roleAtCompany: '',
      whatYouDO: '',
      industry: '',
      companySize: '',
    })
    return {
      industryData,
      companySizeData,
      state,
      roleData,
    }
  },
})
</script>

<template>
  <form>
    <FormInput
      label="Company name"
      :modelValue.sync="state.companyName"
      placeholder="Your company name"
      type="text"
    />
    <FormSelect
      :data="roleData"
      label="Role at the company"
      :modelValue.sync="state.roleAtCompany"
    />

    <FormInput
      label="What you do in one sentence"
      :modelValue.sync="state.whatYouDO"
      type="text"
      placeholder="Company Description"
    />

    <FormSelect
      :data="industryData"
      label="Industry"
      :modelValue.sync="state.industry"
    />
    <FormSelect
      :data="companySizeData"
      label="Company Size"
      :modelValue.sync="state.companySize"
    />
  </form>
</template>
