import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="bg-slate-300 h-[100vh] flex justify-center items-center rounded-xl fixed w-full shadow-xl">
      <div className="h-2/3 w-3/5 bg-white rounded-lg flex items-center justify-center">
        <img
          src="https://raw.githubusercontent.com/0xabdulkhalid/basket-sign-up/7e4082c97a55ad7c786a61b77656ce21d55533d5/assets/images/signedUp.svg"
          alt=""
          className="w-1/2 rounded-l-xl"
        />
        <form className="bg-green text-black p-4 flex flex-col gap-1 w-full">
          <div className="font-semibold text-3xl text-start">Sign Up</div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            className="border-2 w-full gap-2 p-2 my-3 rounded-md "
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            className="border-2 w-full gap-2  p-2 my-3 rounded-md "
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="border-2 w-full gap-2 p-2 my-3 rounded-md "
          />
          <button
            type="submit"
            className="font-bold text-xl bg-red-500 w-full p-2 my-4 text-white rounded-md"
          >
            Register
          </button>
          <p className="my-2">
            Already registered?{" "}
            <Link
              to="/login"
              className="cursor-pointer font-bold text-md text-slate-600"
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
