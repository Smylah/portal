<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import formElement from '@/mixins/formElement'
import { uid } from '~/utils'

export default defineComponent({
  name: 'BaseTextField',

  mixins: [formElement],
  model: {
    event: 'update:modelValue',
    prop: 'modelValue',
  },
  props: {
    modelValue: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    updateModelValue: {
      type: Function,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      manualModel: this.value,
      uid: uid(),
    }
  },
  computed: {
    modelSync: {
      get() {
        if (typeof this.modelValue === 'string') {
          return this.modelValue as string
        }

        return this.manualModel as string
      },

      set(val: string) {
        if (typeof val === 'string' && !this.disabled) {
          this.$emit('update:modelValue', val)

          if (typeof this.modelValue === 'string') {
            if (typeof this.updateModelValue === 'function') {
              this.updateModelValue(val)
            }
          }

          this.manualModel = val
        }
      },
    },
  },
  created() {
    if (
      !this.modelSync &&
      typeof (
        this.$attrs.showCharacterCount || this.$attrs['show-character-count']
      ) !== 'undefined'
    ) {
      this.modelSync = ' '

      this.$nextTick(() => {
        this.modelSync = ''
      })
    }
  },
})
</script>

<template>
  <PTextField
    :id="id || uid"
    ref="root"
    v-model="modelSync"
    v-bind="$attrs"
    :value="value"
    :disabled="disabled"
    :label="label"
    :help-text="helpText"
    :type="type"
    class="TextField"
    :style="{ '--height': height }"
    v-on="$listeners"
  >
    <template #prefix> <slot name="prefix" /> </template>

    <template v-if="$slots.default" #label>
      <slot>
        {{ label }}
      </slot>
    </template>

    <template #suffix> <slot name="suffix" /> </template>
  </PTextField>
</template>

<style scoped>
.TextField >>> .Polaris-TextField {
  min-height: var(--height);
}
</style>
