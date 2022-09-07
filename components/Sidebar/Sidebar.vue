<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import layouts from '~/mixins/layouts'
import SidebarHeader from './SidebarHeader.vue'
import SidebarLinks from './SidebarLinks.vue'

export default defineComponent({
    name: 'Sidebar',

    components: {SidebarHeader, SidebarLinks},
    mixins: [layouts],

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
    <div class="flex flex-col w-[20rem] h-[100vh] bg-white px-[2rem] pt-[2.5rem]">
        <SidebarHeader />
        <SidebarLinks />
    </div>
</template>
