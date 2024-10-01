<!-- components/MapDisplay.vue -->
<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMapbox } from '@/composables/core/useMapbox';

// Center on Lagos, Nigeria
const lagosCenter = [3.3792, 6.5244];  // [Longitude, Latitude]

// Define boundaries for random coordinates within Nigeria
const latMin = 4;   // Southern Nigeria
const latMax = 14;  // Northern Nigeria
const lonMin = 3;   // Western Nigeria
const lonMax = 15;  // Eastern Nigeria

// Function to generate random coordinates within Nigeria's boundaries
function generateRandomCoordinates(count: number): [number, number][] {
  const coordinates: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const lat = Math.random() * (latMax - latMin) + latMin;
    const lon = Math.random() * (lonMax - lonMin) + lonMin;
    coordinates.push([lon, lat]);
  }
  return coordinates;
}

// Example dataset with random surge data
const coordinates = generateRandomCoordinates(50); // Generate 50 random coordinates
const surgeData = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));  // Random surge levels (0-100)

const { mapContainer, initMap } = useMapbox();

onMounted(() => {
  initMap(coordinates, surgeData, lagosCenter);  // Initialize map centering on Lagos
});
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.map-container {
  width: 100vw;
  height: 100vh;
}
</style>
