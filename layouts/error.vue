<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import layouts from '~/mixins/layouts'

export default defineComponent({
    name: 'ErrorLayout',

    components: {},
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
        404 error!
    </div>
</template>
