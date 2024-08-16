<template>
    <main>
        <StoriesCardList :stories="storiesList" v-if="!loading && storiesList.length" />
        <CoreEmptyState v-if="storiesList.length <= 0 && !loading" title="No Stories available"
        desc="Get started by creating a new story." />
    <div class="w-full" v-if="loading">
        <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
    </div>
    </main>
  </template>
  
  <script setup lang="ts">
  defineProps({
    storiesList: {
      type: Array,
      default: () => [],
    },
    loadingStories: {
      type: Boolean,
      default: false,
    }
  });
  </script>