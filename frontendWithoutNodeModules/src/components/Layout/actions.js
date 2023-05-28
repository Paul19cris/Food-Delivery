import { createAsyncThunk } from "@reduxjs/toolkit";
import { addFoodToMenuCall, addToCartCall, addToFavoritesCall, deleteFoodCall, fetchNewsCall, fetchUserCall, fetchVisitCall, getFavoritesCall, getRestaurantMenuCall, getRestaurantStatusCall, getRestaurantsCall, getRestaurantsOfUserCall, sortRestaurantsCall } from "./services";

export const fetchUserData = createAsyncThunk('fetchUserData', async (account) => {
    try {
        const response = await fetchUserCall(account);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const fetchVisitData = createAsyncThunk('fetchVisitData', async (account) => {
    try {
        const response = await fetchVisitCall(account);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const fetchNewsData = createAsyncThunk('fetchNewsData', async (lst) => {
    try {
        const response = await fetchNewsCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const sortRestaurantsAsync = createAsyncThunk('sortRestaurants', async (lst) => {
    try {
        const response = await sortRestaurantsCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const getRestaurantsData = createAsyncThunk('getRestaurantsData', async () => {
    try {
        const response = await getRestaurantsCall();
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const getFavoritesData = createAsyncThunk('getFavoritesData', async (username) => {
    try {
        const response = await getFavoritesCall(username);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const getUserRestaurantsData = createAsyncThunk('getRestaurantsOfUser', async (username) => {
    try {
        const response = await getRestaurantsOfUserCall(username);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const getRestaurantMenu = createAsyncThunk('getRestaurantMenu', async (username) => {
    try {
        const response = await getRestaurantMenuCall(username);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const getRestaurantStatus = createAsyncThunk('getRestaurantStatus', async (lst) => {
    try {
        const response = await getRestaurantStatusCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const addToFavoritesData = createAsyncThunk('addToFavoritesData', async (lst) => {
    try {
        const response = await addToFavoritesCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const deleteFoodAsync = createAsyncThunk('deleteFood', async (lst) => {
    try {
        const response = await deleteFoodCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const addToCartAsync = createAsyncThunk('addToCart', async (lst) => {
    try {
        const response = await addToCartCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})

export const addFoodToMenu = createAsyncThunk('addFoodToMenu', async (lst) => {
    try {
        const response = await addFoodToMenuCall(lst);
        
        return response
        
    } catch (error) {
        return null
    }
    
})