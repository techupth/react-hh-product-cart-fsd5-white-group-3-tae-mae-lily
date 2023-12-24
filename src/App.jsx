import "./App.css";
import "./data/products";
import React, { useState } from "react";
import products from "./data/products";

const App = () => {
  // State Hooks
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  
  const addToCart = (products) => {
    //Updating the Cart Array
    const updatedCart = [...cart, { ...products, quantity: 1 }];
    setCart(updatedCart);
    calculatePrice(updatedCart);
  };

  const removeFromCart = (products) => {
    const updatedCart = cart.filter((item) => item.id !== products.id);
    setCart(updatedCart);
    calculatePrice(updatedCart);
  };

  const updateQuantity = (product, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        item.quantity += action === "add" ? 1 : -1;
      }
      return item;
    });
    setCart(updatedCart);
    calculatePrice(updatedCart);
  };

  const calculatePrice = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };
 
  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">

          {/*Rendering Products*/}
          {products.map((product) => (
             <div className="product" key={product.id}>
             <img src={product.image} alt={product.name}/>
             <h2>{product.name}</h2>
             <h2>{product.price} Baht</h2>
             <p>{product.description}</p>
             <button onClick={() => addToCart(product)}>Add to cart</button>
           </div>
           ))}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">Cart (Total Price is {totalPrice} Baht)</h1>
        <div className="cart-item-list">

        {/*Rendering cartItem*/}  
        {cart.map((cartItem) => (
          <div className="cart-item" key={String(cartItem.id)}>
            <h1>Item name: {cartItem.name}</h1>
            <h2>Price: {cartItem.price} Baht</h2>
            <h2>Quantity: {cartItem.quantity}</h2>
            <button className="delete-button" onClick={() => removeFromCart(cartItem)}>x</button>

            <div className="quantity-actions">
              <button className="add-quantity" onClick={() => updateQuantity(cartItem, 'add')}>+</button>
              <button className="subtract-quantity" onClick={() => updateQuantity(cartItem, 'subtract')}>-</button>
            </div>

          </div>
        ))};
        </div>
      </section>
    </div>  
  )
}

export default App;
