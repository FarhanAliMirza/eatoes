import { useState, useContext } from "react";
import Button from "./Button";
import CartItem from "./CartItem";
import { StoreContext } from "../context/storeContext";
import axios from "axios";
import { ShoppingBasket } from "lucide-react";

const CartModal = () => {
  const { cartItems } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [number, setNumber] = useState(0);
  const notLoggedIn = localStorage.getItem("token") == null;
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const handleCheckout = async () => {
    setLoading(true);
    if (notLoggedIn) {
      if (number.length < 10) {
        alert("Please enter a valid phone number");
        return;
      }

      const orderPayload = {
        phone: number,
        items: cartItems,
        totalAmount: total,
      };
      try {
        const response = await axios.post(
          `https://eatoes-production.up.railway.app/api/order`
        );
        orderPayload;
        alert("Order Successful");
      } catch (e) {
        console.log(e);
      }

      console.log(orderPayload);
    } else {
      const orderPayload = {
        items: cartItems,
        totalAmount: total,
      };
      try {
        const response = await axios.post(
          `https://eatoes-production.up.railway.app/api/order`,
          orderPayload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Order Successful");
      } catch (e) {
        console.log(e);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className={`${
          cartItems.length === 0 ? "text-[#333333]" : "text-[#FFB347]"
        } hover:text-[#FF7F11] font-medium transition-colors duration-300`}
        onClick={() => setShowCart(true)}
      >
        <ShoppingBasket />
      </button>

      {showCart && (
        <div className="fixed inset-0 bg-black/40  z-40 flex items-center justify-center px-4 transition-opacity duration-300">
          <div className="bg-white opacity-100 w-full max-w-md rounded-lg shadow-lg z-50 p-6 relative">
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4 max-h-72 overflow-y-auto">
                  {notLoggedIn && (
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      className="border w-full p-2 mb-2 rounded"
                    />
                  )}
                  {cartItems.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))}
                </div>

                <div className="mt-6 border-t pt-4 flex justify-between items-center">
                  <span className="font-semibold text-lg">Total:</span>
                  <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="mt-6 w-full"
                  loading={loading}
                >
                  Proceed to Checkout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
