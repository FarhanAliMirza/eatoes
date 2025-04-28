import React from "react";
import items from "../assets/test.json";
import MenuItem from "../components/MenuItem";
const Menu = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold text-gray-800">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <MenuItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
