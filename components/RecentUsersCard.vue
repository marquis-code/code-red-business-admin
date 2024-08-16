<template>
  <main>
    <div v-if="!loading && usersList" class="rounded-2xl bg-white p-6 border-gray-50 border space-y-6">
      <div class="space-y-2">
        <h1 class="font-semibold text-base md:text-lg">
          Most Recent
        </h1>
        <div>
          <div class="">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
                <button @click="setActiveTable('recent_signup')" :class="[
      activeTable === 'recent_signup'
        ? 'border-sky-500 font-bold text-gray-900'
        : 'border-transparent',
    ]" class="shrink-0 border-b-2 px-1 pb-2 text-sm text-gray-400">
                  Recent Signup
                </button>
                <button @click="setActiveTable('reserved_usernames')" :class="[
      activeTable === 'reserved_usernames'
        ? 'border-sky-500 border-b-2 font-bold text-gray-900'
        : 'border-transparent',
    ]" class="shrink-0 border-b-2 px-1 pb-2 text-sm text-gray-400" aria-current="page">
                  Reserved Username
                </button>

                <button @click="setActiveTable('reported_users')" :class="[
      activeTable === 'reported_users'
        ? 'border-sky-500 font-bold text-gray-900'
        : 'border-transparent',
    ]" class="shrink-0 border-b-2 px-1 pb-2 text-sm text-gray-400">
                  Reported users
                </button>

                <button @click="setActiveTable('reported_post')" :class="[
      activeTable === 'reported_post'
        ? 'border-sky-500 font-bold text-gray-900'
        : 'border-transparent',
    ]" class="shrink-0 border-b-2 px-1 pb-2 text-sm text-gray-400">
                  Reported post
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTable === 'reserved_usernames'" class="overflow-x-auto">
        <table v-if="usersList.length && !loading" class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(itm, idx) in computedUsersList" :key="idx">
              <td class="whitespace-nowrap px-4  md:py-3 font-medium text-gray-900 bg-white">
                <nuxt-link v-if="itm.profilePicture" :to="`/dashboard/users/${itm.id}`">
                  <CoreImageZoom class="h-20 w-20 cursor-pointer" :src="itm.profilePicture" />
                </nuxt-link>
                <p v-else
                  class="rounded-full h-10 w-10 font-semibold bg-gray-300 text-gray-800 flex justify-center items-center">
                  {{ generateInitials(itm.fname, itm.lname) }}</p>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline" :to="`/dashboard/users/${itm.id}`">{{
      itm.fname
    }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline" :to="`/dashboard/users/${itm.id}`">{{
      itm.email
    }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline" :to="`/dashboard/users/${itm.id}`">
                  <img src="@/assets/icons/arrow-right.svg" alt="" />
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
        <CoreEmptyState v-if="usersList.length <= 0 && !loading" title="No User available" desc="">
        </CoreEmptyState>
        <LoadingSpinner v-if="loading" />
      </div>
      <div v-if="activeTable === 'reported_users'" class="overflow-x-auto">
        <table v-if="reportedUsersList.length && !loadingReportedUsers"
          class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(itm, idx) in computedReportedUsersList" :key="idx">
              <td class="whitespace-nowrap px-4  md:py-3 font-medium text-gray-900 bg-white">
                <nuxt-link v-if="itm.reportedUser.profilePicture" :to="`/dashboard/users/${itm.reportedUser.id}`">
                  <CoreImageZoom class="h-20 w-20 cursor-pointer" :src="itm.reportedUser.profilePicture" />
                </nuxt-link>
                <p v-else
                  class="rounded-full h-10 w-10 font-semibold bg-gray-300 text-gray-800 flex justify-center items-center">
                  {{ generateInitials(itm.reportedUser.fname, itm.reportedUser.lname) }}</p>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline"
                  :to="`/dashboard/users/${itm.reportedUser.id}`">{{
      itm.reportedUser.fname
    }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline"
                  :to="`/dashboard/users/${itm.reportedUser.id}`">{{
      itm.reportedUser.email
    }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline"
                  :to="`/dashboard/users/${itm.reportedUser.id}`">
                  <img src="@/assets/icons/arrow-right.svg" alt="" />
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
        <CoreEmptyState v-if="reportedUsersList.length <= 0 && !loadingReportedUsers" title="No User available" desc="">
        </CoreEmptyState>
        <LoadingSpinner v-if="loadingReportedUsers" />
      </div>
      <div v-if="activeTable === 'reported_post'" class="overflow-x-auto">
        <CoreEmptyState title="No Data available" desc="">
        </CoreEmptyState>
      </div>
      <div v-if="activeTable === 'recent_signup'" class="overflow-x-auto">
        <table v-if="usersList.length && !loading" class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(itm, idx) in recentSignups" :key="idx">
              <td class="whitespace-nowrap px-4  md:py-3 font-medium text-gray-900 bg-white">
                <nuxt-link v-if="itm.profilePicture" :to="`/dashboard/users/${itm.id}`">
                  <CoreImageZoom class="h-20 w-20 cursor-pointer" :src="itm.profilePicture" />
                </nuxt-link>
                <p v-else
                  class="rounded-full h-10 w-10 font-semibold bg-gray-300 text-gray-800 flex justify-center items-center">
                  {{ generateInitials(itm.fname, itm.lname) }}</p>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline" :to="`/dashboard/users/${itm.id}`">{{
      itm.fname
    }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline" :to="`/dashboard/users/${itm.id}`">{{
                  itm.email
                  }}</nuxt-link>
              </td>
              <td class="whitespace-nowrap text-base md:text-sm px-4 py-4 md:py-3 text-gray-700">
                <nuxt-link class="text-blue-700 no-underline hover:underline" :to="`/dashboard/users/${itm.id}`">
                  <img src="@/assets/icons/arrow-right.svg" alt="" />
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
        <CoreEmptyState v-if="usersList.length <= 0 && !loading" title="No User available" desc="">
        </CoreEmptyState>
        <!-- <CoreEmptyState title="No Data available" desc="">
        </CoreEmptyState> -->
      </div>
    </div>
  </main>
</template>


<script setup lang="ts">
import { useFetchReportedUsers } from '@/composables/reports/getReportedUsers'
import { useRecentSignups } from '@/composables/user/getRecentSignups'
import { useFetchUsers } from '@/composables/user/fetch'
const { fetchUsers, usersList, loading } = useFetchUsers()
const { fetchReportedUsers, reportedUsersList, loading: loadingReportedUsers } = useFetchReportedUsers()
const { recentSignups, loading: loadingRecentSignups } = useRecentSignups()
const computedUsersList = computed(() => {
  return usersList.value.slice(0, 5)
})
const computedReportedUsersList = computed(() => {
  return reportedUsersList.value.slice(0, 5)
})
fetchUsers()
fetchReportedUsers()
const activeTable = ref("recent_signup")
const setActiveTable = (val: string) => {
  activeTable.value = val;
}
const generateInitials = (fname: string, lname: string) => {
  return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`
}
</script>