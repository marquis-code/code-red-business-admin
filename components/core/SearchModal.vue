<template>
  <div v-if="isOpen"
    class="fixed h-screen w-screen z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    @click.self="closeModal">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mt-16"> <!-- Added mt-16 to create distance from top -->
      <input type="text" v-model="query" placeholder="Search for anything.."
        class="w-full border border-gray-300 p-2 py-3 rounded-md mb-2" autofocus />
      <div v-if="loading" class="h-30 bg-slate-500 animate-pulse rounded mt-3"></div>
      <div v-if="queryResult?.users?.length || queryResult?.stories?.length" class="max-h-80 overflow-y-auto space-y-2.5 hide-scrollbar"> <!-- Added max-h-80 and overflow-y-auto for scroll -->
        <div v-if="queryResult.users.length">
          <p class="text-sm text-gray-700">Users search response for {{ query }}</p>
          <ul class="mt-1">
            <li v-for="user in queryResult.users" :key="user.id" @click.stop="navigateTo(`/dashboard/users/${user.id}`)"
              class="p-2 hover:bg-gray-100 cursor-pointer">
              {{ user.fname }} - {{ user.lname }}
            </li>
          </ul>
        </div>
        <div v-if="queryResult?.stories?.length">
          <p class="text-sm text-gray-700">Pods search response for {{ query }}</p>
          <ul class="mt-1">
            <li v-for="stori in queryResult.stories" :key="stori.id"
              @click.stop="navigateTo(`/dashboard/pods/${stori.id}`)"
              class="p-2 text-sm hover:bg-gray-100 cursor-pointer">
              {{ stori.title }} - {{ stori.description }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="!queryResult?.stories?.length && !queryResult?.users?.length && searchQuery" class="p-2 text-gray-600">
        No matching result found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetchGlobalSearch } from '@/composables/core/useGlobalSearch'
import { useRouter } from 'vue-router';
const { query, loading, queryResult } = useFetchGlobalSearch()

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['update:isOpen']);

const searchQuery = ref('');
const router = useRouter();
const routes = router.getRoutes().map(route => ({
  path: route.path,
  name: route.name || 'Unnamed Route',
}));

const filteredRoutes = computed(() => {
  return routes.filter((route: any) => route.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

function formatRouteName(name: any): string {
  return name.replace(/-/g, ' ');
}

const navigateTo = (path: string) => {
  router.push(path);
  emit('update:isOpen', false);
};

const closeModal = () => {
  emit('update:isOpen', false);
};
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}
</style>
