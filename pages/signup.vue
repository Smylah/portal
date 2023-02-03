<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Header from '../components/HomePage/Header.vue'
import EyeIcon from '~/components/Base/Icon/EyeIcon.vue'

export default defineComponent({
  name: 'SignupPage',
  components: { Header, EyeIcon },
  data() {
    return {
      password: '',
      showPassword: false,
    }
  },
  methods: {
    // togglePassword() {
    //   if (this.$refs.password.type === 'password') {
    //     this.$refs.password.type = 'text'
    //   } else {
    //     this.$refs.password.type = 'password'
    //   }
    //   console.log(this.$refs.password.type)
    // },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
  },
})
</script>

<template>
  <main>
    <Header />
    <section class="smallcontainer mx-auto py-70">
      <div class="text-center space-y-4 mb-16">
        <h3>Let’s set up your account</h3>
        <h5>We’re super excited to help to get the best QA Engineers</h5>
      </div>

      <form action="submit" class="">
        <div class="flex space-x-30">
          <div>
            <label for="firstname">First name</label>
            <input
              id="firstname"
              type="text"
              name=""
              placeholder="Your first name"
            />
          </div>

          <div>
            <label for="lastname">Last name</label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              placeholder="Your last name"
            />
          </div>
        </div>

        <div>
          <label for="workemail">Work email</label>
          <input
            id="workemail"
            type="email"
            name="workemail"
            placeholder="e.g yourname@company.domain"
          />
        </div>
        <div class="text-sm font-medium">
          <div class="flex justify-between">
            <label for="password">Password</label>
            <nuxt-link to="#" class="nuxt-link">Forgot Password?</nuxt-link>
          </div>

          <div>
            <span>
              <input v-if="showPassword" v-model="password" type="text" />
              <input v-else v-model="password" type="password" />
            </span>
            <button class="-ml-25" @click.prevent="togglePassword">
              <EyeIcon />
            </button>
          </div>
        </div>

        <div>
          <label for="refferalcode">Refferal code</label>
          <input
            id="refferalcode"
            type="text"
            name="refferalcode"
            placeholder="Enter your referral code"
          />
        </div>

        <h6 class="font-normal text-neutral500">
          By creating an account, you agree to receive UnbugQA communications
          via email, and agree with the UnbugQA’s
          <nuxt-link to="#" class="nuxt-link">Terms of Service</nuxt-link>,
          <nuxt-link to="#" class="nuxt-link">Privacy Policy</nuxt-link> and
          <nuxt-link to="#" class="nuxt-link">Cookie Policy</nuxt-link>. Also
          understand that you can unsubscribe at any time.
        </h6>

        <button type="submit" class="blue-button">Create account</button>

        <p>
          Already have an Employer account?
          <nuxt-link to="#" class="nuxt-link">Login here</nuxt-link>
        </p>
      </form>
    </section>
  </main>
</template>

<style lang="postcss" scoped/>