<template>
    <div v-if="show" class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <!-- Background backdrop, show/hide based on slide-over state. -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
                <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                    <div class="pointer-events-auto w-screen" :class="[type === 'large' ? 'max-w-xl' : 'max-w-md']">
                        <div class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                            <div class="h-0 flex-1 overflow-y-auto">
                                <div class="bg-indigo-700 px-4 py-6 sm:px-6">
                                    <div class="flex items-center justify-between">
                                        <h2 class="text-base font-semibold leading-6 text-white" id="slide-over-title">
                                            {{ title }}</h2>
                                        <div class="ml-3 flex h-7 items-center">
                                            <button type="button" @click="closeModal"
                                                class="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                                                <span class="absolute -inset-2.5"></span>
                                                <span class="sr-only">Close panel</span>
                                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                    stroke="currentColor" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="mt-1">
                                        <p class="text-sm text-indigo-300">{{ description }}</p>
                                    </div>
                                </div>
                                <slot name="content" />
                            </div>
                            <slot name="actionsBtn" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ show: boolean, title: string, description: string, type: string }>();
const emit = defineEmits(['update:show']);

const closeModal = () => {
    emit('update:show', false);
};
</script>

<style scoped>
@media (min-width: 768px) {
    .modal-content {
        width: 50%;
    }
}
</style>