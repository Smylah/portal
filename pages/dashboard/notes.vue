<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { Layout } from '~/types'
import { splitPath } from '~/utils'
import { dynamicPageTransition } from '~/utils/pageTransition'
import SearchField from '~/components/Base/SearchField/index.vue'
import NoteSection from '~/components/App/Notes/NoteSection/index.vue'
import { RootState } from '~/store'
import Spinner from '~/components/Base/Spinner/index.vue'

export default defineComponent({
  name: 'AppNotesPage',
  components: { SearchField, NoteSection, Spinner },
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
    const notes = computed(() => {
      return (root.$store.state as RootState).notes
    })

    const searchValue = ref('')

    const projects = computed(() => {
      if (!searchValue.value.trim()) {
        return notes.value.projects
      }

      const searchRegExp = new RegExp(searchValue.value, 'i')

      const highlight = (val: string) => {
        return `<span class="text-text-subdued/80">${val.replace(
          searchRegExp,
          `<mark class="bg-transparent text-text-default">${searchValue.value}</mark>`
        )}</span>`
      }

      return notes.value.projects
        .map((project) => {
          // check if title matches search
          const titleMatches = searchRegExp.test(project.title)

          if (titleMatches) {
            return {
              ...project,
              title: highlight(project.title),
            }
          }

          // check if note's title or content matches
          const noteTitleOrContentMatches = project.notes.find(
            (x) => searchRegExp.test(x.title) || searchRegExp.test(x.content)
          )

          if (noteTitleOrContentMatches) {
            return {
              ...project,
              notes: project.notes
                .map((note) => {
                  const titleMatches = searchRegExp.test(note.title)
                  const contentMatches = searchRegExp.test(note.content)

                  if (titleMatches || contentMatches) {
                    return {
                      ...note,
                      title: searchRegExp.test(note.title)
                        ? highlight(note.title)
                        : note.title,
                      content: searchRegExp.test(note.content)
                        ? highlight(note.content)
                        : note.content,
                    }
                  }
                  return null
                })
                .filter(Boolean),
            }
          }

          return null
        })
        .filter(Boolean)
    })

    return { notes, searchValue, projects }
  },

  async fetch({ store }) {
    await store.dispatch('notes/getAllNotes')
  },

  head: {
    title: 'Project notes',
    meta: [
      {
        content: 'View notes for your projects',
        name: 'description',
        hid: 'description',
      },
    ],
  },
})
</script>

<template>
  <div v-if="notes.loading" class="flex-centered h-[calc(100%-64px)] w-full">
    <Spinner class="text-display-large text-text-subdued" />
  </div>

  <div v-else class="w-full py-32 px-32">
    <div class="max-w-app mx-auto">
      <div class="max-w-[800px] h-full">
        <SearchField
          v-model="searchValue"
          placeholder="Search notes"
          class="bg-surface-default mb-16 max-w-[270px] h-36"
          outlined
          :readonly="!notes.projects.length"
        />

        <div
          v-if="searchValue.trim() && !projects.length"
          class="text-text-subdued font-semibold mt-32 text-heading"
        >
          No result!
        </div>

        <div
          v-else-if="projects.filter((x) => x.notes.length).length"
          class="grid gap-y-32"
        >
          <NoteSection
            v-for="(project, i) in projects"
            :key="i"
            :project="project"
          />
        </div>

        <div v-else class="text-text-subdued font-semibold mt-32 text-heading">
          No note
        </div>
      </div>
    </div>
  </div>
</template>
