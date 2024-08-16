<template>
    <div
        class="grid grid-cols-1 gap-4 transition-[grid-template-columns] lg:grid-cols-[190px_1fr] lg:gap-8 lg:[&:has(>*:first-child:hover)]:grid-cols-[160px_1fr] w-full">
        <div class="h-14 rounded-lg flex justify-center items-center">
            <span class="text-sm font-semibold leading-6 text-gray-900">Welcome {{ username }}! 😊
            </span>
        </div>
        <div class="h-14 rounded-lg flex justify-end items-center">
            <div class="flex w-7/12 gap-x-4 pr-6">
                <!-- <form class="relative h-10 flex border-[0.6px] border-gray-300 flex-1 sr-only rounded-md w-full"
                    action="#" method="GET">
                    <label for="search-field" class="sr-only">Search</label>
                    <svg class="pointer-events-none absolute left-2 inset-y-0 h-full w-5 text-gray-400"
                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clip-rule="evenodd" />
                    </svg>
                    <input id="search-field"
                        class="block h-full w-full border-0 py-0 pl-8 pr-0 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                        placeholder="Search..." type="search" name="search">
                </form>
                <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">View notifications</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke-width="1.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
                <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">View notifications</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                        aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                </button> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    username: {
        type: String,
        required: true
    }
})
</script>