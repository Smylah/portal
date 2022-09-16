<script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import ProfileHeader from '../../../components/CompleteProfilePage/ProfileHeader.vue'
    import ProfileBody from '../../../components/CompleteProfilePage/ProfileBody.vue'

    export default defineComponent({
        name: 'CompleteCompanyProfilePage',
        components: {ProfileHeader, ProfileBody},
        layout: 'modalSetup',
        transition: 'page-transition-slide-left',
        setup() {},
    })
</script> 
    
<template>
    <div class="flex flex-col items-center border-2 border-black w-[27.5rem] px-[1.75rem] mx-auto">
        <ProfileHeader level="1"/>
        <ProfileBody />
    </div>
</template>

<style lang="postcss"></style>
    