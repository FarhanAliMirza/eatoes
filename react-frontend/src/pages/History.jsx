import { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://eatoes-production.up.railway.app/api/order/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data);
        setOrders(res.data.orders); // updated to match your API structure
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-4 p-4 border rounded-lg shadow-sm bg-white hover:bg-[#FFF8F1] transition-shadow duration-300 shadow-md"
          >
            <div className="text-sm text-gray-500">
              <p>
                Date:{" "}
                {new Date(order.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}{" "}
                at{" "}
                {new Date(order.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
            <ul className="mt-2 list-disc pl-5 text-gray-800">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.itemName} × {item.quantity} — ₹{item.price}
                </li>
              ))}
            </ul>
            <p className="font-semibold mt-2">Total: ₹{order.totalAmount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
