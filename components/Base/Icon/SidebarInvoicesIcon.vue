<script>
    export default {
        name: 'SidebarInvoicesIcon',
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
        width="14"
        height="18"
        viewBox="0 0 14 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M4.50008 10.6667L9.50008 5.66667M4.91677 6.08333H4.92511M9.08344 10.25H9.09177M12.8334 16.5V3.16667C12.8334 2.24619 12.0872 1.5 11.1667 1.5H2.83341C1.91294 1.5 1.16675 2.24619 1.16675 3.16667V16.5L4.08341 14.8333L7.00008 16.5L9.91675 14.8333L12.8334 16.5ZM5.33341 6.08333C5.33341 6.31345 5.14687 6.5 4.91675 6.5C4.68663 6.5 4.50008 6.31345 4.50008 6.08333C4.50008 5.85321 4.68663 5.66667 4.91675 5.66667C5.14687 5.66667 5.33341 5.85321 5.33341 6.08333ZM9.50008 10.25C9.50008 10.4801 9.31353 10.6667 9.08341 10.6667C8.8533 10.6667 8.66675 10.4801 8.66675 10.25C8.66675 10.0199 8.8533 9.83333 9.08341 9.83333C9.31353 9.83333 9.50008 10.0199 9.50008 10.25Z"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :stroke="stroke"
        />
    </svg>
</template>