import AvatarButton from "./AvatarButton";
import AuthModal from "./AuthModal";
import CartModal from "./CartModal";

const Navbar = () => {
  
  return (
    <div className="bg-[#FFF8F1] shadow-md p-4 flex justify-between items-center m-2 rounded-xl">
      <div className="text-2xl font-bold text-[#FF7F11]">eatoes</div>
      <div className="flex sm:space-x-6 space-x-3 items-center">
        <a
          href="/"
          className="text-[#333333] hover:text-[#FF7F11] font-medium sm:text-md text-sm transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="/menu"
          className="text-[#333333] hover:text-[#FF7F11] font-medium sm:text-md text-sm transition-colors duration-300"
        >
          Menu
        </a>
        <CartModal />
        {localStorage.getItem("token") ? <AvatarButton /> : <AuthModal />}
      </div>
    </div>
  );
};

export default Navbar;
