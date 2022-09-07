<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import layouts from '~/mixins/layouts'
import Sidebar from '../components/Sidebar/Sidebar.vue'

export default defineComponent({
    name: 'TalentLayout',

    components: {Sidebar},
    mixins: [layouts],

    props: {
    },

    setup(_props) {},

})
</script>

<template>
    <div class="flex">
        <Sidebar />
        <NuxtChild />
    </div>
</template>
