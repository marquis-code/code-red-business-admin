import { storyApiFactory } from "@/apiFactory/story";

export const useFetchUserStories = () => {
  const userStoriesList = ref([]) as any;
  const route = useRoute();
  const loading = ref(false);
  const searchQuery = ref<string>("");
  const queryObj = ref({
    sortBy: 'createdAt',
    orderBy: 'desc'
  }) as any
  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 0,
    pages: 0,
  });

  const fetchUserStories = async (userId?: string) => {
    loading.value = true;
    try {
      const response = await storyApiFactory.getStoryByUserId(route.params.id || userId, queryObj.value, pagination.value);
      userStoriesList.value = response?.data?.result ?? [];
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


  const filteredStories = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return userStoriesList.value;

    return userStoriesList.value.filter(
      (story) =>
        story.fname.toLowerCase().includes(query) ||
        story.lname.toLowerCase().includes(query)
    );
  });

  watch(
    () => pagination.value.page,
    (newPage) => {
      setPaginationObj(newPage);
      fetchUserStories();
    }
  );

  watch(
    () => queryObj.value.sortBy,
    (newSortBy, oldSortBy) => {
      if (newSortBy !== oldSortBy) {
        fetchUserStories();
      }
    }
  );

  watch(
    () => queryObj.value.orderBy,
    (newOrderBy, oldOrderBy) => {
      if (newOrderBy !== oldOrderBy) {
        fetchUserStories();
      }
    }
  );

  const setPaginationObj = (val: any) => {
    pagination.value.page = val;
  };


  return { fetchUserStories, userStoriesList, loading, pagination,
    searchQuery,
    filteredStories,
    queryObj };
};
