<template>
    <div class="p-4">
      <select v-model="selectedDevice" class="mb-4 p-2 border rounded">
        <option v-for="device in devices" :key="device.name" :value="device">
          {{ device.name }}
        </option>
      </select>
      <div class="flex justify-center border border-red-600">
        <div :class="deviceClass" class="relative bg-gray-900 text-white flex items-center justify-center border-2 border-gray-700">
          <span class="absolute text-center p-2">{{ previewText }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default defineComponent({
    name: 'MobilePreview',
    setup() {
      const devices = ref([
        { name: 'iPhone SE', width: 320, height: 568 },
        { name: 'iPhone 11 Pro', width: 375, height: 812 },
        { name: 'Pixel 4', width: 411, height: 823 },
        { name: 'Galaxy S20', width: 360, height: 800 }
      ])
  
      const selectedDevice = ref(devices.value[0])
      const previewText = ref('This is a mobile preview')
  
      const deviceClass = computed(() => {
        return `w-[${selectedDevice.value.width}px] h-[${selectedDevice.value.height}px]`
      })
  
      return {
        devices,
        selectedDevice,
        previewText,
        deviceClass
      }
    }
  })
  </script>
  
  <style scoped>
  .mobile {
    border-radius: 36px;
    overflow: hidden;
  }
  </style>
  