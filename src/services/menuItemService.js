import { axiosInstance } from "../config/axiosInstance";

export const deleteMenuItem = async (id) => {
    await axiosInstance.delete(`/user/delete-item/${id}`);
};