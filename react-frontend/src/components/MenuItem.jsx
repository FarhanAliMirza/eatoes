import Button from "./Button";

const MenuItem = ({ item }) => {
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
          <Button disabled={!item.isAvailable}>
            {item.isAvailable ? "Add to Cart" : "Unavailable"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
