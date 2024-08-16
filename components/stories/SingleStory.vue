<template>
    <main>
        <div class="rounded-lg border border-gray-200 space-y-6 relative pt-4">
            <div class="flex justify-end items-end pr-4">
                <button @click="handleDeleteStory(stori.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="#d0021b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>

            <div class="px-4">
                <DashboardImageZoom v-if="stori?.coverImage"
                    class="h-10 w-10 cursor-pointer rounded-full object-cover object-center" alt=""
                    :src="stori?.coverImage" />
                <img v-else src="@/assets/img/stori.png" class="h-10 w-10 rounded-full" alt="" />
            </div>
            <div class="mt-1">
                <NuxtLink :to="`/dashboard/pods/${stori.id}`"
                    class="px-4 underline text-sm text-gray-700 font-semibold">{{
                    stori?.title ?? 'Nil' }}</NuxtLink>
            </div>
            <div class="flex justify-between items-center px-4 pb-14">
                <div class="flex items-center gap-x-2 font-medium text-gray-600">
                    <img src="@/assets/icons/reactions.svg" alt="" />
                    {{
                    stori?.reactionsCount ?? 'Nil' }}
                </div>
                <img src="@/assets/icons/stori-eclipse.svg" alt="" />
            </div>
            <div class="absolute w-full bottom-0">
                <div class="border-t border-gray-300 flex justify-end items-end">
                    <p class="text-gray-400 text-xs font-light px-4 py-3">
                        <span v-if="stori?.createdAt">{{ moment(stori?.createdAt).format("MMM DD, YYYY, h:mm:ss a")
                            }}</span>
                        <span v-else>Nil</span>
                    </p>
                </div>
            </div>
        </div>

        <CoreBaseModal :show="openRemoveStoryModal" @update:show="openRemoveStoryModal = false">
            <section class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
                <div>
                    <img src="@/assets/icons/danger.svg" class="h-20 w-20" alt="warning" />
                </div>
                <div>
                    <h1 class="font-semibold text-xl">Remove story</h1>
                    <p class="text-gray-500">
                        Are you sure you want to delete this story? This action cannot be undone.
                    </p>
                </div>
                <div class="flex justify-end items-end gap-x-3 w-full pt-6">
                    <button @click="openRemoveStoryModal = false"
                        class="text-black text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
                        Cancel
                    </button>
                    <button :disabled="processingDelete || processingDelete" @click="handleRemoveUser"
                        class="bg-[#D92D20] disabled:cursor-not-allowed disabled:opacity-25 text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
                        {{ processingDelete ? "processing..." : "Remove" }}
                    </button>
                </div>
            </section>
        </CoreBaseModal>


        <CoreBaseModal :show="openNotifyUserModal" @update:show="openNotifyUserModal = false">
            <section class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
                <div>
                    <h1 class="font-semibold text-xl">Notify user</h1>
                    <p class="text-gray-500">
                        Use this form to send a user update
                    </p>
                </div>
                <div>
                    <select v-model="form.category">
                        <option>Violation of story policies</option>
                    </select>
                </div>
                <div>
                    <TextEditor />
                </div>
                <!-- <div>
                    <img src="@/assets/icons/danger.svg" class="h-20 w-20" alt="warning" />
                </div>
                <div>
                    <h1 class="font-semibold text-xl">Remove story</h1>
                    <p class="text-gray-500">
                        Are you sure you want to delete this story? This action cannot be undone.
                    </p>
                </div>
                <div class="flex justify-end items-end gap-x-3 w-full pt-6">
                    <button @click="openRemoveStoryModal = false"
                        class="text-black text-sm font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
                        Cancel
                    </button>
                    <button :disabled="processingDelete || processingDelete" @click="handleRemoveUser"
                        class="bg-[#D92D20] disabled:cursor-not-allowed disabled:opacity-25 text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
                        {{ processingDelete ? "processing..." : "Remove" }}
                    </button>
                </div> -->
            </section>
        </CoreBaseModal>
    </main>
</template>

<script setup lang="ts">
import { useDeleteStory } from '@/composables/story/deleteUserStory';
const { deleteStory } = useDeleteStory()
import moment from "moment"
const activeTab = ref('insight')
defineProps({
    stori: {
        type: Object,
        required: true
    },
})

const handleRemoveStory = (stori: any) => {
    openRemoveStoryModal.value = true
};

const handleNotifyUser = (stori: any) => {
    openNotifyUserModal.value = true
}

const openRemoveStoryModal = ref(false)
const openNotifyUserModal = ref(false)

const form = ref({
    category: '',
    description: ''
})

const openDropdownIndex = ref(null);

function toggleDropdown(id: any) {
    openDropdownIndex.value = openDropdownIndex.value === id ? null : id;
}

const handleDeleteStory = (id: any) => {
    deleteStory(id)
}
</script>