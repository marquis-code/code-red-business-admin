<template>
  <main class="">
    <div class="space-y-6">
      <div class="flex justify-end items-end">
        <div class="flex">
          <div>
            <fieldset>
              <legend class="sr-only">Notifications</legend>
              <div class="space-y-5">
                <div class="relative flex items-start">
                  <div class="flex h-6 items-center">
                    <input :checked="showAll" :value="showAll" v-model="showAll" id="comments" aria-describedby="comments-description" name="comments"
                      type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                  </div>
                  <div class="ml-3 text-sm leading-6">
                    <label for="comments" class="font-medium text-gray-900" alt="Get all statistics data across storipod.">Show All</label>
                    <!-- <p id="comments-description" class="text-gray-500">Get all statistics data across storipod.</p> -->
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div>
            <CoreDateInput :disabled="showAll" v-model="dateFilter" range placeholder="Filter by date" :disabled-date="() => null"
              clearable />
          </div>
        </div>
      </div>
      <section v-if="!loading && Object.keys(dashboardSummary).length"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-8">
        <div class="flex justify-center items-center flex-col gap-y-6 rounded-2xl p-4 lg:p-7"
          v-for="(value, key) in dashboardSummary" :key="key" :class="computedCardColor(key)">
          <h1 class="font-semibold text-lg">{{ modifyCardTitle(key) }}</h1>
          <div class="flex items-center flex-col gap-x-4 lg:gap-x-6 mt-3 gap-y-6">
            <h1 class="text-xl lg:text-2xl font-semibold">{{ value || 0 }}</h1>
            <div class="flex items-center gap-x-2">
              <img v-if="value.growth >= 0" src="@/assets/icons/dashboard/increase.svg" alt="" />
              <img v-if="value.growth < 0" src="@/assets/icons/dashboard/decrease.svg" alt="" />
              <!-- <p class="" :class="[value.growth >= 0 ? 'text-green-600' : 'text-red-600']">
                                {{ Math.round(value.growth) || 0 }}%
                            </p> -->
            </div>
          </div>
          <!-- <p class="text-[#6E717C] text-sm">Compared from Last Month</p> -->
        </div>
      </section>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4 lg:gap-8"
        v-if="loading && !Object.keys(dashboardSummary).length">
        <div v-for="itm in 4" :key="itm" class="h-[200px] bg-slate-300 rounded-2xl animate-pulse"></div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFetchDashboardSummary } from '@/composables/dashboard/getDashboardSummary';

const { fetchDashboardSummary, dashboardSummary, loading, metaObj, setFilterData } = useFetchDashboardSummary();
const dateFilter = ref<any>(null);
const showAll = ref<boolean>(true);

// Watch for changes in dateFilter and showAll, then fetch data
watch([dateFilter, showAll], () => {
  const payload = {
    startDate: dateFilter?.value?.[0] || metaObj.value.startDate,
    endDate: dateFilter?.value?.[1] || metaObj.value.endDate,
    showAll: showAll.value,
  };
  setFilterData(payload);
  fetchDashboardSummary();
});

// Initial fetch of dashboard summary data
fetchDashboardSummary();

// Function to modify card titles based on data keys
const modifyCardTitle = (data: string) => {
  switch (data) {
    case 'active_users':
      return 'Total Active Users';
    case 'signups':
      return 'Total Users';
    case 'story':
      return 'Pods';
    case 'engagement':
      return 'Engagement';
    default:
      return 'Pods';
  }
};

// Function to compute card colors based on data keys
const computedCardColor = (data: string) => {
  switch (data) {
    case 'active_users':
      return 'bg-[#FDF5F5]';
    case 'signups':
      return 'bg-[#ECFCFE]';
    case 'story':
      return 'bg-[#FFF8E3]';
    case 'engagement':
      return 'bg-[#f9efff]';
    default:
      return 'bg-[#f9efff]';
  }
};

// Define page metadata
definePageMeta({
  layout: 'dashboard',
});
</script>
