import { userApiFactory } from "@/apiFactory/users";

export const useFetchFollowers = () => {
  const followersList = ref([]);
  const userId = useRoute().params.id;
  const loading = ref(false);
  const pagination = ref({
    page: 1,
    perPage: 10,
    total: 100,
    pages: 0,
  });
  const fetchFollowers = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUserFollowers(
        userId,
        pagination.value
      );
      followersList.value = response?.data?.result || [];
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

  watch(
    () => pagination.value.page,
    () => {
      fetchFollowers();
    }
  );
  return { fetchFollowers, pagination, followersList, loading };
};
