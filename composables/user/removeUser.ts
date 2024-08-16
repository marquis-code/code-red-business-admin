import { userApiFactory } from "@/apiFactory/users";

export const useRemoveUser = () => {
//   const userId = useRoute().params.id;
  const loading = ref(false);
  const removeUser = async (userId: string | number) => {
    loading.value = true;
    try {
      const response = await userApiFactory.removeUser(userId);
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

  return { removeUser, loading };
};
