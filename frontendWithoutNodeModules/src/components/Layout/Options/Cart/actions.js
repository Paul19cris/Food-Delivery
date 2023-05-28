import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteFromCartCall, placeOrderCall, setNotToSeenCall } from "./services";

export const setNotToSeenData = createAsyncThunk('setToSeenNotification', async (lst) => {
    try {
        const response = await setNotToSeenCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const deleteFromCartAsync = createAsyncThunk('deleteFromCart', async (lst) => {
    try {
        const response = await deleteFromCartCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const placeOrderAsync = createAsyncThunk('placeOrder', async (email) => {
    try {
        const response = await placeOrderCall(email);
        
        return response
        
    } catch (error) {
        return null
    }
    
})