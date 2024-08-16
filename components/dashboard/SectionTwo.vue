<template>
  <div class="grid grid-cols-1 gap-y-10 xl:space-y-0 gap-4 xl:grid-cols-3 lg:gap-8" style="height: 600px;">
    <div class="rounded-lg lg:col-span-2 h-full border pt-6">
      <fieldset class="pl-6" >
        <legend class="text-sm font-semibold leading-6 text-gray-900">Chart Statistics Type</legend>
        <p class="mt-1 text-sm leading-6 text-gray-600">Select the chat you would like to see</p>
        <div class="mt-3 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          <div class="flex items-center" v-for="(itm, idx) in chartTypes" :key="idx">
            <input :value="itm.code" v-model="activeChartType" :id="itm.code" name="chartType" type="radio"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600">
            <label :for="itm.code" class="ml-3 block text-sm font-medium leading-6 text-gray-900">{{itm.name}}</label>
          </div>
        </div>
      </fieldset>
      <ChartsActivitiesChart v-if="activeChartType === 'user'" />
      <ChartsUserStoryChart v-if="activeChartType === 'pods'" />
    </div>
    <div class="rounded-lg h-full">
      <DashboardStoreCard :androidObj="androidStatObj" :loadingAndroidStat="loadingAndroidStat" :loadingIosStat="loadingIosStat" :iosObj="iosStatObj" />
    </div>
  </div>
</template>

<script setup lang="ts">
const activeChartType = ref('user')

const chartTypes = ref([
  {
    name: 'User',
    code: 'user'
  },
  {
    name: 'Pods',
    code: 'pods'
  }
])

import { useFetchAndroidStat } from '@/composables/dashboard/getAndroidStat'
import { useFetchIosStat } from '@/composables/dashboard/getIosStat'
const { androidStatObj, loading: loadingAndroidStat, fetchAndroidStat } = useFetchAndroidStat()
const { iosStatObj, loading: loadingIosStat, fetchIosStat } = useFetchIosStat()

onMounted(() => {
  fetchAndroidStat();
  fetchIosStat()
});
</script>
