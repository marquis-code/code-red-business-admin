<template>
  <main>
    <section class="bg-white border-[0.7px] border-gray-100 rounded-b-lg p-6 space-y-3">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <StoriesSingleStory v-for="(itm, idx) in stories" :stori="itm" :key="idx" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const activeTab = ref('insight')
defineProps({
  stories: {
    type: Array,
    required: true
  },
  showHeader: {
    type: Boolean,
    default: true
  }
})
</script>