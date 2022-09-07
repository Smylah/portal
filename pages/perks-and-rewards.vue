<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import layouts from '~/mixins/layouts'

export default defineComponent({
    name: 'PerksAndRewardsPage',

    components: {},
    mixins: [layouts],
    layout: "talent",
    props: {
    },

    setup(_props) {},

    head() {
        return {
            title: 'PerksAndRewardsPage',
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
        PerksAndRewardsPage Layout Page
    </div>
</template>