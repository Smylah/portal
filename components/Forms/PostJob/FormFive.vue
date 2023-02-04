<script lang="ts">
import { defineComponent, inject, toRefs } from '@vue/composition-api'
import EditIcon from '../../Base/Icon/Edit.vue'
// import { state } from './FormOne.vue'

export default defineComponent({
  name: 'FormFive',
  components: { EditIcon },
  setup() {
    const forms = inject('form', [])
    const state = inject('state', {})

    return {
      forms,
      ...toRefs(state),
    }
  },
})
</script>
<template>
  <main>
    <section v-for="form in forms" :key="form.id" class="space-y-18 mt-18">
      <div class="flex justify-between">
        <p class="font-medium text-neutral400">
          {{ form.name.toUpperCase() }}
        </p>
        <EditIcon />
      </div>
      <div>
        <p class="font-medium">Job Intro:</p>
        <h5 class="text-neutral500">{{ jobTitle }}</h5>
      </div>
      <div>
        <p class="font-medium">Description:</p>
        <h5 class="text-neutral500">{{ introduction }}</h5>
      </div>
      <hr />
    </section>
  </main>
</template>
