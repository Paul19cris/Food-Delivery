import { axiosInstance } from "../../../../api/api";

export const getOrderesCall = async (key) => axiosInstance.get(`/order/getOrders?email=${key}`)
export const sendMessageCall = async (lst) => axiosInstance.post(`/message/sendMessage?username=${lst[0]}&friend=${lst[1]}&message=${lst[2]}`)
export const getUnseenMessagesCall = async (lst) => axiosInstance.get(`/message/getUnseenMessages?username=${lst[0]}&friend=${lst[1]}`)
export const setToSeenMessageCall = async (lst) => axiosInstance.post(`/message/setToSeenMessage?username=${lst[0]}&friend=${lst[1]}&messageId=${lst[2]}`)