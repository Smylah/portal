<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
} from '@vue/composition-api'

export default defineComponent({
  name: 'BaseVisibilityChange',
  emits: ['state:visible', 'state:hidden'],
  setup(_, { emit, slots }) {
    const callback = () => {
      const visibilityState =
        // @ts-expect-error
        (document.webkitVisibilityState ||
          document.visibilityState) as DocumentVisibilityState

      emit(visibilityState === 'visible' ? 'state:visible' : 'state:hidden')
    }

    onBeforeMount(() => {
      document.addEventListener('visibilitychange', callback, { passive: true })
    })

    onBeforeUnmount(() => {
      document.removeEventListener('visibilitychange', callback)
    })

    return () => slots.default()?.[0] || null
  },
})
</script>
