import { userApiFactory } from "@/apiFactory/users";

export const useFetchFollowersCount = () => {
  const followersCount = ref({});
  const userId = useRoute().params.id
  const loading = ref(false);
  const fetchFollowersCount = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUserFollowersCount(userId);
      followersCount.value = response.data;
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

  return { fetchFollowersCount, followersCount, loading };
};
