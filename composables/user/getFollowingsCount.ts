import { userApiFactory } from "@/apiFactory/users";

export const useFetchFollowingsCount = () => {
  const followingsCount = ref([]);
  const userId = useRoute().params.id
  const loading = ref(false);
  const fetchFollowingsCount = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUserFollowingCount(userId);
      followingsCount.value = response.data;
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

  return { fetchFollowingsCount, followingsCount, loading };
};
