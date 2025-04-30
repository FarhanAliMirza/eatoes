import Button from "../components/Button";
import ReviewCard from "../components/ReviewCard";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const loggedIn = localStorage.getItem("token") === null;
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col min-h-screen ">
      <section
        className="relative h-[80vh] bg-center bg-cover flex items-center justify-center text-white m-4 rounded-4xl"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')", // Replace with your own hero image if you want
        }}
      >
        <div className="bg-black opacity-40 w-full h-full absolute inset-0 rounded-4xl" />

        <div className="relative z-10 text-center px-4">
          <h1 className="text-[#FF7F11] text-4xl md:text-5xl font-bold mb-4">
            Welcome to Eatoes
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto">
            Fresh flavors. Fast pickup. Experience dining reimagined!
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            {loggedIn && <AuthModal
              bgColor="#FF7F11"
              hoverColor="#FFB347"
              textColor="#FFFFFF"
            />}
            <Button bgColor="#f7d7b7" hoverColor="#FFB347" textColor="#333333" onClick={()=> navigate("/menu")}>
              View Menu
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 flex-1">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          What Our Customers Say
        </h2>

        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          <ReviewCard
            review={"Great food and serviceas awesome! Highly recommend!"}
            name={"Priya S"}
          />
          <ReviewCard
            review={"Fast service and super friendly staff. Highly recommend!"}
            name={"Rahul D"}
          />
          <ReviewCard
            review={
              "Tried their desserts and drinks — 10/10. Will order again!"
            }
            name={"Anjali M"}
          />
        </div>
      </section>

      <footer className="bg-orange-500 text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-center md:text-left text-sm">
            &copy; {new Date().getFullYear()} eatoes. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
