<template>
    <main>
        <header>
          <nav class="flex overflow-x-auto border-b border-white/10 py-4 bg-black">
            <ul role="list" class="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8">
              <li>
                <a href="#" class="text-indigo-400">Overview</a>
              </li>
              <li>
                <a href="#" class="">Activity</a>
              </li>
              <li>
                <a href="#" class="">Settings</a>
              </li>
              <li>
                <a href="#" class="">Collaborators</a>
              </li>
              <li>
                <a href="#" class="">Notifications</a>
              </li>
            </ul>
          </nav>
  
          <!-- Stats -->
          <div class="grid grid-cols-1 bg-black sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="item in 10" :key="item" class="border-t border-white/5 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-gray-400">Per/Unit Bed Space</p>
              <p class="mt-2 flex items-baseline gap-x-2">
                <span class="text-4xl font-semibold tracking-tight text-white">405</span>
              </p>
            </div>
          </div>
        </header>

        <PatientsStatsChart class="bg-white p-3 lg:p-6"/>

        
      </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-dashboard'
});

const dashboardStats = ref([
  {
    name: 'Bed Availability',
    count: '',
  },
  {
    name: 'Staffing',
    count: '',
  },
  {
    name: 'Emergency Alerts',
    count: '',
  },
  {
    name: 'Bed Availability',
    count: '',
  },
  {
    name: 'Bed Availability',
    count: '',
  }
])
</script>





