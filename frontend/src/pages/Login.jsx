import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <div className="flex gap-1 items-center">
          <img src="public/logo1.png" alt="logo" className="h-14 w-14" />
          <h1 className="md:text-xl font-extrabold text-blue-900 font-serif text-2xl">
            <Link to="/">Fit Mind</Link>
          </h1>
        </div>
        <button className="px-10 py-2 bg-blue-800 rounded-lg text-white font-semibold hover:text-black">
          <Link to="/register">Register</Link>
        </button>
      </div>
      <div className="flex justify-center items-center h-[80vh] border-2 w-full">
        <div className="w-[850px] h-[400px] flex items-center justify-center shadow-2xl  shadow-blue-900">
          <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
            <h1 className="text-xl font-bold text-left text-blue-700">
              Log in to your account
            </h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-500 outline-0 rounded-3xl"
              type="text"
              placeholder="Enter your email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-500 outline-0 rounded-3xl"
              type="password"
              placeholder="Enter your password"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-4 text-lg font-bold text-white bg-blue-800 rounded-2xl hover:bg-gray-500 hover:text-black "
            >
              Log in
            </button>
            {error && (
              <h3 className="text-red-500 text-sm ">Something went wrong</h3>
            )}
            <div className="flex justify-center items-center space-x-3">
              <p>New here?</p>
              <p className="text-gray-500 hover:text-black font-semibold">
                <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
