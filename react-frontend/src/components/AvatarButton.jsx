import { useState } from "react";
import { User, ReceiptText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


const AvatarButton = () => {
  const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("logout");
      localStorage.removeItem("token");
      navigate(0);
    };
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
         className="bg-[#FF7F11] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold"
      >
        <User />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white rounded shadow-md w-40 z-10">
          <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 hover:text-[#FF7F11]">
            <ReceiptText />
            <a href="/history" className="block">
              Order History
            </a>
          </div>
          <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 hover:text-[#FF7F11]">
            <LogOut />
            <button
              onClick={handleLogout}
              className="block pl-4 text-left w-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarButton;
