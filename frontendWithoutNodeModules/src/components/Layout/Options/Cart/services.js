import { axiosInstance } from "../../../../api/api";

export const setNotToSeenCall = async (lst) => axiosInstance.post(`/notification/setToSeenNotification?username=${lst[0]}&notId=${lst[1]}`)
export const deleteFromCartCall = async (lst) => axiosInstance.post(`/food/deleteFoodFromBasket?id=${lst[0]}&email=${lst[1]}`)
export const placeOrderCall = async (email) => axiosInstance.post(`/order/placeOrder?email=${email}`)