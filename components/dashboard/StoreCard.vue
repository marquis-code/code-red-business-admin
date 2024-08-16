<template>
  <section class="shadow border-[0.6px] rounded-lg">
    <div class="flex items-center justify-between px-7 py-4 border-b-[0.8px] border-gray-100">
      <h6 class="font-medium text-gray-500">App Store information </h6>
      <select class="text-sm font-medium outline-none bg-gray-50 rounded-md px-2.5 py-2">
        <option>All Time</option>
      </select>
    </div>
    <div class="flex flex-col justify-between h-[450px] divide divide-y">
      <div class="flex justify-between items-start py-10 px-7  h-1/2" v-if="!loadingAndroidStat">
        <img src="@/assets/icons/dashboard/android-badge.svg" alt="" />
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <h2 class="font-bold text-3xl">{{ androidObj?.download  ?? 'Nil' }}</h2>
            <!-- <img src="@/assets/icons/dashboard/decrease.svg" alt="" /> -->
          </div>
          <p class="text-gray-400">Downloads</p>
          <div class="flex items-center gap-x-3">
            <p class="mt-3">4.8</p>
            <img src="@/assets/icons/dashboard/star-group.svg" class="w-32" alt="" />
          </div>
        </div>
        <div>
          <!-- <h2 class="text-green-500 font-medium ">+2.4%</h2> -->
        </div>
      </div>
      <div class="h-60 bg-slate-400 rounded-t-lg animate-pulse" v-else></div>
      <div class="flex justify-between items-start py-10 px-7  h-1/2" v-if="!loadingIosStat">
        <img src="@/assets/icons/dashboard/ios-badge.svg" alt="" />
        <div class="space-y-4">
          <div class="flex items-center space-x-4" v-if="!loadingIosStat">
            <h2 class="font-bold text-3xl">{{ iosObj?.download  ?? 'Nil' }}</h2>
            <!-- <img src="@/assets/icons/dashboard/decrease.svg" alt="" /> -->
          </div>
          <p class="text-gray-400">Downloads</p>
          <div class="flex items-center gap-x-3">
            <p class="mt-3">4.8</p>
            <img src="@/assets/icons/dashboard/star-group.svg" class="w-32" alt="" />
          </div>
        </div>
        <div>
          <!-- <h2 class="text-green-500 font-medium ">+2.4%</h2> -->
        </div>
      </div>
      <div class="h-60 bg-slate-400 rounded-b-lg animate-pulse" v-else></div>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{
  androidObj: {
    type: Object
  },
  iosObj: {
    type: Object
  },
  loadingAndroidStat: {
    type: Boolean
  },
  loadingIosStat: {
    type: Boolean
  }
}>()
</script>