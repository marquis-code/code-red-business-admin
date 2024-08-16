import { userApiFactory } from "@/apiFactory/users";

export const useEditUser = () => {
  const loading = ref(false);
  const payload = ref({}) as any
  const editUser = async (userId: string) => {
    loading.value = true;
    try {
      const response = await userApiFactory.editUser(userId, payload);
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

  return { editUser, loading, payload };
};
