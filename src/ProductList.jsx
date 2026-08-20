import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick, onCartClick }) {
  const dispatch = useDispatch();
  
  // Safe state selector taake app crash na ho
  const cartItems = useSelector((state) => (state.cart && state.cart.items) ? state.cart.items : []);
  const [addedToCart, setAddedToCart] = useState({});

  // Clean and complete plants array without syntax errors
  const plantsArray = [
    {
      category: "Aromatic Plants",
      plants: [
        { 
          name: "Lavender", 
          image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=400", 
          description: "Calming scent, ideal for relaxation.", 
          cost: "$18" 
        },
        { 
          name: "Jasmine", 
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Jasminum_officinale_1.jpg/400px-Jasminum_officinale_1.jpg", 
          description: "Sweet aroma with bright white blooms.", 
          cost: "$20" 
        },
        { 
          name: "Rosemary", 
          image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400", 
          description: "Invigorating herb used in cooking & scents.", 
          cost: "$15" 
        }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { 
          name: "Aloe Vera", 
          image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400", 
          description: "Soothes skin burns and aids digestion.", 
          cost: "$12" 
        },
        { 
          name: "Peppermint", 
          image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400", 
          description: "Helps relieve stress and headache.", 
          cost: "$10" 
        },
        { 
          name: "Echinacea", 
          image: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=400", 
          description: "Boosts immune system naturally.", 
          cost: "$16" 
        }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Top Header/Navbar */}
      <nav style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '15px 40px', 
          background: '#2e7d32', 
          color: 'white', 
          zIndex: 1000, 
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
          boxSizing: 'border-box'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={onHomeClick}>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={onHomeClick} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', border: 'none', background: '#fff', color: '#2e7d32', fontWeight: 'bold' }}>Home / Landing</button>
          <button onClick={onCartClick} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', border: 'none', background: '#ff9800', color: 'white', fontWeight: 'bold' }}>
            🛒 Cart ({calculateTotalQuantity()})
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div style={{ marginTop: '90px', padding: '20px', height: 'calc(100vh - 90px)', overflowY: 'auto' }}>
        {plantsArray.map((categoryObj, index) => (
          <div key={index} style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#2e7d32', borderBottom: '2px solid #2e7d32', paddingBottom: '5px' }}>{categoryObj.category}</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
              {categoryObj.plants.map((plant, plantIndex) => (
                <div key={plantIndex} style={{ 
                    border: '1px solid #ddd', 
                    padding: '15px', 
                    width: '230px', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                    textAlign: 'center', 
                    background: '#fff' 
                }}>
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} 
                  />
                  <h3 style={{ margin: '10px 0 5px 0' }}>{plant.name}</h3>
                  <p style={{ fontSize: '13px', color: '#555', height: '40px' }}>{plant.description}</p>
                  <p style={{ fontWeight: 'bold', fontSize: '16px', color: '#2e7d32' }}>{plant.cost}</p>
                  <button
                    disabled={addedToCart[plant.name]}
                    onClick={() => handleAddToCart(plant)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer',
                      background: addedToCart[plant.name] ? '#ccc' : '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: 'bold'
                    }}
                  >
                    {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;