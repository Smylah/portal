<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import AppleIcon from '../../../../../components/Base/Icon/AppleIcon.vue'
import AndroidIcon from '../../../../../components/Base/Icon/AndroidIcon.vue'
import WindowsIcon from '../../../../../components/Base/Icon/WindowsIcon.vue'
import LinuxIcon from '../../../../../components/Base/Icon/LinuxIcon.vue'
import DefaultOsIcon from '../../../../../components/Base/Icon/DefaultOsIcon.vue'
import { formatTime, splitPath } from '~/utils'
import { dynamicPageTransition } from '~/utils/pageTransition'
import SearchField from '~/components/Base/SearchField/index.vue'
import FadeTransition from '~/components/Base/FadeTransition/index.vue'
import { RootState } from '~/store'

export interface UserSession {
  name: string
  region: {
    isoCode: string
    country: string
    state: string
  }
  compRate: number
  date: string
  avgDuration: string
  device: {
    type: 'mobile' | 'desktop'
    os: string
  }
  id: string
  done: boolean
}

export default defineComponent({
  name: 'AppProjectViewResultUserSessionsPage',
  components: {
    SearchField,
    FadeTransition,
    AppleIcon,
    AndroidIcon,
    WindowsIcon,
    LinuxIcon,
    DefaultOsIcon,
  },

  transition: (to, from) => {
    const splitFrom = splitPath(from?.path || '')

    if (splitFrom[2] === 'view-result') {
      if (/analytics|comments/.test(splitFrom[3])) {
        return 'page-transition-slide-right'
      }
      return 'page-transition-slide-left'
    }

    return dynamicPageTransition({
      to,
      from,
    })
  },

  setup(_, { root }) {
    const sortedTh = ref<number>(null)

    const results = computed(() => {
      return (root.$store.state as RootState).projectSuite.viewResult
    })

    const sessions = computed<UserSession[]>(() => {
      return (results.value.answers || []).map((val) => {
        const formatDate = new Date(val.startTime)
          .toLocaleString('en', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
          })
          .replace(/,/g, '')
          .replace(/\s\w+$/, (x) => x.trim())

        return {
          id: val.id,
          compRate: 100,
          date: formatDate,
          avgDuration: val.done
            ? formatTime(
                new Date(val.doneTime).getTime() -
                  new Date(val.startTime).getTime(),
                true
              )
            : 'In progress',
          device: {
            type: val.deviceInformation.device,
            os: val.deviceInformation.os,
          },
          region: {
            country: val.deviceLocation?.country?.name,
            state: val.deviceLocation?.state,
            isoCode: val.deviceLocation?.country?.isoCode,
            flag: val.deviceLocation?.country?.flag,
          },
          name: val.username,
          done: val.done,
        } as UserSession
      })
    })

    const thead = [
      {
        title: 'Partipants',
        class: 'text-left px-16',
      },
      {
        title: 'Region',
        class: 'text-center px-16',
      },
      {
        title: 'Comp rate',
        class: 'text-left px-16',
      },
      {
        title: 'Date & Time',
        class: 'text-left px-16',
      },
      {
        title: 'Avg. Dur',
        class: 'text-left px-16',
      },
      {
        title: 'Device',
        class: 'text-left px-16',
      },
      {
        title: 'Action',
        class: 'text-left px-16',
        sort: false,
      },
    ]

    const getOsIcon = (os: string) => {
      switch (os.toLowerCase()) {
        case 'mac':
          return 'AppleIcon'
        case 'windows':
          return 'WindowsIcon'
        case 'android':
          return 'AndroidIcon'
        case 'ios':
          return 'AppleIcon'
        case 'ipad':
          return 'AppleIcon'
        case 'linux':
          return 'LinuxIcon'
        default:
          return 'DefaultOsIcon'
      }
    }

    return { sessions, thead, sortedTh, getOsIcon }
  },

  fetch() {},

  head: {
    title: 'Test results user sessions',
  },
})
</script>

