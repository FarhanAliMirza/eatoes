import Button from "./Button";
import { useContext, useState, useEffect, use } from "react";
import { StoreContext } from "../context/storeContext";
import { Plus, Minus } from "lucide-react";

export const CountButton = ({ count, item }) => {
  const { addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="flex items-center justify-between gap-2 bg-[#FFF8F1] ">
      <button
        className={`bg-[#FF7F11] text-white hover:bg-[#FFB347] p-1 rounded-md`}
        onClick={() => removeFromCart(item)}
      >
        <Minus />
      </button>
      {count}
      <button
        className={`bg-[#FF7F11] text-white hover:bg-[#FFB347] p-1 rounded-md`}
        onClick={() => addToCart(item)}
      >
        <Plus />
      </button>
    </div>
  );
};

const MenuItem = ({ item }) => {
  const { cartItems, addToCart } = useContext(StoreContext);
  // const [quantity, setQuantity] = useState(0);

  // useEffect(() => {
    const quantity= cartItems.find((i) => i.name === item.name)?.quantity || 0;
  // }, [cartItems]);
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md hover:shadow-lg hover:bg-[#FFF8F1] transition-shadow duration-300 bg-white">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full md:w-40 h-40 object-cover rounded-md"
      />
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
          <p className="text-gray-500 mt-1">{item.category}</p>
        </div>
        {item.description && (
          <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
        )}
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-orange-500">
            ₹{item.price}
          </span>
          {quantity === 0 ? (
            <Button
              disabled={!item.isAvailable}
              onClick={() => addToCart(item)}
            >
              {item.isAvailable ? "Add to Cart" : "Unavailable"}
            </Button>
          ) : (
            <CountButton count={quantity} item={item} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
