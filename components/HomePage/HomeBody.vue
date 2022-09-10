<script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import HomeCard from "./HomeCard.vue"
    
    export default defineComponent({
        name: 'HomeBody',
    
        components: {HomeCard},
    
        props: {
        },
    
        setup(_props) {},
    })
</script>
    
<template>
    <div class="mt-[1.65rem] px-[4.5rem]">
        <div class="flex space-x-[2.5rem]">
            <div class="w-[22.5rem] p-[1.75rem] bg-[#808080] rounded-[8px] shadow-[0_1px_2px_-1px_rgba(16, 24, 40, 0.1)] drop-shadow-[0_1px_3px_rgba(16, 24, 40, 0.1)]">
                <p class="text-[#FFFFFF] text-[1rem] leading-[1.4rem] font-normal mb-[6px]">Wallet balance</p>
                <div class="flex justify-between items-center mb-[16px]">
                    <p class="text-[#FFFFFF] text-[1.75rem] leading-[2.25rem] font-semibold">$0.00</p> 
                    <div class="flex justify-between items-center bg-white px-[10px] w-[4.3rem] h-[1.75rem] rounded-[1.75rem]">
                        <p class="text-[#004FC5] text-[1rem] leading-[1.4rem] font-normal">USD</p>
                        <div class="w-[6px] h-[3px] bg-black"></div>
                    </div>  
                </div>
                <button class="w-[100%] h-[2.4rem] bg-[#FFFFFF] text-[#374151] text-[1rem] leading-[1.4rem] rounded-[6px]">Fund Wallet</button>
            </div>
            <div class="flex space-x-[0.85rem]">
                <HomeCard :count="0" text="Gigs created"/>
                <HomeCard :count="0" text="Talents hired"/>
                <HomeCard :count="0" text="Invoices due"/>
            </div>
        </div>
        <div class="mt-[2.5rem] flex space-x-[1.25rem]">
            <div class="p-[1.4rem] w-[34.8rem] h-[25rem] bg-[#FFFFFF] rounded-[8px] shadow-[0_1px_2px_rgba(16, 24, 40, 0.05)]">
                <p class="text-[#000000] text-[1rem] leading-[1.4rem] font-semibold">Recent Gigs</p>
            </div>
            <div class="flex flex-col space-y-[1.25rem]">
                <div class="p-[1.4rem] w-[34.8rem] h-[14.3rem] bg-[#FFFFFF] rounded-[8px] shadow-[0_1px_2px_rgba(16, 24, 40, 0.05)]">
                    <p class="text-[#000000] text-[1rem] leading-[1.4rem] font-semibold">Payment history</p>
                </div>
                <div class="p-[1.4rem] w-[34.8rem] h-[9.5rem] bg-[#FFFFFF] rounded-[8px] shadow-[0_1px_2px_rgba(16, 24, 40, 0.05)]">
                    <p class="text-[#000000] text-[1rem] leading-[1.4rem] font-semibold">Perks and rewards for you!</p>
                </div>
            </div>
        </div>
    </div>
</template>