<template>
  <div class="rounded-lg p-20 bg-surface-default shadow-2">
    <div class="flex items-center mb-20">
      <h2 class="font-semibold text-heading">User sessions</h2>

      <div class="grow flex justify-end">
        <SearchField
          placeholder="Sessions"
          outlined
          class="bg-surface-default max-w-[372px] w-full"
          :readonly="!sessions.length"
        />
      </div>
    </div>

    <FadeTransition>
      <p
        v-if="!sessions.length"
        class="bg-action-primary-disabled border border-divider px-10 h-40 rounded-[3px] w-full flex items-center text-text-subdued"
      >
        <strong> No user sessions yet </strong>
      </p>

      <table
        v-else
        class="w-full"
        :aria-label="`Sorted by ${
          typeof sortedTh === 'number' ? thead[sortedTh].title : 'default'
        }`"
      >
        <thead class="shadow-divide-bottom h-52">
          <th
            v-for="(th, i) in thead"
            :key="i"
            class="font-normal"
            :class="[
              th.class,
              th.sort === false
                ? ''
                : [
                    'cursor-pointer',
                    {
                      'sorted-by': sortedTh === i,
                    },
                  ],
            ]"
            v-on="
              th.sort === false
                ? undefined
                : {
                    click: () => {
                      // sortedTh = i
                    },
                  }
            "
          >
            {{ th.title }}
          </th>
        </thead>

        <tbody>
          <tr
            v-for="(tr, i) in sessions"
            :key="i"
            class="shadow-divide-bottom h-52"
          >
            <td>
              <div class="wrapper min-w-[150px]">
                <Checkbox :id="`${tr.id}-checkbox`" label-hidden class="flex" />

                <span>
                  {{ tr.name }}
                </span>
              </div>
            </td>

            <td>
              <div class="flex-centered">
                <Tooltip
                  v-slot="{ events }"
                  :label="
                    tr.region.country
                      ? `${tr.region.state}, ${tr.region.country}`
                      : 'Unknown location'
                  "
                  trigger-class="!w-fit !h-16"
                  placement="right"
                >
                  <span
                    class="leading-[16px] inline-block text-[18px] cursor-default"
                    v-on="events"
                  >
                    <!-- <Img
                      v-if="tr.region.country"
                      :alt="`${tr.region.country} flag`"
                      :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${tr.region.isoCode.toUpperCase()}.svg`"
                      class="h-16 w-16 shrink-0 drop-shadow-[0px_0.25px_0.25px_#000]"
                      hide-reload-icon
                    /> -->
                    <span v-if="tr.region.country">
                      {{ tr.region.flag }}
                    </span>

                    <span v-else class="cursor-default"> x </span>
                  </span>
                </Tooltip>
              </div>
            </td>

            <td>
              <div class="px-16">{{ tr.compRate }}%</div>
            </td>

            <td>
              <div class="px-16">
                {{ tr.date }}
              </div>
            </td>

            <td>
              <div class="px-16">
                {{ tr.avgDuration }}
              </div>
            </td>

            <td>
              <div class="w-full flex-centered">
                <div class="w-fit">
                  <Tooltip placement="right">
                    <template #default="{ events }">
                      <span v-on="events">
                        <PIcon
                          :source="
                            tr.device.type === 'desktop'
                              ? 'DesktopMajor'
                              : 'MobileMajor'
                          "
                          class="fill-icon-default"
                        />
                      </span>
                    </template>

                    <template #content>
                      <div class="py-2">
                        <div class="flex-centered mb-4">
                          <Component
                            :is="getOsIcon(tr.device.os)"
                            class="w-14 h-14"
                          />
                        </div>

                        <p class="text-center">
                          {{ tr.device.os }} {{ tr.device.type }}
                        </p>
                      </div>
                    </template>
                  </Tooltip>
                </div>
              </div>
            </td>

            <td>
              <div class="flex-centered">
                <Button plain> View </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </FadeTransition>
  </div>
</template>

<style scoped lang="postcss">
.wrapper {
  @apply flex items-center space-x-12 pl-16;
}

.sorted-by {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #202223;
}
</style>
