<script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import RightArrowIcon from '../Base/Icon/RightArrowIcon.vue'

    export default defineComponent({
        name: 'ProfileBody',
        components: { RightArrowIcon },
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
        <div></div>
        <div class="flex justify-end">
            <button class="bg-[#267DFF] h-[2.8rem] px-[1.4rem] rounded-[0.75rem] flex items-center space-x-[10px] text-[#FFFFFF]">
                <p>Continue</p>
                <RightArrowIcon stroke="#FFFFFF"/>
            </button>
        </div>
    </div>
</template>

<style lang="postcss"></style>
    