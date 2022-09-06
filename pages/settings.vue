<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import layouts from '~/mixins/layouts'

export default defineComponent({
    name: 'SettingsPage',

    components: {},
    mixins: [layouts],
    layout: "",
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
    <div class="bg-black">
        Settings Layout Page
    </div>
</template>