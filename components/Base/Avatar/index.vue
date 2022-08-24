<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseAvatar',
  props: {
    initials: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      default: undefined,
    },
    size: {
      type: String as () => 'small' | 'medium' | 'large' | 'auto',
      default: 'medium',
    },
    color: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(_props) {
    const alt = computed(() => {
      return `Avatar for ${_props.name}`
    })

    return { alt }
  },
})
</script>

<template>
  <div
    class="rounded-full"
    :class="{
      'w-32 h-32 text-heading': size === 'small',
      'w-40 h-40 text-display-small': size === 'medium',
      'w-60 h-60 text-display-medium': size === 'large',
    }"
  >
    <Img
      v-if="src"
      :alt="alt"
      :src="src"
      class="h-full w-full object-contain rounded-full"
      referrerpolicy="no-referrer"
    />

    <p
      v-else-if="initials"
      class="uppercase h-full w-full rounded-[inherit] flex-centered font-medium pointer-events-none"
      :class="{
        'bg-decorative-surface-one': !(color || {}).background,
        'text-decorative-text-one': !(color || {}).text,
      }"
      :style="{
        'background-color': color.background,
        color: color.text,
      }"
    >
      {{ initials }}
    </p>

    <span
      v-else
      class="flex-centered w-full h-full pointer-events-none rounded-full bg-interactive-disabled"
    >
      <PIcon source="CustomersMinor" class="fill-icon-default" />
    </span>
  </div>
</template>
