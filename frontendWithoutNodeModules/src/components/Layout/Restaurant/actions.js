import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVisitRestaurantCall } from "./services";

export const fetchVisitRestaurantData = createAsyncThunk('fetchVisitRestaurantData', async (restaurant) => {
    try {
        const response = await fetchVisitRestaurantCall(restaurant);
        
        return response
        
    } catch (error) {
        return null
    }
    
})