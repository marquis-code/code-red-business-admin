import { storyApiFactory } from "@/apiFactory/story";

export const useFetchStories = () => {
  const storiesList = ref([]) as any;
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
  const fetchStories = async () => {
    loading.value = true;
    try {
      const response = await storyApiFactory.getAllStories(queryObj.value, pagination.value);
      storiesList.value = response?.data?.result || [];
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
    if (!query) return storiesList.value;

    return storiesList.value.filter(
      (story) =>
        story.fname.toLowerCase().includes(query) ||
        story.lname.toLowerCase().includes(query)
    );
  });

  watch(
    () => pagination.value.page,
    (newPage) => {
      setPaginationObj(newPage);
      fetchStories();
    }
  );

  watch(
    () => queryObj.value.sortBy,
    (newSortBy, oldSortBy) => {
      if (newSortBy !== oldSortBy) {
        fetchStories();
      }
    }
  );

  watch(
    () => queryObj.value.orderBy,
    (newOrderBy, oldOrderBy) => {
      if (newOrderBy !== oldOrderBy) {
        fetchStories();
      }
    }
  );

  const setPaginationObj = (val: any) => {
    pagination.value.page = val;
  };

  return {
    fetchStories,
    storiesList,
    loading,
    pagination,
    searchQuery,
    filteredStories,
    queryObj
  };
};
