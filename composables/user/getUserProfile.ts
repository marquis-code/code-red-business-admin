import { userApiFactory } from "@/apiFactory/users";

export const useFetchUserProfile = () => {
  const userProfileObj = ref({});
  const loading = ref(false);
  const fetchUserProfile = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUserProfile();
      userProfileObj.value = response.data;
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  return { fetchUserProfile, userProfileObj, loading };
};
