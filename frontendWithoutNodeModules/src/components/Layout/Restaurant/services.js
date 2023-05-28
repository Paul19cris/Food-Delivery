import { axiosInstance } from "../../../api/api";


export const fetchVisitRestaurantCall = async (restaurant) => axiosInstance.get(`/restaurant/getRestaurantByName?restaurant=${restaurant}`) 