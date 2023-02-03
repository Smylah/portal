<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api'
import FormSelect from '../../Base/FormInput/select.vue'

export default defineComponent({
  name: 'FormTwo',
  components: { FormSelect },
  setup() {
    const data = ref(['manager', 'director', 'CEO'])
    const newTag = ref('')
    const popularSkills = [
      'Cypress',
      'Jmeter',
      'CI/CD',
      'Black box testing',
      'Apium',
      'Regression test',
      'Selenuim web driver',
    ]
    const state = reactive({
      proficiency: '',
      senorityLevel: '',
      role: '',
      skills: [],
    })
    function addTag() {
      const { skills } = state
      if (newTag.value !== '') {
        const tag = newTag.value.trim()
        skills.push(tag)
        newTag.value = ''
      }
    }

    function addTagFromList(tag) {
      state.skills.push(tag)
    }

    function removeTag(index) {
      const { skills } = state
      skills.splice(index, 1)
    }

    function deleteTag() {
      const { skills } = state
      removeTag(skills.length - 1)
    }

    return {
      data,
      ...toRefs(state),
      newTag,
      popularSkills,
      addTag,
      addTagFromList,
      removeTag,
      deleteTag,
    }
  },
})
</script>
<template>
  <form>
    <div class="flex space-x-30">
      <FormSelect
        label="QA Proficiency"
        :data="data"
        :modelValue.sync="proficiency"
        class="basis-1/2"
      />
      <FormSelect
        label="Seniority level"
        :data="data"
        :modelValue.sync="senorityLevel"
        class="basis-1/2"
      />
    </div>

    <FormSelect
      :data="data"
      label="Languages fluent in (Optional)"
      :modelValue.sync="role"
    />

    <div class="flex-col flex-wrap space-y-16">
      <div>
        <label for="skills">Skills</label>
        <div
          class="flex flex-row flex-wrap border-n-300 rounded-md px-12 py-10 text-sm text-black"
        >
          <div
            v-for="(skill, index) in skills"
            v-show="skills"
            :key="index"
            class="skill"
          >
            {{ skill }}
            <button @click="removeTag(index)">x</button>
          </div>
          <input
            v-model="newTag"
            :placeholder="skills.length === 0 ? 'Search skills' : null"
            class="border-none bg-transparent px-0 py-0 w-fit"
            @keyup.188="addTag"
            @keyup.space="addTag"
            @keyup.delete="deleteTag"
          />
        </div>
      </div>

      <div>
        <label>Popular skills for QA Engineers</label>
        <div class="flex flex-wrap my-20">
          <div
            v-for="(tag, index) in popularSkills"
            :key="index"
            class="skill cursor-pointer mb-10"
            @click="addTagFromList(tag)"
          >
            {{ tag }} +
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.skill {
  @apply rounded-xl text-sm font-medium px-10 py-6 bg-neutral50 mr-6;
}
</style>
