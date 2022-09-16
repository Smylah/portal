<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SidebarHomeIcon from '../Base/Icon/SidebarHomeIcon.vue'
import SidebarGigsIcon from '../Base/Icon/SidebarGigsIcon.vue'
import SidebarYourHiresIcon from '../Base/Icon/SidebarYourHiresIcon.vue'
import SidebarInvoicesIcon from '../Base/Icon/SidebarInvoicesIcon.vue'
import SidebarSettingsIcon from '../Base/Icon/SidebarSettingsIcon.vue'
import SidebarPersAndRewardsIcon from '../Base/Icon/SidebarPersAndRewardsIcon.vue'

export default defineComponent({
    name: 'SidebarLinks',

    components: {
        SidebarHomeIcon,
        SidebarGigsIcon,
        SidebarYourHiresIcon,
        SidebarInvoicesIcon,
        SidebarSettingsIcon,
        SidebarPersAndRewardsIcon
    },

    props: {
    },

    setup(_props) {
        const links = [
            {
                name: "Home",
                route: "/",
            },
            {
                name: "Gigs",
                route: "/gigs",
            },
            {
                name: "Your Hires",
                route: "/your-hires",
            },
            {
                name: "Invoices",
                route: "/invoices",
            },
            {
                name: "Settings",
                route: "/settings",
            },
            {
                name: "Perks and Rewards",
                route: "/perks-and-rewards",
            }
        ]
        
        // expose to template and other options API hooks
        return {
            links
        }
        
    },
})
</script>

<template>
    <div class="py-[28px]">
        <div v-for="(link, index) in links" v-bind:key="index" class="">
            <NuxtLink :to="link.route"
                class="flex items-center space-x-[10.5px] px-[12px] bg-[#E9F2FF] w-[100%] h-[36px] rounded-[6px] text-[#0063F7] cursor-pointer mb-[4px]
            ">
                <SidebarHomeIcon v-if="link.name==='Home'" :stroke="'#267DFF'"/>
                <SidebarGigsIcon v-if="link.name==='Gigs'"/>
                <SidebarYourHiresIcon v-if="link.name==='Your Hires'"/>
                <SidebarInvoicesIcon v-if="link.name==='Invoices'"/>
                <SidebarSettingsIcon v-if="link.name==='Settings'"/>
                <SidebarPersAndRewardsIcon v-if="link.name==='Perks and Rewards'"/>
                <p class="font-medium text-[1rem] leading-[1.4rem]">{{link.name}}</p>
            </NuxtLink>
        </div>
    </div>
</template>

