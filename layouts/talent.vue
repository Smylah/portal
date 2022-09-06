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
    <div>
        <Sidebar />
        <div>
            <nuxt-link to="/" > Home Page </nuxt-link>
            <nuxt-link to="/home" > Talent Page </nuxt-link>
            <nuxt-link to="/settings" > Settings Page </nuxt-link>
            <nuxt-link to="/gigs" > Gigs Page </nuxt-link>
        </div>
        <NuxtChild />
    </div>
</template>
