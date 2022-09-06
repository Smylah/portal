<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import layouts from '~/mixins/layouts'

export default defineComponent({
    name: 'Sidebar',

    components: {},
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
    <div>Sidebar</div>
</template>
