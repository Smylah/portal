<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import RightArrowIcon from '../Base/Icon/RightArrowIcon.vue'
import UnbugQaIcon from '../Base/Icon/UnbugQaIcon.vue'

export default defineComponent({
  name: 'SidebarHeader',

  components: { RightArrowIcon, UnbugQaIcon },

  props: {},

  setup(_props, { root }) {
    // onMounted( ()=> {
    //     console.log(root.$route.path)
    // })

    const currentRoute = root.$route.path

    console.log(currentRoute)

    return {
      currentRoute,
    }
  },
})
</script>

<template>
  <div class="font-Inter">
    <div class="flex justify-between items-center">
      <h1 class="">
        <NuxtLink to="/" class="flex items-center space-x-[0.75rem]">
          <UnbugQaIcon />
          <h2 class="font-semibold text-[1.25rem]">UnbugQa</h2>
        </NuxtLink>
      </h1>
      <div class="flex items-center space-x-[0.75rem]">
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15H17L15.5951 13.5951C15.2141 13.2141 15 12.6973 15 12.1585V9C15 6.38757 13.3304 4.16509 11 3.34142V3C11 1.89543 10.1046 1 9 1C7.89543 1 7 1.89543 7 3V3.34142C4.66962 4.16509 3 6.38757 3 9V12.1585C3 12.6973 2.78595 13.2141 2.40493 13.5951L1 15H6M12 15V16C12 17.6569 10.6569 19 9 19C7.34315 19 6 17.6569 6 16V15M12 15H6"
            stroke="#111827"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="relative">
          <div
            class="w-[40px] h-[40px] rounded-full border-[1.875px] border-black"
          ></div>
          <div
            class="
              absolute
              flex
              justify-center
              items-center
              left-[25px]
              top-[25px]
              w-[15px]
              h-[15px]
              rounded-full
              bg-[#FFFFFF]
            "
          >
            <div class="w-[10px] h-[10px] rounded-full bg-[#22C55E]"></div>
          </div>
        </div>
        <!-- <img src="" alt="" class="aspect-square w-[2.rem] rounded-full border-2 border-black"> -->
      </div>
    </div>

    <div class="py-[1rem] my-[1.9rem]">
      <div class="flex space-x-[4px] items-center">
        <h2 class="font-semibold text-[1.2rem]">John Dalton</h2>
        <h2
          class="
            flex
            items-center
            font-medium
            text-[0.85rem] text-[#0063F7]
            bg-[#F5F5FF]
            px-[8px]
            rounded-[1.75rem]
            h-[1.5rem]
          "
        >
          Client
        </h2>
      </div>
      <p class="font-normal text-[1rem] text-[#6B7280]">John2022@gmail.com</p>
    </div>

    <NuxtLink
      to="/complete-setup/"
      class="
        flex
        justify-between
        items-center
        px-[0.9rem]
        bg-[#FFFBEB]
        w-[100%]
        h-[2.5rem]
        rounded-[6px]
        text-[#111827]
      "
      :class="{
        'border-[#F59E0B] border-[1px]': currentRoute === '/complete-setup/',
      }"
    >
      <p class="font-medium text-[14px]">Complete account setup</p>
      <RightArrowIcon />
    </NuxtLink>
  </div>
</template>
