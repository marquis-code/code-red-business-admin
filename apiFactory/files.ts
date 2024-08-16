import { axiosInstance } from "./axios.config";

export const filesApiFactory = {
  uploadFile(payload: any) {
    return axiosInstance.post("/files", payload);
  },
};
