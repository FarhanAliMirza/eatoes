import {CountButton} from "./MenuItem";

const CartItem = ({ item }) => {
  const { name, price, quantity } = item;

  return (
    <div className="flex items-center justify-between border-t py-2">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">
          ₹{price} × {quantity} = ₹{price * quantity}
        </p>
      </div>
      <CountButton count={quantity} item={item} />
    </div>
  );
};

export default CartItem;
