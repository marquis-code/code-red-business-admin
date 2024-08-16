// composables/user/getRecentSignups.ts
import { useFetchUsers } from '@/composables/user/fetch'
import { computed } from 'vue'
import moment from 'moment'

export function useRecentSignups() {
  const { fetchUsers, usersList, loading, orderBy } = useFetchUsers();
  
  const recentSignups = computed(() => {
    return usersList.value
      .slice()
      .sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())
      .slice(0, 5);
  });

  // Fetch the users when the composable is used
  // orderBy.value = 'ASC'
  fetchUsers();

  return {
    recentSignups,
    loading
  };
}
