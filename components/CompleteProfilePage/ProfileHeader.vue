<script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    
    export default defineComponent({
        name: 'ProfileHeader',
        components: {},
        layout: '',
        transition: 'page-transition-slide-left',
        props: {
            level: {
                type: Number,
            }
        },
        setup() {},
    })
</script> 
    
<template>
    <div class="w-full py-[1.75rem]">
        <!-- the bar -->
        <div class="relative w-full bg-[#A8CBFF] h-[4px] rounded-[8px] mb-[1.2rem]">
            <div :class="`w-[${level*50}%]`"
                class="absolute bg-[#267DFF] h-[4px] rounded-[8px]">
            </div>
        </div>
        <!-- div below bar -->
        <div class="flex space-x-[1.2rem] items-center">
            <!-- circle element -->
            <div class="w-[36px] h-[36px] border-2 border-[#267DFF] bg-[#FFFFFF] shadow-[0_0_0_4px_#E1E1FE] rounded-full text-[#267DFF] flex justify-center items-center text-[1.2rem]">
                {{`${level}/2`}}
            </div>
            <!-- text elements in their divs -->
            <div>
                <p class="uppercase text-[1rem] leading-[1.4rem] text-[#6B7280] font-semibold">Tell us about your Company</p>
                <h2 class="text-[1.2rem] leading-[1.65rem] text-[#111827]">Company Details</h2>
            </div>
        </div>
    </div>
</template>

<style lang="postcss"></style>
    