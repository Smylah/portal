<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// import DropdownIcon from '../Icon/DropdownIcon.vue'

export default defineComponent({
  name: 'FormSelect',
  // components: DropdownIcon ,
  transition: 'page-transition-slide-left',
  props: {
    label: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  setup() {},
})
</script>

<template>
  <div>
    <label :for="label">{{ label }}</label>
    <select
      :id="label"
      :v-model="modelValue"
      required
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled selected>{{ label }}</option>
      <option v-for="value in data" :key="value" :value="value">
        {{ value }}
      </option>
    </select>
  </div>
</template>

<style lang="postcss"></style>
