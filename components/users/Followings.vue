<template>
    <main>
      <div v-if="users.length">
        <UsersTableList :usersList="users" :loadingUsers="loading" :pagination="pagination" />
      </div>
      <CoreEmptyState v-if="users.length <= 0 && !loading" title="No Followings available" desc="">
      </CoreEmptyState>
      <LoadingSpinner v-if="loading" />
    </main>
  </template>
  
  <script setup lang="ts">
  defineProps({
    users: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    pagination: {
      type: Object,
      required: true,
    },
  })
  </script>