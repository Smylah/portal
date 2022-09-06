<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import layouts from '~/mixins/layouts'
import Sidebar from '../components/Sidebar/Sidebar.vue'

export default defineComponent({
    name: 'DefaultLayout',

    components: {Sidebar},
    mixins: [layouts],

    props: {
    },

    setup(_props) {},

    head() {
        return {
            title: 'Home',
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
    <div>
        <Sidebar />
        <NuxtChild />
    </div>
</template>
