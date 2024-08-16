import { userApiFactory } from "@/apiFactory/users";

export const useDeactivateUser = () => {
  const loading = ref(false);
  const deactivateUser = async (userId: string, payload: any) => {
    loading.value = true;
    try {
      const response = await userApiFactory.deactivateUser(userId, payload);
      return response
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

  return { deactivateUser, loading };
};
