import { useState } from "react";
import axios from "axios";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const AuthModal = ({
  bgColor = "#FFB347",
  hoverColor = "#FF7F11",
  textColor = "#333333",
}) => {
  const [form, setForm] = useState({ phone: "", password: "", name: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:3000/api/auth/signin";
  // const url = "https://eatoes-production.up.railway.app/api/auth/signin";
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (form.phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    else if (!isLogin && form.name == "") {
      alert("Name is required");
    }
    else if (isLogin) {
      try {
        const response = await axios.post(
          `${url}`,
          {
            phone: form.phone,
            password: form.password,
          }
        );
        localStorage.setItem("token",response.data.token);
        setShowAuthModal(false);
        alert("Login Successful");
        navigate(0);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await axios.post(
          `https://eatoes-production.up.railway.app/api/auth/signup`,
          {
            phone: form.phone,
            password: form.password,
            name: form.name,
          }
        );
        localStorage.setItem("token",response.data.token);
        setShowAuthModal(false);
        alert("Login Successful");
        navigate(0);
      } catch (e) {
        console.log(e);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        bgColor={bgColor}
        hoverColor={hoverColor}
        textColor={textColor}
        onClick={() => setShowAuthModal(true)}
      >
        Login
      </Button>
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold mb-4">
                {isLogin ? "Login" : "Sign Up"}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="-mt-5 text-gray-600 hover:text-black text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                className="border w-full p-2 mb-2 rounded"
              />
            )}

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="border w-full p-2 mb-2 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="border w-full p-2 mb-4 rounded"
            />

            <Button
              onClick={handleSubmit}
              loading={loading}
              className={`w-full hover:bg-[#FFB347] ${isLogin ? "mt-11" : ""}`}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <p className="text-sm mt-4 text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="text-blue-600 ml-1 hover:underline cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
