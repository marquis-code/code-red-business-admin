import { userApiFactory } from "@/apiFactory/users";

export const useFetchUserById = () => {
  const user = ref([]) as Record<string, any>;
  const userId = useRoute().params.id;
  const loading = ref(false);
  const fetchUser = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUserById(userId);
      user.value = response.data;
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

  return { fetchUser, user, loading };
};
