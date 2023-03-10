<script lang="ts">
import { defineComponent, h, computed, ref } from '@vue/composition-api'
import type { Placement } from '@popperjs/core'
import Button from '~/components/Base/Button/index.vue'
import ComboBox from '~/components/Base/ComboBox/index.vue'
import type { ComboBoxPayload } from '~/components/Base/ComboBox/index.vue'

import { pseudoFocusOnMouseEnter } from '~/utils'
import eventKey from '~/utils/eventKey'
import { Duration } from '~/types'

export interface DropdownOption {
  title: string
  prependIcon?: string
  appendIcon?: string
  disabled?: boolean
  selected?: boolean
  class?: string
  onClick: (evt?: PointerEvent) => void
}

const scoping = { 'data-dropdown': '' }

export default defineComponent({
  name: 'BaseDropdown',
  components: { Button },
  model: {
    event: 'update:modelValue',
    prop: 'modelValue',
  },
  props: {
    blockClick: Boolean,
    option: {
      type: Array as () => DropdownOption[],
      default: () => [],
    },
    loopTabbing: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    placement: {
      type: String as () => Placement,
      default: 'bottom-end',
    },
    offset: {
      type: Array as unknown as () => [number, number],
      default: () => [0, 14],
    },
    active: {
      type: Boolean,
      default: undefined,
    },
    leaveDuration: {
      type: String as () => Duration,
      default: '300ms',
    },
    enterDuration: {
      type: String as () => Duration,
      default: '100ms',
    },
    leaveDelay: {
      type: String as () => Duration,
      default: undefined,
    },
    enterDelay: {
      type: String as () => Duration,
      default: undefined,
    },
    contentClass: {
      type: String,
      default: undefined,
    },
    disabled: Boolean,
  },
  setup(_props, { emit, slots }) {
    const props = computed(() => _props)

    const manualModel = ref(props.value.active)

    const modelSync = computed({
      get() {
        if (typeof props.value.modelValue === 'boolean') {
          return props.value.modelValue
        }

        return manualModel.value
      },
      set(val: boolean) {
        if (typeof val === 'boolean') {
          if (typeof props.value.modelValue === 'boolean') {
            emit('update:modelValue', val)
          }

          manualModel.value = val
        }
      },
    })

    return () =>
      h(ComboBox, {
        props: {
          offset: props.value.offset,
          placement: props.value.placement,
          modelValue: modelSync.value,
          blockClick: props.value.blockClick,
          leaveDuration: props.value.leaveDuration,
          enterDuration: props.value.enterDuration,
          leaveDelay: props.value.leaveDelay,
          enterDelay: props.value.enterDelay,
          loopTabbing: props.value.loopTabbing,
          disabled: props.value.disabled,
        },
        on: {
          'update:modelValue': (val: boolean) => {
            modelSync.value = val
          },
        },
        scopedSlots: {
          trigger: (slotProps: ComboBoxPayload) => {
            return slots?.default?.({
              ...slotProps,
              events: {
                click: slotProps.toggle,
                keydown: (evt: KeyboardEvent) => {
                  const key = eventKey(evt)

                  if (key === 'arrow_down') {
                    evt.preventDefault()

                    slotProps.open()
                  } else if (key === 'esc') {
                    evt.stopPropagation()

                    slotProps.close()
                  }
                },
                blur: slotProps.close,
              },
            })
          },

          default: (slotProps: ComboBoxPayload) => {
            return h(
              'div',
              {
                staticClass:
                  'shadow-3 rounded-lg bg-surface-default fade-enter:scale-[0.85] fade-enter:opacity-0 fade-enter:transform-gpu fade-enter-active:transform-gpu fade-leave:transform-gpu fade-leave-active:transform-gpu transition-[transform,opacity] fade-leave-to:scale-[0.95] fade-leave-to:opacity-0',
                  // hover:!transition-[none]
                class: [
                  props.value.contentClass,
                  {
                    'origin-[top_right]':
                      slotProps.popperInstance.state.placement === 'bottom-end',
                    'origin-[top_left]':
                      slotProps.popperInstance.state.placement ===
                      'bottom-start',
                    'origin-[bottom_right]':
                      slotProps.popperInstance.state.placement === 'top-end',
                    'origin-[bottom_left]':
                      slotProps.popperInstance.state.placement === 'top-start',
                  },
                ],
              },
              [
                slots?.append?.(slotProps),

                typeof slots?.content === 'undefined'
                  ? [
                      h(
                        'menu',
                        {
                          staticClass: 'py-8',
                        },
                        props.value.option.map((item: DropdownOption, key) => {
                          const getIcon = (position: 'prepend' | 'append') => {
                            const icon = item[`${position}Icon`]

                            return icon
                              ? h('PIcon', {
                                  props: {
                                    source: icon,
                                  },
                                  staticClass:
                                    'fill-icon-default shrink-0 mr-16',
                                  class: {
                                    'opacity-40': item.disabled,
                                  },
                                })
                              : null
                          }

                          return h(
                            'li',
                            {
                              key,
                              attrs: {
                                role: 'menuitem',
                                ...scoping,
                                'data-disabled': item.disabled || undefined,
                                'data-pseudo-focus':
                                  item.selected && !item.disabled
                                    ? 'true'
                                    : undefined,
                              },
                              staticClass: 'pseudo-focus dropdown-item',
                              class: item.class,

                              on: {
                                mouseenter: pseudoFocusOnMouseEnter,
                                click: (evt: PointerEvent) => {
                                  item.onClick?.(evt)
                                },
                              },
                            },
                            [
                              getIcon('prepend'),

                              h(
                                'span',
                                {
                                  staticClass: 'flex-grow',
                                },
                                [item.title]
                              ),

                              getIcon('append'),
                            ]
                          )
                        })
                      ),
                    ]
                  : typeof slots?.content === 'function'
                  ? slots.content({
                      events: {
                        mouseenter: pseudoFocusOnMouseEnter,
                      },
                      ...slotProps,
                    })
                  : slots?.content || null,

                slots?.prepend?.(slotProps),
              ]
            )
          },
        },
      })
  },
})
</script>
