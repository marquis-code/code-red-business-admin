import { adsApiFactory } from "@/apiFactory/ads";

export const useGetAllSponsoredAds = () => {
  const loading = ref(false);
  const ads = ref([]) as any;
  const getAllSponsoredAds = async () => {
    loading.value = true;
    try {
      const response = await adsApiFactory.$_fetch_ads();
      ads.value = response.data;
      return response;
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

  return { getAllSponsoredAds, ads, loading };
};
