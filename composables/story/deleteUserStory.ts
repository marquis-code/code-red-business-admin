import { storyApiFactory } from "@/apiFactory/story";
import { useFetchStories } from "@/composables/story/fetch";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { ref } from "vue";
const { fetchStories } = useFetchStories();

export const useDeleteStory = () => {
  const router = useRouter();
  const loading = ref(false);

  const deleteStory = async (id) => {
    Swal.fire({
      icon: "question",
      title: "Please Confirm",
      text: "Are you sure you want to remove this story",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete.",
      cancelButtonText: "Nah, Just kidding",
      preConfirm: async () => {
        return await storyApiFactory.deleteUserStory(id).catch((error: any) => {
          const msg = error.response && error.response.data ? error.response.data.message : "An error occurred, please try again.";
          Swal().showValidationMessage(msg);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetchStories()
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Action successful!",
          showCloseButton: true,
        });
      }
    });
  };

  return { deleteStory, loading };
};
