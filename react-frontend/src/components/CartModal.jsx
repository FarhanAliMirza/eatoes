import { useState, useContext } from "react";
import CartItem from "./CartItem";
import { StoreContext } from "../context/storeContext";

import { ShoppingBasket } from "lucide-react";

const CartModal = () => {
  const { cartItems } = useContext(StoreContext);
  const [showCart, setShowCart] = useState(false);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <button
        className="text-[#333333] hover:text-[#FF7F11] font-medium transition-colors duration-300"
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
                  {cartItems.map((item, index) => (
                    <CartItem key={index} item={item} />
                  ))}
                </div>

                <div className="mt-6 border-t pt-4 flex justify-between items-center">
                  <span className="font-semibold text-lg">Total:</span>
                  <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => console.log("checkout")}
                  className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
