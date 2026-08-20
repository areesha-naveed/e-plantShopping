import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList && !showCart ? (
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h1>Welcome To Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button 
            onClick={handleGetStartedClick} 
            style={{ padding: '12px 24px', fontSize: '18px', cursor: 'pointer', marginTop: '20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Get Started
          </button>
        </div>
      ) : showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <ProductList onHomeClick={handleHomeClick} onCartClick={handleCartClick} />
      )}
    </div>
  );
}

export default App;