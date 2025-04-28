import React from "react";
import Button from "./Button";
import { ShoppingBasket } from 'lucide-react';

const Navbar = () => {
  return (
    // <nav className="bg-[#FFF8F1] shadow-md p-4 flex justify-between items-center">
    //   {/* Logo/Brand Name */}
    //   <div className="text-2xl font-bold text-[#FF7F11]">Digital Diner 🍽️</div>

    //   {/* Navbar Links */}
    //   <div className="flex space-x-6">
    //     <Link
    //       to="/"
    //       className="text-[#333333] hover:text-[#FF7F11] font-medium transition-colors duration-300"
    //     >
    //       Menu
    //     </Link>
    //     <Link
    //       to="/cart"
    //       className="text-[#333333] hover:text-[#FF7F11] font-medium transition-colors duration-300"
    //     >
    //       Cart
    //     </Link>
    //     <Link
    //       to="/orders"
    //       className="text-[#333333] hover:text-[#FF7F11] font-medium transition-colors duration-300"
    //     >
    //       Order History
    //     </Link>
    //   </div>
    // </nav>
    <div className="bg-[#FFF8F1] shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-[#FF7F11]">eatos</div>
      <div className="flex space-x-6 items-center">
        <a
          href="/"
          className="text-[#333333] hover:text-[#FF7F11] font-medium transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="/menu"
          className="text-[#333333] hover:text-[#FF7F11] font-medium transition-colors duration-300"
        >
          Menu
        </a>
        <a
          href="/cart"
          className="text-[#333333] hover:text-[#FF7F11] font-medium transition-colors duration-300"
        >
          <ShoppingBasket/>
        </a>
        
        <Button bgColor="#FFB347" hoverColor="#FF7F11" textColor="#333333">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
