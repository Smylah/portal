<script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import layouts from '~/mixins/layouts'
    import CloseModalIcon from '../components/Base/Icon/CloseModalIcon.vue'

    export default defineComponent({
        name: 'ModalSetupLayout',
    
        components: { CloseModalIcon },
        mixins: [layouts],
    
        props: {
        },
    
        setup(_props) {},
    
    })
    </script>
    
<template>
    <div class="bg-[#F5F5F5] w-[100vw] h-[100vh] pt-[4.5rem] px-[7rem]">
        <div class="flex justify-end">
            <CloseModalIcon />
        </div>
        <NuxtChild />
    </div>
</template>
    