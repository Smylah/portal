<script>
    export default {
        name: 'SidebarGigsIcon',
        props: {
            stroke: {
                type: String,
                default: '#6B7280',
            },
        },
    }
</script>
    
<template>
    <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M16.5 11.0462C14.1839 11.9837 11.6523 12.5 9 12.5C6.34775 12.5 3.81608 11.9837 1.5 11.0462M12.3333 5V3.33334C12.3333 2.41286 11.5871 1.66667 10.6667 1.66667H7.33333C6.41286 1.66667 5.66667 2.41286 5.66667 3.33334V5M9 10H9.00833M3.16667 16.6667H14.8333C15.7538 16.6667 16.5 15.9205 16.5 15V6.66667C16.5 5.7462 15.7538 5 14.8333 5H3.16667C2.24619 5 1.5 5.7462 1.5 6.66667V15C1.5 15.9205 2.24619 16.6667 3.16667 16.6667Z"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :stroke="stroke"
        />
    </svg>
</template>