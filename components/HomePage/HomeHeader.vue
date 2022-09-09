<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'HomeHeader',

    components: {},

    props: {
    },

    setup(_props) {},
})
</script>

<template>
    <div class="px-[4.5rem] pt-[2.5rem]">
        <h2 class="text-[1.75rem] leading-[2.25rem] font-medium mb-[0.8rem]">Welcome, John</h2>
        <p class="text-[1.2rem] leading-[1.75rem] font-normal text-[#374151]">Here’s a quick summary of your activities so far.</p>
    </div>
</template>
