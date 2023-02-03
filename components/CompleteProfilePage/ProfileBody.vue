<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import RightArrowIcon from '../Base/Icon/RightArrowIcon.vue'
import FormInputSelect from '../Base/FormInput/select.vue'

export default defineComponent({
  name: 'ProfileBody',
  components: { RightArrowIcon, FormInputSelect },
  layout: '',
  transition: 'page-transition-slide-left',
  props: {
    level: {
      type: Number,
    },
  },
  setup() {
    const handleSubmit = () => {
      console.log('props')
    }

    return {
      handleSubmit,
    }
  },
})
</script> 
    
<template>
  <form class="w-full py-[1.75rem]" action="." @submit.prevent="handleSubmit">
    <div>
      <div class="flex flex-col">
        <label
          for="companyName"
          class="text-[14px] font-[500] text-[#111827] leading-[20px] mb-[4px]"
        >
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          placeholder="Your company"
          required
          class="
            text-[14px]
            font-[400]
            text-[#D1D5DB]
            leading-[20px]
            pl-[12px]
            py-[10px]
            rounded-[6px]
            border-[#D1D5DB] border-[1px]
            shadow-[0_1px_2px_rgba(16,24,40,0.05)]
            bg-inherit
          "
          v-model="companyName"
        />
      </div>
      <FormInputSelect labelName="Industry" />
      <FormInputSelect labelName="Country of incorporation" />
      <FormInputSelect labelName="Role at the company" />
      <FormInputSelect labelName="Company Size" />
    </div>
    <!-- button element -->
    <div class="flex justify-end mt-[1.45rem]">
      <button
        class="
          bg-[#267DFF]
          h-[2.8rem]
          px-[1.4rem]
          rounded-[0.75rem]
          flex
          items-center
          space-x-[10px]
          text-[#FFFFFF]
        "
      >
        <p>Continue</p>
        <RightArrowIcon stroke="#FFFFFF" />
      </button>
    </div>
  </form>
</template>

<style lang="postcss"></style>
    

