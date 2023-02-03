<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// import layouts from '~/mixins/layouts'

import SidebarHomeIcon from '../Base/Icon/SidebarHomeIcon.vue'
import SidebarGigsIcon from '../Base/Icon/SidebarGigsIcon.vue'
import SidebarYourHiresIcon from '../Base/Icon/SidebarYourHiresIcon.vue'
import SidebarInvoicesIcon from '../Base/Icon/SidebarInvoicesIcon.vue'
import SidebarSettingsIcon from '../Base/Icon/SidebarSettingsIcon.vue'
import SidebarPersAndRewardsIcon from '../Base/Icon/SidebarPersAndRewardsIcon.vue'
import UnbugQaIcon from '../Base/Icon/UnbugQaIcon.vue'
import NotificationIcon from '../Base/Icon/NotificationIcon.vue'
import Messaging from '../Base/Icon/Messaging.vue'

export default defineComponent({
  name: 'SidebarComponent',

  components: {
    SidebarHomeIcon,
    SidebarGigsIcon,
    SidebarYourHiresIcon,
    SidebarInvoicesIcon,
    SidebarSettingsIcon,
    SidebarPersAndRewardsIcon,
    UnbugQaIcon,
    NotificationIcon,
    Messaging,
  },

  props: {},

  setup(_props, { root }) {
    const links = [
      {
        name: 'Home',
        route: '/',
      },
      {
        name: 'Jobs',
        route: '/jobs',
      },
      {
        name: 'Your Hires',
        route: '/your-hires',
      },
      {
        name: 'Messages',
        route: '/messages',
      },
      {
        name: 'Invoices',
        route: '/invoices',
      },
    ]

    const bottomLinks = [
      {
        name: 'Settings',
        route: '/settings',
      },
      {
        name: 'Perks and Rewards',
        route: '/perks-and-rewards',
      },
    ]

    const currentRoute = root.$route.path
    console.log(currentRoute)

    // expose to template and other options API hooks
    return {
      links,
      bottomLinks,
      currentRoute,
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
  <main
    class="
      w-[20rem]
      h-[100vh]
      bg-white
      px-[2rem]
      pt-[2.5rem]
      border-r-2 border-solid border-neutral200
    "
  >
    <div class="flex items-center justify-between">
      <UnbugQaIcon />
      <NotificationIcon />
    </div>

    <div
      class="flex flex-col text-neutral700 my-[32px] h-[75vh] justify-between"
    >
      <div>
        <div v-for="(link, index) in links" :key="index">
          <NuxtLink
            :to="link.route"
            class="link"
            :class="{ 'bg-[#E9F2FF]': isActive, 'bg-none': isNotActive }"
          >
            <SidebarHomeIcon v-if="link.name === 'Home'" />
            <!-- :stroke="'#267DFF'" -->
            <SidebarGigsIcon v-if="link.name === 'Jobs'" />
            <SidebarYourHiresIcon v-if="link.name === 'Your Hires'" />
            <Messaging v-if="link.name === 'Messages'" />
            <SidebarInvoicesIcon v-if="link.name === 'Invoices'" />
            <p class="font-medium text-[1rem] leading-[1.4rem]">
              {{ link.name }}
            </p>
          </NuxtLink>
        </div>
      </div>

      <div>
        <div v-for="(link, index) in bottomLinks" :key="index">
          <NuxtLink
            :to="link.route"
            class="link"
            :class="{ 'bg-[#E9F2FF]': isActive, 'bg-none': isNotActive }"
          >
            <SidebarSettingsIcon v-if="link.name === 'Settings'" />
            <SidebarPersAndRewardsIcon
              v-if="link.name === 'Perks and Rewards'"
            />
            <p class="font-medium text-[1rem] leading-[1.4rem]">
              {{ link.name }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.link {
  @apply flex items-center space-x-[10.5px] w-[100%] h-[36px] rounded-[6px] cursor-pointer mb-[4px];
}
</style>
