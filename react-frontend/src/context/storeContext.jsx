import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext({ menuItems: [], cartItems: [] });

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await axios.get(
        `https://eatoes-production.up.railway.app/api/menu`
      );
      setMenuItems(response.data);
    };
    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    console.log(item);
    setCartItems((prevCart) => {
      const index = prevCart.findIndex(i => i.name === item.name);
      if (index !== -1) {
        const updated = [...prevCart];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + 1
        };
        return updated;
      }
      return [...prevCart, { name: item.name, price: item.price, quantity: 1 }];
    });
  };
  
  

  const removeFromCart = (item) => {
    console.log(item);
    setCartItems((prevCart) => {
      const index = prevCart.findIndex(i => i.name === item.name);
      if (index === -1) return prevCart;
  
      const updated = [...prevCart];
      if (updated[index].quantity > 1) {
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity - 1
        };
      } else {
        updated.splice(index, 1);
      }
      return updated;
    });
  };
  
  

  return (
    <StoreContext.Provider
      value={{ menuItems, cartItems, addToCart, removeFromCart }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
