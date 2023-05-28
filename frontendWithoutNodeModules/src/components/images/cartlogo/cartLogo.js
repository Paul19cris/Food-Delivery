import React from 'react';
import cart from './cartLogo.png';
import './cartLogo.css';

export default function CartLogo(){
    return(
        <header className='header'>
            <img src={cart} className="App-cart" alt="cart" />
          </header>
)}