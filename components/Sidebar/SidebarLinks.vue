<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'SidebarLinks',

    components: {},

    props: {
    },

    setup(_props) {
        const links = [
            {
                name: "Home",
                route: "/",
                icon: ""
            },
            {
                name: "Gigs",
                route: "/gigs",
                icon: ""
            },
            {
                name: "Your Hires",
                route: "/your-hires",
                icon: ""
            },
            {
                name: "Invoices",
                route: "/invoices",
                icon: ""
            },
            {
                name: "Settings",
                route: "/settings",
                icon: ""
            },
            {
                name: "Perks and Rewards",
                route: "/perks-and-rewards",
                icon: ""
            }
        ]

    // expose to template and other options API hooks
        return {
            links
        }
    },

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
    <div class="py-[28px]">
        <div v-for="(link, index) in links" v-bind:key="index" class="">
            <NuxtLink :to="link.route" class="flex items-center space-x-[10.5px] px-[12px] bg-[#E9F2FF] w-[100%] h-[36px] rounded-[6px] text-[#0063F7] cursor-pointer mb-[4px]">
                <div class="h-[15px] w-[15px] bg-black"></div>
                <p class="font-medium text-[14px]">{{link.name}}</p>
            </NuxtLink>
        </div>
    </div>
</template>
