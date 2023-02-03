<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import FacebookIcon from '../Base/Icon/facebookIcon.vue'
import InstagramIcon from '../Base/Icon/InstagramIcon.vue'
import LinkedinIcon from '../Base/Icon/LinkedinIcon.vue'
import TwitterIcon from '../Base/Icon/TwitterIcon.vue'
import UnbugQaIcon from '../Base/Icon/UnbugQaIcon.vue'

export interface link {
  link: string
  name: string
  id: number
}

export interface linksdata {
  id: number
  title: string
  link: Array<link>
}

export default defineComponent({
  name: 'FooterComponent',
  components: {
    UnbugQaIcon,
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedinIcon,
  },

  setup() {
    const linksdata = ref([
      {
        id: 1,
        title: 'Services',
        link: [
          { name: 'For employers', link: '#', id: 1 },
          { name: 'For QA Engineers', link: '#', id: 2 },
          { name: 'Hire QA Engineer', link: '#', id: 3 },
          { name: 'Join talent pool', link: '#', id: 4 },
          { name: 'Pricing', link: '#', id: 5 },
        ],
      },
      {
        id: 2,
        title: 'Resources',
        link: [
          { name: 'Help Centre', link: '#', id: 1 },
          { name: 'Affiliate Program', link: '#', id: 2 },
          { name: 'Blog', link: '#', id: 3 },
          { name: 'Academy', link: '#', id: 4 },
        ],
      },
      {
        id: 3,
        title: 'Company',
        link: [
          { name: 'About Us', link: '#', id: 1 },
          { name: 'Careers', link: '#', id: 2 },
          { name: 'Privacy Policy', link: '#', id: 3 },
          { name: 'Terms of Use', link: '#', id: 4 },
        ],
      },
    ] as Array<linksdata>)
    return {
      linksdata,
    }
  },
})
</script>

<template>
  <footer>
    <main
      class="py-160 container mx-auto flex flex-row justify-between text-base"
    >
      <div class="">
        <unbug-qa-icon class="mb-16" />
        <p class="font-medium text-neutral500">
          © Copyright {{ new Date().getFullYear() }} Designership.
        </p>
        <p class="font-medium text-neutral500">All rights reserved.</p>
      </div>

      <div class="flex space-x-64">
        <div
          class="flex flex-col space-y-8"
          v-for="links in linksdata"
          :key="links.id"
        >
          <p class="text-neutral400 mb-15">{{ links.title }}</p>
          <div v-for="link in links.link" :key="link.id">
            <nuxt-link
              to="`${link.link}`"
              class="font-medium text-neutral500"
              >{{ link.name }}</nuxt-link
            >
          </div>
        </div>

        <div>
          <p class="text-neutral400 mb-15">Follow us</p>
          <div class="flex flex-row space-x-16">
            <facebook-icon link="" />
            <twitter-icon />
            <instagram-icon />
            <linkedin-icon />
          </div>
        </div>
      </div>
    </main>
  </footer>
</template>
