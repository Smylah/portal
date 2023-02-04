<template>
  <div class="testimonial-container">
    <div
      class="testimonial-card"
      v-for="(testimony, index) in displayedTestimonies"
      :key="index"
    >
      {{ testimony }}
    </div>
    <div class="nav-buttons">
      <button v-if="currentPage > 1" @click="prevPage">Prev</button>
      <button
        v-if="currentPage < displayedTestimonies.length"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouSel',
  data() {
    return {
      testimonies: [
        'Testimony 1',
        'Testimony 2',
        'Testimony 3',
        'Testimony 4',
        'Testimony 5',
      ],
      itemsPerPage: 3,
      currentPage: 1,
    }
  },
  computed: {
    // numPages() {
    //   return Math.ceil(this.testimonies.length / this.itemsPerPage)
    // },
    displayedTestimonies() {
      const startIndex = this.currentPage - 1
      return this.testimonies.slice(startIndex, startIndex + this.itemsPerPage)
    },
  },
  methods: {
    prevPage() {
      this.currentPage--
      console.log(this.displayedTestimonies)
    },
    nextPage() {
      this.currentPage++
      console.log(this.displayedTestimonies)
    },
  },
}
</script>

<style>
.testimonial-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.testimonial-card {
  width: 30%;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  text-align: center;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  background-color: lightgray;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
