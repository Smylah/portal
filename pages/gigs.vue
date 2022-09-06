<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import layouts from '~/mixins/layouts'

export default defineComponent({
    name: 'GigsPage',

    components: {},
    mixins: [layouts],
    layout: "talent",
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
        Gigs Layout Page
    </div>
</template>