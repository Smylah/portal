<script>
    export default {
        name: 'RightArrowIcon',
        props: {
            stroke: {
                type: String,
                default: '#1F2937',
            }
        },
    }
</script>
    
<template>
    <svg
        width="16" 
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9.55556 1.55556L15 7M15 7L9.55555 12.4444M15 7L1 7"
            :stroke="stroke"
            stroke-width="1.67"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
    