<script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import TaskLink from '../../components/TaskLink/index.vue'
    
    export default defineComponent({
        name: 'CompleteSetupPage',
        components: {TaskLink},
        layout: 'talent',
        transition: 'page-transition-slide-left',
        setup() {},
        
        head: () => ({
            titleTemplate: '',
            title: '',
        }),
    })
</script> 
    
<template>
    <div class="px-[4.5rem] pt-[2.5rem]">
        <div class="">
            <h2 class="text-[1.75rem] leading-[2.25rem] font-medium mb-[0.8rem]">Welcome to UnbugQA!</h2>
            <p class="text-[1.2rem] leading-[1.75rem] font-normal text-[#374151] max-w-[45rem]">Hello John! Let’s get you set to start hiring awesome QA Engineers for your company.</p>
        </div>
        <div class="mt-[2.25rem]">
            <p class="text-[#DC2626] mb-[0.8rem] text-[1rem] leading-[1.75rem] uppercase font-semibold">required for creating your first gig</p>
            <TaskLink TaskLink="/complete-setup/complete-company-profile" TaskName="Complete your company profile" />
        </div>
        <div class="mt-[1.755rem]">
            <p class="text-[#6B7280] mb-[0.8rem] text-[1rem] leading-[1.75rem] uppercase font-semibold">get started</p>
            <div class="flex flex-col space-y-[1.45rem]">
                <TaskLink TaskLink="/" TaskName="Learn how UnbugQA works" />
                <TaskLink TaskLink="/" TaskName="Create your first gig" />
                <TaskLink TaskLink="/" TaskName="Add payment method" />
            </div>
        </div>
        <div class="mt-[1.75rem]">
            <p class="text-[#6B7280] mb-[0.8rem] text-[1rem] leading-[1.75rem] uppercase font-semibold">optional</p>
            <TaskLink TaskLink="/" TaskName="Fund wallet to process payments faster" />
        </div>
    </div>
</template>

<style lang="postcss"></style>
    