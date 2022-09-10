<script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import layouts from '~/mixins/layouts'

    
    export default defineComponent({
        name: 'TaskLinkComponent',
    
        components: {},
        mixins: [layouts],
    
        props: {
            TaskName: {
                type: String
            },
            TaskLink: {
                type: String
            }
        },
    
        setup(_props) {},

    })
</script>
    
<template>
    <NuxtLink class="flex justify-between items-center bg-white pl-[1.35rem] py-[1.2rem] pr-[1.65rem] rounded-[8px] w-[34rem]" :to="TaskLink">
        <div class="flex items-center"> 
            <div class="bg-black w-[14px] h-[14px] rounded-full"></div>
            <p class="text-[1.2rem] leading-[1.75rem] font-medium text-[#111827] pl-[1.4rem]">{{TaskName}}</p>
        </div>
        <div class="bg-black w-[14px] h-[11px]"></div>
    </NuxtLink>
</template>
    