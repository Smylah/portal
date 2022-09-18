<script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import DropdownIcon from '../Icon/DropdownIcon.vue'

    export default defineComponent({
        name: 'FormInputSelect',
        components: { DropdownIcon },
        transition: 'page-transition-slide-left',
        props: {
            labelName: {
                type: String
            },

        },
        setup() {},
    })
</script> 
    
<template>
    <div class="flex flex-col mt-[1.45rem]">
        <label :for="labelName" class="text-[14px] font-[500] text-[#111827] leading-[20px] mb-[4px]">
            {{ labelName }}
        </label>
        <select
            :id="labelName"
            placeholder="Select..."
            class="text-[14px] font-[400] text-[#D1D5DB] leading-[20px] pl-[12px] py-[10px] rounded-[6px] border-[#D1D5DB] border-[1px] shadow-[0_1px_2px_rgba(16,24,40,0.05)] bg-inherit"
            :v-model="labelName"
        >
            <option value="">Select...</option>
        </select>
    </div>
</template>

<style lang="postcss"></style>
    