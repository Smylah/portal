<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import ListItem from '../../components/App/Trash/ListItem/index.vue'
import { Layout } from '~/types'
import { sleep, splitPath } from '~/utils'
import { dynamicPageTransition } from '~/utils/pageTransition'
import FadeTransition from '~/components/Base/FadeTransition/index.vue'
import Intersection from '~/components/Base/Intersection/index.vue'
import Tooltip from '~/components/Base/Tooltip/index.vue'
import { RootState } from '~/store'
import Dialog from '~/components/App/Trash/Dialog/index.vue'

export default defineComponent({
  name: 'AppTrashPage',
  components: { ListItem, FadeTransition, Intersection, Tooltip, Dialog },
  layout: 'app' as Layout,
  transition: (to, from) =>
    dynamicPageTransition({
      to,
      from,
      useFade:
        !from ||
        splitPath(to.path).length === splitPath(from?.path || '').length,
    }),
  setup(_, { root }) {
    const showDialog = ref(false)

    const dialogType = ref<'delete' | 'recover'>(null)

    const selected = ref<string[]>([])

    const headerIntersecting = ref(true)

    const selectedActions: {
      title: string
      onClick: () => void
      primary?: boolean
      destructive?: boolean
    }[] = ['Recover', 'Delete'].map((title, index) => {
      return {
        title: `${title} selected`,
        onClick: async () => {
          selectedItem.value = null

          await root.$nextTick()

          openDialog(title.toLowerCase() as typeof dialogType.value)
        },
        primary: index === 0,
        destructive: index === 1,
      }
    })

    const trashItems = computed(() => {
      return (root.$store.state as RootState).trash.projects
    })

    const selectedItem = ref<typeof trashItems.value>(null)

    const selectedProjects = computed(() => {
      if (selectedItem.value) {
        return selectedItem.value
      }

      return selected.value.map((x) => {
        return trashItems.value.find((val) => val.id === x)
      })
    })

    const allSelected = computed(() => {
      return trashItems.value.length === selected.value.length
    })

    const toggleSelectAll = () => {
      if (allSelected.value) {
        selected.value = []
      } else {
        selected.value = trashItems.value.map((x) => x.id)
      }
    }

    const onItemCheck = (evt: { id: string; checked: boolean }) => {
      const { id, checked } = evt

      if (checked) {
        selected.value = Array.from(new Set([...selected.value, id]))
      } else {
        selected.value = selected.value.filter((x) => x !== id)
      }
    }

    const onHeaderIntersection = (evt: IntersectionObserverEntry) => {
      headerIntersecting.value = evt.isIntersecting
    }

    const openDialog = async (type: typeof dialogType.value) => {
      dialogType.value = type

      await root.$nextTick()

      showDialog.value = true
    }

    const itemAction = async (
      type: typeof dialogType.value,
      item: typeof trashItems.value[0]
    ) => {
      selectedItem.value = [item]

      await root.$nextTick()

      await openDialog(type)
    }

    const clearSelected = async () => {
      await sleep(150)

      selected.value = []

      selectedItem.value = null
    }

    return {
      trashItems,
      selected,
      selectedItem,
      allSelected,
      selectedActions,
      headerIntersecting,
      showDialog,
      dialogType,
      selectedProjects,
      toggleSelectAll,
      onItemCheck,
      onHeaderIntersection,
      openDialog,
      itemAction,
      clearSelected,
    }
  },

  async fetch({ store }) {
    await store.dispatch('trash/getAllItems')
  },

  head: {
    title: 'Trash',
    meta: [
      {
        name: 'description',
        content: 'View recently deleted tests',
        vmid: 'description',
        hid: 'description',
      },
    ],
  },
})
</script>

<template>
  <div class="w-full p-32 pb-96">
    <div class="max-w-app mx-auto isolate">
      <Intersection
        :config="{ rootMargin: '-62px 0px 0px 0px' }"
        root="main"
        :disabled="!selected.length"
        @update:entry="onHeaderIntersection"
      >
        <div
          class="text-heading leading-[20px] text-text-subdued flex justify-between"
        >
          <template v-if="trashItems.length">
            <h2>Trash items will be deleted after 30 days</h2>

            <p class="text-body">
              {{ trashItems.length }} project{{
                trashItems.length > 1 ? 's' : ''
              }}
              archived.
            </p>
          </template>

          <p v-else class="font-semibold">No archived project!</p>
        </div>
      </Intersection>

      <FadeTransition>
        <div
          v-if="selected.length"
          class="sticky top-[calc(64px)] z-10 bg-surface-neutral-disabled -mb-10 py-10 fill-after after:border-b after:border-b-divider after:transition-opacity after:opacity-0 after:z-1"
          :class="{ 'after:!opacity-100': !headerIntersecting }"
        >
          <div class="flex items-center justify-between">
            <Tooltip
              v-slot="{ events }"
              :disabled="!allSelected"
              :label="`${selected.length} item${
                selected.length > 1 ? 's' : ''
              }`"
              placement="right"
              open-delay="100"
            >
              <Id v-slot="{ id }">
                <label
                  :for="id"
                  class="rounded-l bg-surface-default p-8 pr-16 block cursor-pointer"
                  v-on="events"
                >
                  <Checkbox
                    :id="id"
                    :key="allSelected"
                    :indeterminate="!allSelected"
                    :checked="allSelected"
                    class="cursor-pointer"
                    @on-change="toggleSelectAll"
                  >
                    <span
                      class="font-semibold text-interactive-default cursor-pointer"
                    >
                      {{ allSelected ? 'All' : selected.length }} selected
                    </span>
                  </Checkbox>
                </label>
              </Id>
            </Tooltip>

            <div class="flex space-x-8 items-center">
              <Button
                v-for="(action, i) in selectedActions"
                :key="i"
                :primary="action.primary"
                :destructive="action.destructive"
                @click="action.onClick"
              >
                {{ action.title }}
              </Button>
            </div>
          </div>
        </div>
      </FadeTransition>

      <TransitionGroup
        tag="ul"
        enter-class="opacity-0"
        move-class="transition-[transform,opacity]"
        enter-active-class="transition-[transform,opacity]"
        leave-active-class="transition-[transform,opacity]"
        leave-to-class="opacity-0"
        class="mt-10 grid gap-y-10"
      >
        <ListItem
          v-for="item in trashItems"
          :key="item.id"
          :project="item"
          :checked="selected.includes(item.id)"
          :select-mode="!!selected.length"
          @on-change="onItemCheck"
          @on-delete="itemAction('delete', item)"
          @on-recover="itemAction('recover', item)"
        />
      </TransitionGroup>
    </div>

    <Dialog
      v-if="selected.length || selectedItem"
      v-model="showDialog"
      :projects="selectedProjects"
      :type="dialogType || ''"
      @on-success="clearSelected"
    />
  </div>
</template>
