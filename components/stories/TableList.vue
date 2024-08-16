<template>
    <main>
        <div v-if="storiesList.length && !loadingStories"
            class="inline-block min-w-full py-2 align-middle border-gray-100 rounded-b-lg border bg-white shadow">
            <div class="relative">
                <div v-if="selectedStori.length > 0"
                    class="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                    <button type="button"
                        class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
                        Bulk edit
                    </button>
                    <button type="button"
                        class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
                        Delete all
                    </button>
                </div>
                <table class="min-w-full table-fixed divide-y divide-gray-300">
                    <thead class="">
                        <tr>
                            <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                                <input type="checkbox"
                                    class="absolute left-4 top-1/2 -mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    :checked="indeterminate || selectedStori.length === storiesList.length"
                                    :indeterminate="indeterminate"
                                    @change="selectedStori = $event.target.checked ? storiesList.map((p) => p.id) : []" />
                            </th>
                            <th scope="col" class="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                Image
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Title
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Author
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Tags
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Slide(s)
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Comments
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Reactions
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Views
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Date Created
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 bg-white">
                        <tr class="odd:bg-gray-50" v-for="(stori, index) in storiesList" :key="index"
                            :class="[selectedStori.includes(stori.id) && 'bg-gray-50']">
                            <td class="relative px-7 sm:w-12 sm:px-6">
                                <div v-if="selectedStori.includes(stori.id)"
                                    class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600">
                                </div>
                                <input type="checkbox"
                                    class="absolute left-4 top-1/2 -mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    :value="stori.id" v-model="selectedStori" />
                            </td>
                            <td :class="[
            'whitespace-nowrap py-4 pr-3 text-xs font-medium',
            selectedStori.includes(stori.id)
                ? 'text-indigo-600'
                : 'text-gray-900',
        ]">
                                <DashboardImageZoom v-if="stori.coverImage" class="h-10 w-10" :src="stori.coverImage" />
                                <div v-else class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
                                    {{ generateInitials(stori?.user?.fname, stori?.user?.lname) }}
                                  </div>
                            </td>
                            <td @click="viewStory(stori)"
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer">
                                <p class="font-medium text-gray-800 no-underline">{{
            stori?.title || "N/A" }}</p>
                            </td>
                            <td @click="viewStory(stori)"
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer">
                                <!-- <p v-if="stori?.admin !== null" class="font-medium text-gray-800 no-underline">
                                    {{ `${stori?.admin?.firstname} ${stori?.admin?.lastname}` }}</p> -->
                                <p class="font-medium text-gray-800 no-underline">
                                    {{ `${stori?.user?.fname} ${stori?.user?.lname}` }}</p>
                                <span v-if="stori?.admin !== null"
                                    class="text-[10px] bg-black text-white rounded-full font-semibold px-2 py-1">by {{ `${stori?.admin?.firstname} ${stori?.admin?.lastname}` }}</span>
                                <!-- <span v-else
                                    class="text-[10px] bg-green-500 text-white rounded-full font-semibold px-2 py-1">User</span> -->
                            </td>
                            <td @click="viewStory(stori)"
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer">
                                <div v-if="stori.tags" class="flex flex-wrap gap-2">
                                    <p v-for="category in splitCategories(stori.tags)" :key="category"
                                        class="no-underline text-gray-800 border border-gray-500 text-xs rounded-xl px-3 py-1">
                                        {{ category }}
                                    </p>
                                </div>
                                <p v-else>Nil</p>
                            </td>
                            <td @click="viewStory(stori)"
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer">
                            <p class="no-underline text-gray-800">{{
        stori.slidesCount ??
        "N/A" }}</p>
                        </td>
                            <td @click="viewStory(stori)"
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer">
                                <p class="no-underline text-gray-800">{{
            stori.commentsCount ??
            "N/A" }}</p>
                            </td>
                            <td @click="viewStory(stori)"
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer">
                                <p class="no-underline text-gray-800">{{
            stori.reactionsCount ??
            "N/A" }}</p>
                            </td>
                            <td @click="viewStory(stori)"
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer">
                                <p class="no-underline text-gray-800">{{
            stori.totalViewsCount ??
            "N/A" }}</p>
                            </td>
                            <td @click="viewStory(stori)"
                                class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer">
                                <p class="no-underline text-gray-800">{{
                                    moment.utc(stori.createdAt).format('MMMM Do YYYY, h:mm:ss a') || 'Nil'
                                    }}</p>
                            </td>
                            <td
                                class="whitespace-nowrap text-center py-4 pl-3 pr-4 text-xs font-medium sm:pr-3 relative">
                                <button @click="handleDeleteStory(stori.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24"
                                        fill="none" stroke="#d0021b" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path
                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                        </path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { useDeleteStory } from '@/composables/story/deleteUserStory';
import { useFetchUserStories } from "@/composables/user/fetchUserStories";
import { splitCategories } from "@/utils/splitCategories";
import { useLogin } from '@/composables/auth/login'
const { id } = useLogin()
const {
    fetchUserStories,
    userStoriesList,
    loading: loadingUserStories,
} = useFetchUserStories();
const { deleteStory } = useDeleteStory()


const handleDeleteStory = (id: any) => {
    deleteStory(id)
}
const router = useRouter()
const selectedStori = ref([]) as any;
const selectedOption = ref("") as any;
const selectedUser = ref({}) as any;
const showEditModal = ref(false) as any;

const props = defineProps({
    storiesList: {
        type: Array,
        default: () => [],
    },
    loadingStories: {
        type: Boolean,
        default: false,
    },
});
const formatter = ref({
    date: "DD MMM YYYY",
    month: "MMM",
});

const form = ref({
    category: "",
    isIndefinately: false,
    date: [] as any,
});

const isFormEmpty = computed(() => {
    if (form.value.isIndefinately) {
        return !!(form.value.category && form.value.date);
    } else {
        return !!form.value.category;
    }
});

const handleRemoveUser = (stori: any) => {
    openRemoveUserModal.value = true;
    selectedUser.value = stori;
};
const selectedStatus = ref("");

const openRemoveUserModal = ref(false);
const updateUserStatusModal = ref(false);

const openDropdownIndex = ref(null);

function toggleDropdown(index: any) {
    openDropdownIndex.value = openDropdownIndex.value === index ? null : index;
}

const indeterminate = computed(() => {
    return (
        selectedStori.value.length > 0 &&
        selectedStori.value.length < props.storiesList.length
    );
});
const toggleUserStatus = (user: any) => {
    selectedUser.value = user;
    updateUserStatusModal.value = true;
    if (user.isActive) {
        selectedStatus.value = "suspend";
    }

    if (!user.isActive) {
        selectedStatus.value = "reactivate";
    }
};

const viewStory = (data: any) => {
    router.push({ path: `/dashboard/${id}/pods/${data.id}` })
}

const generateInitials = (fname: string, lname: string) => {
  return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`;
};

</script>

<style></style>