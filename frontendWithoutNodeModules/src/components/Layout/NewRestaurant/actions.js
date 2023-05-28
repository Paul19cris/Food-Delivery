import { createAsyncThunk } from "@reduxjs/toolkit";
import { newRestaurantCall } from "./services";

export const newRestaurantAsync = createAsyncThunk('newRestaurant', async (lst) => {
    try {
        const response = await newRestaurantCall(lst)
        
        return response
        
    } catch (error) {
        return null
    }
} )
