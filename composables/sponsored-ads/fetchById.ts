import { adsApiFactory } from "@/apiFactory/ads";

export const useGetSponsoredAdById = () => {
  const loading = ref(false);
  const ad = ref(null);
  const getSponsoredAdById = async (id: string) => {
    loading.value = true;
    try {
      const response = await adsApiFactory.$_fetch_ads_by_id(id);
      ad.value = response.data;
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

  return { getSponsoredAdById, ad, loading };
};
