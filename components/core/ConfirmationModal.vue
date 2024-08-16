<!-- components/ConfirmationModal.vue -->
<template>
    <transition name="fade">
        <div v-if="state.isVisible"
            class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            <div class="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-6">
                <div class="text-lg">{{ state.message }}</div>
                <div class="mt-4 flex justify-end space-x-2">
                    <button @click="state.isVisible = false"
                        class="px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300">
                        Cancel
                    </button>
                    <button @click="confirm" class="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useConfirmationModal } from '@/composables/core/useConfirmationModal'

const { state, confirm } = useConfirmationModal()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>