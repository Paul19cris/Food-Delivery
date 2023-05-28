import { axiosInstance } from "../../../api/api";



export const newRestaurantCall = async (lst) => axiosInstance.post(`/restaurant/createNewRestaurant?name=${lst[0]}&type=${lst[1]}&location=${lst[2]}&username=${lst[3]}`, lst, { headers: { Authorization: undefined } })
