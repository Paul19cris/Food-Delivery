import React from 'react';
import pizzaPicture from "./pizza.png";

export default function PizzaPicture() {
    return (
        <header className="pizzaPictureHeader">
            <img src={pizzaPicture} className="App-pizzaPicture" alt="pizzaPicture" />
        </header>
)}