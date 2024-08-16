import { userApiFactory } from "@/apiFactory/users";
import { ref, watch } from "vue";
import { useNuxtApp } from "#app";

// Debounce function to limit the rate at which a function can be called
function debounce(fn: Function, delay: number) {
  let timeoutId: number | undefined;
  return function (...args: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export const useFetchUsers = () => {
  const usersList = ref([]) as any;
  const loading = ref(false);
  const searchQuery = ref<string>("");
  const sortBy = ref<string>("DESC");
  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 100,
    pages: 0,
  });

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUsersList(pagination.value, searchQuery.value, sortBy.value);
      usersList.value = response.data.result;
      pagination.value = response.data.metadata;
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  const debouncedFetchUsers = debounce(fetchUsers, 300);

  watch(searchQuery, (newQuery) => {
    setPaginationObj(1); // Reset to the first page when search query changes
    debouncedFetchUsers();
  });


  watch(sortBy, (newQuery) => {
    setPaginationObj(1); // Reset to the first page when search query changes
    debouncedFetchUsers();
  });

  watch(
    () => pagination.value.page,
    () => {
      fetchUsers();
    }
  );



  const setPaginationObj = (val: any) => {
    pagination.value.page = val;
  };

  return {
    fetchUsers,
    usersList,
    loading,
    pagination,
    searchQuery,
    sortBy
  };
};
