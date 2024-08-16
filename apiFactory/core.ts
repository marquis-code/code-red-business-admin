import { axiosInstance } from "./axios.config";

export const coreApiFactory = {
  $_global_search(query: Record<string, any>) {
    return axiosInstance.get(`/search?query=${query}`);
  }
};