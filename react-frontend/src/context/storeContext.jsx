import {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const StoreContext = createContext({menuItems: [], cartItems: []});

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            const response = await axios.get('http://localhost:3000/api/menu');
            setMenuItems(response.data);
        };
        fetchMenuItems();
    }, []);

    const addToCart = (itemName) => {
        if(!cartItems[itemName]){
            setCartItems((prev)=> ({...prev, [itemName]: 1}));
        }
        else{
            setCartItems((prev)=> ({...prev, [itemName]: prev[itemName] + 1}));
        }
    };

    const removeFromCart = (itemName) => {
        setCartItems((prev)=> ({...prev, [itemName]: prev[itemName] - 1}));
    };

    return (
        <StoreContext.Provider value={{menuItems, cartItems, addToCart, removeFromCart}}>
            {props.children}
        </StoreContext.Provider>
    );  
};

export default StoreContextProvider;