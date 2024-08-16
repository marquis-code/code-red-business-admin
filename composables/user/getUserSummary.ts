import { userApiFactory } from "@/apiFactory/users";

export const useFetchUserSummary = () => {
  const userSummary = ref([]);
  const userId = useRoute().params.id
  const loading = ref(false);
  const fetchUserSummary = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUserSummary(userId);
      userSummary.value = response.data;
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

  return { fetchUserSummary, userSummary, loading };
};
