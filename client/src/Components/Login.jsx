import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../store/userContext";
import { toast } from "react-toastify";

const Login = () => {
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        navigate("/");
        toast.success("Logged in successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-[100vh] flex justify-center items-center rounded-xl fixed w-full shadow-xl">
      <div className="h-auto w-3/5 bg-slate-100 rounded-lg md:flex items-center md:flex-row ">
        <img
          src="https://raw.githubusercontent.com/0xabdulkhalid/basket-sign-up/7e4082c97a55ad7c786a61b77656ce21d55533d5/assets/images/signedUp.svg"
          alt="Login Illustration"
          className="w-1/2 rounded-l-xl"
        />
        <form
          className="bg-green text-black p-4 flex flex-col gap-2 w-1/2"
          onSubmit={handleLogin}
        >
          <div className="font-bold text-4xl text-start">Sign In</div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="border-2 w-full gap-2 p-2 my-3 rounded-md"
            value={user.username}
            onChange={handleChange}
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border-2 w-full gap-2 p-2 my-3 rounded-md"
            value={user.password}
            onChange={handleChange}
            disabled={loading}
          />
          <button
            type="submit"
            className="font-bold text-xl bg-red-500 w-full p-2 my-4 text-white rounded-md hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="my-2">
            Not registered yet?{" "}
            <Link
              to="/register"
              className="cursor-pointer font-bold text-md text-slate-500 hover:text-slate-700"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
