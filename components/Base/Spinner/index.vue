<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Intersection from '../Intersection/index.vue'

export default defineComponent({
  name: 'BaseSpinner',
  components: { Intersection },
  props: {
    noRotate: Boolean,
  },
})
</script>

<template>
  <Intersection v-slot="{ isIntersecting }">
    <span :class="{ spin: !noRotate && isIntersecting }">
      <svg width="1em" height="1em" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"
        ></path>
      </svg>

      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="1em"
        height="1em"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M140 32v32a12 12 0 0 1-24 0V32a12 12 0 0 1 24 0Zm84 84h-32a12 12 0 0 0 0 24h32a12 12 0 0 0 0-24Zm-42.3 48.8a12 12 0 0 0-16.9 16.9l22.6 22.7a12 12 0 0 0 8.5 3.5a12.2 12.2 0 0 0 8.5-3.5a12 12 0 0 0 0-17ZM128 180a12 12 0 0 0-12 12v32a12 12 0 0 0 24 0v-32a12 12 0 0 0-12-12Zm-53.7-15.2l-22.7 22.6a12 12 0 0 0 0 17a12.2 12.2 0 0 0 8.5 3.5a12 12 0 0 0 8.5-3.5l22.6-22.7a12 12 0 0 0-16.9-16.9ZM76 128a12 12 0 0 0-12-12H32a12 12 0 0 0 0 24h32a12 12 0 0 0 12-12Zm-7.4-76.4a12 12 0 1 0-17 17l22.7 22.6a12 12 0 0 0 16.9 0a11.9 11.9 0 0 0 0-16.9Z"
        ></path>
      </svg> -->
    </span>
  </Intersection>
</template>

<style lang="postcss" scoped>
@keyframes base-spinnner-spin {
  from {
    transform: rotate(0deg) translateZ(0);
  }
  to {
    transform: rotate(360deg) translateZ(0);
  }
}

.spin {
  animation: base-spinnner-spin 550ms linear infinite;
}
</style>
