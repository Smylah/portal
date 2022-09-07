<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'SidebarHeader',

    components: {},

    props: {
    },

    setup(_props) {},

    head() {
        return {
            title: '',
            meta: [
                {
                    hid: '',
                    name: '',
                    content: '',
                },
            ],
        }
    },
})
</script>

<template>
    <div class="">
        <div class="flex justify-between items-center">
            <div class="flex items-center space-x-[11px]">
                <div class="w-[2.5rem] h-[2.5rem] rounded-[6px] bg-base-primary"></div>
                <h2 class="font-semibold text-[16px]">UnbugQa</h2>
            </div>
            <div class="flex items-center space-x-[20px]">
                <div class="">No</div>
                <div class="w-[40px] h-[40px] rounded-full border-2 border-black"></div>
                <!-- <img src="" alt="" class="aspect-square w-[2.rem] rounded-full border-2 border-black"> -->
            </div>
        </div>

        <div class="py-[13px] my-[24px] border-2 border-black">
            <div class="flex space-x-[4px] items-center">
                <h2 class="font-semibold text-[16px]">John Dalton</h2>
                <h2 class="flex items-center font-medium text-[12px] text-[#0063F7] bg-[#F5F5FF] px-[8px] rounded-[24px] h-[20px]">Client</h2>
            </div>
            <p class="font-normal text-[14px] text-[#6B7280]">Johnd2022@gmail.com</p>
        </div>

        <div class="flex justify-between items-center px-[12px] bg-[#FFFBEB] w-[100%] h-[36px] rounded-[6px] text-[#111827] cursor-pointer">
            <p class="font-medium text-[14px]">Complete account setup</p>
        </div>
    </div>
</template>
