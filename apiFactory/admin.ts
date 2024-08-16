import { axiosInstance } from './axios.config'

export const adminApiFactory = {
  createAdmin(data: any) {
    return axiosInstance.post('/admin/user', data);
  }
};
