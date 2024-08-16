<template>
    <div class="p-4">
      <label for="font-select" class="block mb-2">Select Font:</label>
      <select
        id="font-select"
        class="border p-2 mb-4"
        v-model="selectedFont"
        @change="applyFont"
      >
        <option
          v-for="font in fontsList"
          :key="font.code"
          :value="font.code"
        >
          {{ font.name }}
        </option>
      </select>
      <div :style="{ fontFamily: selectedFont }" class="text-preview">
        The quick brown fox jumps over the lazy dog.
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useFontFamily } from '@/composables/core/useFontFamily';
  
  const { fontsList } = useFontFamily();
  const selectedFont = ref('Lato');
  
  const applyFont = () => {
    document.querySelector('.text-preview')?.setAttribute('style', `font-family: ${selectedFont.value}`);
  };
  </script>
  
  <style scoped>
  .text-preview {
    font-size: 24px;
    margin-top: 10px;
  }
  </style>
  