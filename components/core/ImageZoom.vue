<template>
  <div>
    <img
      :src="src"
      @click="toggleImage"
      class="cursor-pointer rounded-full h-10 w-10"
      alt=""
    />
    <div
      v-if="isFullScreen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="toggleImage"
    >
      <img
      alt=""
        :src="src"
        class="max-w-full max-h-full transition-transform duration-500"
        :class="{'scale-100': isFullScreen, 'scale-0': !isFullScreen}"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
  },
  data() {
    return {
      isFullScreen: false,
    };
  },
  methods: {
    toggleImage() {
      this.isFullScreen = !this.isFullScreen;
    },
  },
};
</script>

<style scoped>
</style>
