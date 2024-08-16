<template>
  <section class="shadow border-[0.6px] rounded-lg">
    <div class="flex items-center justify-between px-7 py-4">
      <h6 class="font-medium text-gray-500">App Store information</h6>
      <select class="text-sm font-medium outline-none bg-gray-100 rounded-md px-2.5 py-2">
        <option>All Time</option>
      </select>
    </div>
    <div>
      <div class="border-b-[0.2px] border-gray-50">
        <div class="flex justify-between items-start border-b border-gray-100 pb-10 px-7">
          <img src="@/assets/icons/dashboard/android-badge.svg" alt="" />
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <h2 class="font-bold text-3xl">625</h2>
              <img src="@/assets/icons/dashboard/increase.svg" alt="" class="h-10 w-10" />
            </div>
            <p class="text-gray-400">Downloads</p>
            <div class="flex items-center gap-x-3">
              <p class="mt-3">4.5</p>
              <div>
                <img src="@/assets/icons/dashboard/star-group.svg" class="w-32" alt="" />
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-green-500 font-medium">+2.4%</h2>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-start py-10 px-7">
        <img src="@/assets/icons/dashboard/ios-badge.svg" alt="" />
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <h2 class="font-bold text-3xl">902</h2>
            <img src="@/assets/icons/dashboard/decrease.svg" alt="" />
          </div>
          <p class="text-gray-400">Downloads</p>
          <div class="flex items-center gap-x-3">
            <p class="mt-3">4.8</p>
            <img src="@/assets/icons/dashboard/star-group.svg" class="w-32" alt="" />
          </div>
        </div>
        <div>
          <h2 class="text-green-500 font-medium">+2.4%</h2>
        </div>
      </div>
    </div>
  </section>
</template>
