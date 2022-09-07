<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import layouts from '~/mixins/layouts'

export default defineComponent({
    name: 'YourHiresPage',

    components: {},
    mixins: [layouts],
    layout: "talent",
    props: {
    },

    setup(_props) {},

    head() {
        return {
            title: 'YourHires',
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
        YourHires Layout Page
    </div>
</template>