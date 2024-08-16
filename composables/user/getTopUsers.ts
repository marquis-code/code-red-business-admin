import { userApiFactory } from "@/apiFactory/users";

export const useFetchTopUsers = () => {
  const topUsersList = ref([]);
  const loading = ref(false);
  const fetchTopUsers = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getTopUsers();
      topUsersList.value = response.data;
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

  return { fetchTopUsers, topUsersList, loading };
};
