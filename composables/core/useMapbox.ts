// // composables/useMapbox.ts
// import { onMounted, ref } from 'vue';
// import mapboxgl from 'mapbox-gl';

// export const useMapbox = () => {
//   const mapContainer = ref<HTMLElement | null>(null);
//   const map = ref<mapboxgl.Map | null>(null);

//   const initMap = (coordinates: [number, number][], surgeData: number[]) => {
//     if (mapContainer.value) {
//       mapboxgl.accessToken = 'pk.eyJ1IjoibWFycXVpczE5OTktIiwiYSI6ImNrenJic2xubjB1OXQycGxnMGp2a2NvM2kifQ.7S-nXi_BJHFzVXUlgK8VTg';  // Replace with your Mapbox token

//       map.value = new mapboxgl.Map({
//         container: mapContainer.value,
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [0, 0],  // Initial map center
//         zoom: 2
//       });

//       // Add hospital locations as dots
//       coordinates.forEach((coord, index) => {
//         const surgeLevel = surgeData[index];  // Get corresponding surge data

//         // Add a marker for each hospital location
//         new mapboxgl.Marker({
//           color: `rgba(255, 0, 0, ${Math.min(1, surgeLevel / 100)})`,  // Surge level determines intensity
//         })
//           .setLngLat(coord)
//           .addTo(map.value!);
//       });
//     }
//   };

//   onMounted(() => {
//     // Initialization code can go here if needed.
//   });

//   return { mapContainer, initMap };
// };

// composables/core/useMapbox.ts
// import mapboxgl from 'mapbox-gl';

// export function useMapbox() {
//   const mapContainer = ref(null);
//   let map: mapboxgl.Map;

//   function initMap(coordinates: [number, number][], surgeData: number[], center: [number, number]) {
//     mapboxgl.accessToken = 'pk.eyJ1IjoibWFycXVpczE5OTktIiwiYSI6ImNrenJic2xubjB1OXQycGxnMGp2a2NvM2kifQ.7S-nXi_BJHFzVXUlgK8VTg'

//     map = new mapboxgl.Map({
//       container: mapContainer.value,
//       style: 'mapbox://styles/mapbox/streets-v11',  // Map style
//       center: center,  // Center the map on Nigeria
//       zoom: 5,  // Zoom level
//     });

//     // Add dots for each coordinate
//     coordinates.forEach((coord, index) => {
//       const el = document.createElement('div');
//       el.className = 'dot';  // Style for the dot
//       el.style.width = '8px';
//       el.style.height = '8px';
//       el.style.backgroundColor = `rgba(255, 0, 0, ${surgeData[index] / 100})`;  // Adjust color intensity based on surge level
//       el.style.borderRadius = '50%';

//       // Add the dot to the map
//       new mapboxgl.Marker(el)
//         .setLngLat(coord)
//         .addTo(map);
//     });
//   }

//   return {
//     mapContainer,
//     initMap,
//   };
// }

// composables/core/useMapbox.ts
import mapboxgl from 'mapbox-gl';

export function useMapbox() {
  const mapContainer = ref(null);
  let map: mapboxgl.Map;

  function initMap(coordinates: [number, number][], surgeData: number[], center: [number, number]) {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFycXVpczE5OTktIiwiYSI6ImNrenJic2xubjB1OXQycGxnMGp2a2NvM2kifQ.7S-nXi_BJHFzVXUlgK8VTg'

    map = new mapboxgl.Map({
      container: mapContainer.value,
      style: 'mapbox://styles/mapbox/streets-v11',  // Map style
      center: center,  // Center the map on Nigeria
      zoom: 5,  // Zoom level
    });

    // Add red markers for each coordinate
    coordinates.forEach((coord) => {
      // Create a red map marker
      const marker = new mapboxgl.Marker({ color: 'red' })  // Use Mapbox's default marker and set color to red
        .setLngLat(coord)
        .addTo(map);
    });
  }

  return {
    mapContainer,
    initMap,
  };
}
