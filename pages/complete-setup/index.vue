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
    <div class="">
        <div class="px-[4.5rem] pt-[2.5rem]">
            <h2 class="text-[1.75rem] leading-[2.25rem] font-medium mb-[0.8rem]">Welcome to UnbugQA!</h2>
            <p class="text-[1.2rem] leading-[1.75rem] font-normal text-[#374151]">Hello John! Let’s get you set to start hiring awesome QA Engineers for your company.</p>
        </div>
        <div>
            <p>required for creating your first gig</p>
            <TaskLink TaskLink="/" TaskName="Complete your company profile" />
        </div>
    </div>
</template>

<style lang="postcss"></style>
    