import { userApiFactory } from "@/apiFactory/users";

export const useFetchTotalUsers = () => {
  const totalUsers = ref([]) as Record<string, any>;
  const loading = ref(false);
  const fetchTotalUsers = async () => {
    try {
      const response = await userApiFactory.getTotalUsers();
      totalUsers.value = response?.data?.result || [];
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message || 'Something went wrong while fetching users.', {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  return { totalUsers, fetchTotalUsers, loading };
};
