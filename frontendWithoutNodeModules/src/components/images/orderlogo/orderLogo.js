import React from 'react';
import orders from './orderLogo.png';
import './orderLogo.css';

export default function OrderLogo(){
    return(
        <header className='header'>
            <img src={orders} className="App-orders" alt="orders" />
          </header>
)}