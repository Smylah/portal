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
    <div class="flex flex-col w-[280px] h-[100vh] bg-white px-[1.25rem] pt-[2rem] border-2 border-black">
        <SidebarHeader />
        <SidebarLinks />
    </div>
</template>
