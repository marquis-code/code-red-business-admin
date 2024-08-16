<template>
  <transition name="modal">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" v-if="isOpen">
      <div class="bg-white p-4 rounded-lg max-w-sm w-full mx-4">
        <slot></slot>
        <button @click="close" class="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('update:isOpen', false);
    },
  },
};
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity .5s;
}
.modal-enter, .modal-leave-to /* .modal-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
