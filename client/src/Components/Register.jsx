import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });

  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        navigate("/login");
        toast.success("Registered Successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Error occured while registering the user");
    }
  };

  return (
    <div className="bg-slate-300 h-[100vh] flex justify-center items-center rounded-xl fixed w-full shadow-inner">
      <div className="h-auto w-3/5 bg-slate-100 rounded-lg md:flex items-center md:flex-row ">
        <img
          src="https://raw.githubusercontent.com/0xabdulkhalid/basket-sign-up/7e4082c97a55ad7c786a61b77656ce21d55533d5/assets/images/signedUp.svg"
          alt=""
          className="w-1/2 rounded-l-xl"
        />
        <form
          className="bg-green text-black p-4 flex flex-col gap-1 w-1/2"
          onSubmit={handleRegister}
        >
          <div className="font-bold text-4xl text-start">Sign Up</div>
          <input
            type="text"
            name="username"
            id="username"
            value={user.username}
            placeholder="username"
            className="border-2 w-full gap-2 p-2 my-3 rounded-md "
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            className="border-2 w-full gap-2  p-2 my-3 rounded-md "
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="border-2 w-full gap-2 p-2 my-3 rounded-md "
            value={user.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="font-bold text-xl bg-red-500 w-full p-2 my-4 text-white rounded-md hover:bg-red-600"
          >
            Register
          </button>
          <p className="my-2">
            Already registered?{" "}
            <Link
              to="/login"
              className="cursor-pointer font-bold text-md text-slate-500 hover:text-slate-700"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
