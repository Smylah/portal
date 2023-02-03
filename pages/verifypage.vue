<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Header from '../components/HomePage/Header.vue'

export default defineComponent({
  name: 'VerifyPage',
  components: { Header },
  data() {
    return {}
  },
})
</script>

<template>
  <main class="flex flex-col">
    <Header />
    <div class="flex items-center h-[70vh]">
      <div class="small-container text-center">
        <h3>Verify your account</h3>
        <h5>
          You’re almost there! We’ve sent a verification email to [user email]
          to activate your account. Kindly verify your email to continue this
          process.
        </h5>
        <nuxt-link to="#" class="py-8 px-20 blue-button"
          >Open my email</nuxt-link
        >
        <p>
          Didn’t get the email?
          <nuxt-link to="#" class="nuxt-link">Resend it</nuxt-link> or
          <nuxt-link to="#" class="nuxt-link">contact us</nuxt-link>
        </p>
      </div>
    </div>
  </main>
</template>

<style lang='postcss'/>
