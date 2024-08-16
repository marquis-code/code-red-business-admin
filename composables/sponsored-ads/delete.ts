import { adsApiFactory } from "@/apiFactory/ads";
import Swal from "sweetalert2";


export const useDeleteSponsoredAds = () => {
  const router = useRouter()
  const loading = ref(false);
  const deleteSponsoredAds = async (id: string | number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete.",
      cancelButtonText: "Nah, Just kidding",
    }).then(async (result) => {
      if (result.value) {
        try {
          loading.value = true;
          const response = await adsApiFactory.$_delete_ads(id);
          router.push({ path: "/dashboard/ads" });
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
      } else {
        Swal.fire("Cancelled", "Action was cancelled", "info");
      }
    });
  };

  return { deleteSponsoredAds, loading };
};
