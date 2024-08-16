<template>
    <main>
        <div class="w-full border-b flex justify-between">
            <nav class="" aria-label="Tabs">
                <div href="#"
                    :class="[activeTab === 'stories' ? 'border-b-4 border-[#0ba9b9] text-gray-800' : 'text-gray-400 group-hover:text-gray-500']"
                    class="uppercase group inline-flex items-center py-2 px-1 text-xs font-semibold">
                    <span>Pods </span><span
                        class="font-semibold ml-2 text-[10px] rounded-3xl px-2 py-1.5 bg-[#0ba9b9] text-white">{{
                        pagination.total }}</span>
                </div>
            </nav>
        </div>
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="flow-root mt-2">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 border-[0.7px] rounded-b-lg">
                    <div v-if="filteredStories.length && !loading">
                        <div class="flex items-center justify-between px-4 p-2">
                            <div class="flex rounded border border-gray-100">
                                <button @click="activeTableView = 'grid'"
                                    :class="[activeTableView === 'grid' ? 'bg-gray-50 text-gray-700' : '']"
                                    class="inline-flex size-10 items-center justify-center border-e text-gray-600 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                    </svg>
                                </button>

                                <button @click="activeTableView = 'list'"
                                    :class="[activeTableView === 'list' ? 'bg-gray-50 text-gray-700' : '']"
                                    class="inline-flex size-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="h-7 w-7">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                    </svg>
                                </button>
                            </div>

                            <div class="flex items-center gap-x-6">
                                <div class="space-x-2">
                                    <label for="SortBy" class="text-sm text-gray-700 font-medium">SortBy:</label>
                                    <select v-model="queryObj.sortBy" id="SortBy"
                                        class="h-10 rounded border-gray-300 text-sm">
                                        <option value="createdAt">Created At</option>
                                        <option value="title">Title</option>
                                        <option value="commentsCount">Comment Count</option>
                                        <option value="reactionsCount">Reaction Count</option>
                                        <option value="totalViewsCount">Total View Count</option>
                                    </select>
                                </div>
                                <div class="space-x-2">
                                    <label for="SortBy" class="text-sm text-gray-700 font-medium">OrderBy:</label>
                                    <select v-model="queryObj.orderBy" id="SortBy"
                                        class="h-10 rounded border-gray-300 text-sm">
                                        <option value="asc">Ascending Order</option>
                                        <option value="desc">Descending Order</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <form class="relative flex flex-1 w-full border-[0.9px] py-6" action="#" method="GET">
                            <label for="search-field" class="sr-only">Search</label>
                            <svg class="pointer-events-none absolute inset-y-0 left-3 h-full w-5 text-gray-400"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input id="search-field"
                                class="block h-full w-full border-0 py-0 pl-10 pr-0 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                placeholder="Search..." v-model="searchQuery" type="search" name="search">
                        </form>
                        <section v-if="activeTableView === 'list'">
                            <StoriesTableList :storiesList="filteredStories" :loadingUsers="loading"
                                :pagination="pagination" @selectedStory="handleSelectedStory" />
                            <CorePagination :total="pagination.total" :page="pagination.page"
                                :perPage="pagination.perPage" :pages="pagination.pages"
                                @page-changed="handlePageChange" />
                        </section>
                        <section v-if="activeTableView === 'grid'">
                            <StoriesTableGrid :storiesList="filteredStories" :loadingStories="loading"
                                :pagination="pagination" @selectedStory="handleSelectedStory" />
                            <CorePagination :total="pagination.total" :page="pagination.page"
                                :perPage="pagination.perPage" :pages="pagination.pages"
                                @page-changed="handlePageChange" />
                        </section>
                    </div>
                    <CoreEmptyState v-if="filteredStories.length <= 0 && !loading" title="No Stories available" desc="">
                    </CoreEmptyState>
                    <LoadingSpinner v-if="loading" />
                </div>
            </div>
        </div>
        <div class="w-full" v-if="loading && !filteredStories.length">
            <div class="h-[500px] w-full bg-slate-300 rounded-2xl animate-pulse"></div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useFetchUserStories } from '@/composables/user/fetchUserStories'
const { fetchUserStories, userStoriesList, loading, pagination, searchQuery, filteredStories, queryObj } = useFetchUserStories()
fetchUserStories()
// import { useFetchStories } from '@/composables/story/fetch'
// const { fetchStories, storiesList, loading, searchQuery, filteredStories, pagination, queryObj } = useFetchStories()

definePageMeta({
    layout: 'dashboard'
})
const selectedStory = ref({}) as any
const selectedStories = ref([])

const activeTableView = ref('list')
const activeTab = ref('stories')

const handleSelectedStory = (data: any) => {
    selectedStory.value = data
}

const handlePageChange = (val: any) => {
    pagination.value.page = val
}
</script>