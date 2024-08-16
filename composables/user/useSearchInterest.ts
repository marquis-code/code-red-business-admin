// import { userApiFactory } from "@/apiFactory/users";

// export const useFetchSearchInterest = () => {
//   const interestList = ref<any[]>([]);
//   const loading = ref(false);
//   const pagination = ref({ page: 1, perPage: 10 }) as any;
//   const payload = ref({ search: '' });

//   const fetchInterest = async (searchTerm: string) => {
//     loading.value = true;
//     payload.value.search = searchTerm;
//     try {
//       const response = await userApiFactory.getUserInterests({...pagination.value, search: payload.value.search });
//       interestList.value = response.data || [];
//       pagination.value = response.data.metadata;
//     } catch (error: any) {
//       useNuxtApp().$toast.error(error.message, {
//         autoClose: 5000,
//         dangerouslyHTMLString: true,
//       });
//       return error;
//     } finally {
//       loading.value = false;
//     }
//   };

//   const setPaginationObj = (val: any) => {
//     pagination.value.page = val;
//   };

//   return { fetchInterest, interestList, loading, pagination };
// };


import { userApiFactory } from "@/apiFactory/users";
import { ref } from 'vue';

// Debounce utility function
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
}

export const useFetchSearchInterest = () => {
  const interestList = ref<any[]>([]);
  const loading = ref(false);
  const pagination = ref({ page: 1, perPage: 10 }) as any;
  const payload = ref({ search: '' });

  const fetchInterest = async (searchTerm: string) => {
    loading.value = true;
    payload.value.search = searchTerm;
    try {
      const response = await userApiFactory.getUserInterests({ ...pagination.value, search: payload.value.search });
      interestList.value = response.data.result || [];
      pagination.value = response.data.metadata;
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

  // Debounce the fetchInterest function
  const debouncedFetchInterest = debounce(fetchInterest, 300);

  const setPaginationObj = (val: any) => {
    pagination.value.page = val;
  };

  return { fetchInterest: debouncedFetchInterest, interestList, loading, pagination, setPaginationObj };
};
