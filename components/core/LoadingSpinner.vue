<template>
  <div v-if="isLoading"
    class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-y-3 bg-black bg-opacity-50 backdrop-blur-sm">
    <div class="spinner z-50 h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-blue-500">
    </div>
    <p class="z-50 leading-loose text-white">Logging in to CodeRed</p>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})
</script>

<style>
.spinner {
  border-radius: 50%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
