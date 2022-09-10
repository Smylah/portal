<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'SidebarHeader',

    components: {},

    props: {
    },

    setup(_props) {},
})
</script>

<template>
    <div class="font-Inter">
        <div class="flex justify-between items-center">
            <h1 class="">
                <NuxtLink to="/" class="flex items-center space-x-[0.75rem]">
                    <div class="w-[2.5rem] h-[2.5rem] rounded-[6px] bg-base-primary"></div>
                    <h2 class="font-semibold text-[1.25rem]">UnbugQa</h2>
                </NuxtLink>
            </h1>
            <div class="flex items-center space-x-[1.35rem]">
                <div class="w-[16px] h-[18px] bg-base-primary"></div>
                <div class="w-[40px] h-[40px] rounded-full border-2 border-black"></div>
                <!-- <img src="" alt="" class="aspect-square w-[2.rem] rounded-full border-2 border-black"> -->
            </div>
        </div>

        <div class="py-[1rem] my-[1.9rem]">
            <div class="flex space-x-[4px] items-center">
                <h2 class="font-semibold text-[1.2rem]">John Dalton</h2>
                <h2 class="flex items-center font-medium text-[0.85rem] text-[#0063F7] bg-[#F5F5FF] px-[8px] rounded-[1.75rem] h-[1.5rem]">Client</h2>
            </div>
            <p class="font-normal text-[1rem] text-[#6B7280]">John2022@gmail.com</p>
        </div>

        <NuxtLink to="/complete-setup/" class="flex justify-between items-center px-[0.9rem] bg-[#FFFBEB] w-[100%] h-[2.5rem] rounded-[6px] text-[#111827]">
            <p class="font-medium text-[14px]">Complete account setup</p>
            <div class="w-[14px] h-[10.89px] bg-black"></div>
        </NuxtLink>
    </div>
</template>
