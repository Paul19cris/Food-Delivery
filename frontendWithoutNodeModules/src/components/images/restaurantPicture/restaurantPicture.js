import React from 'react';
import restaurantPicture from "./restaurant.png";

export default function RestaurantPicture() {
    return (
        <header className="restaurantPictureHeader">
            <img src={restaurantPicture} className="App-restaurantPicture" alt="restaurantPicture" />
        </header>
)}