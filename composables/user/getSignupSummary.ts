import { userApiFactory } from "@/apiFactory/users";

export const useFetchSignupSummary = () => {
  const signupSummaryList = ref([]);
  const loading = ref(false);
  const fetchSignupSummary = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getSignupSummary();
      signupSummaryList.value = response.data;
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

  return { fetchSignupSummary, signupSummaryList, loading };
};
