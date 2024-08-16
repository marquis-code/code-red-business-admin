<template>
    <main>
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-base font-semibold leading-6 text-gray-900">Banner Ads</h1>
                    <p class="mt-2 text-sm text-gray-700">A list of all the banner ads in your account including
                        their name,
                        title, email and role.</p>
                </div>
                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <NuxtLink to="/dashboard/ads/new"
                        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create
                        new ads</NuxtLink>
                </div>
            </div>
            <div class="mt-8 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div v-if="adsList.length && !loading"
                        class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Client Name</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">File
                                            Upload</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Target
                                            Link</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Hits</th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start date
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End date
                                        </th>
                                        <th scope="col"
                                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date Created
                                        </th>
                                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr v-for="(ads, idx) in adsList" :key="idx">
                                        <td
                                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {{ ads.clientName ?? 'Nil' }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <!-- <DashboardImageZoom v-if="ads.image" class="rounded-lg h-10 w-10"
                                                :src="ads.image" />
                                            <span v-else>Nil</span> -->
                                            <img v-if="ads.image" :src="ads.image" class="rounded-xl object-cover object-center" />
                                            <span v-else>Nil</span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <a target="__blank" v-if="ads.link" :href="ads.link"
                                                class="underline text-green-600">{{ ads.link.slice(0, 10) + '.....' }}</a>
                                            <span v-else>Nil</span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {{ ads.status
                                                ?? 'Nil' }}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {{ ads.hits
                                                ?? 'Nil' }}
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <span v-if="ads?.startDate">{{ moment(ads?.startDate).format("MMM DD, YYYY, h:mm a") }}</span>
                                            <span v-else>Nil</span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <span v-if="ads?.endDate">{{ moment(ads?.endDate).format("MMM DD, YYYY, h:mm a") }}</span>
                                            <span v-else>Nil</span>
                                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span v-if="ads?.createdAt">{{ moment(ads?.createdAt).format("MMM DD, YYYY, h:mm a") }}</span>
                            <span v-else>Nil</span>
                        </td>
                                        <td
                                            class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <div class="flex items-center gap-x-3">
                                                <a href.prevent="#" @click="handleAds('edit', ads)"
                                                    class="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
                                                        viewBox="0 0 24 24" fill="none" stroke="#4a4a4a"
                                                        stroke-width="2.5" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                                                        <line x1="3" y1="22" x2="21" y2="22"></line>
                                                    </svg>
                                                </a>
                                                <a href.prevent="#" @click="handleAds('delete', ads)"
                                                    class="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23"
                                                        viewBox="0 0 24 24" fill="none" stroke="#d0021b"
                                                        stroke-width="2.5" stroke-linecap="round"
                                                        stroke-linejoin="round">
                                                        <polyline points="3 6 5 6 21 6"></polyline>
                                                        <path
                                                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                                        </path>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                    </svg>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <CoreEmptyState v-if="adsList.length <= 0 && !loading" title="No Ads available" desc="">
                    </CoreEmptyState>
                    <div v-if="loading" class="h-32 bg-slate-100 rounded"></div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import moment from "moment"
import { useGetAllSponsoredAds } from '@/composables/sponsored-ads/fetch'
import { useDeleteSponsoredAds } from '@/composables/sponsored-ads/delete'
const { deleteSponsoredAds, loading: deleting } = useDeleteSponsoredAds()
const { getAllSponsoredAds, ads: adsList, loading } = useGetAllSponsoredAds()
const showSlideOver = ref(false)
const selectedAds = ref({}) as Record<string, any>
const route = useRoute()
const router = useRouter()
getAllSponsoredAds()

const handleAds = (action: string, data?: any) => {
    if (action === 'edit') {
        selectedAds.value = data
        router.push({ path: route.path, query: { action: 'edit', id: data.id } })
        showSlideOver.value = true
    }
    if (action === 'delete') {
        deleteSponsoredAds(data.id)
    }

    if (action === 'create') {
        router.push({ path: route.path, query: { action: 'create' } })
        showSlideOver.value = true
    }
}

</script>
