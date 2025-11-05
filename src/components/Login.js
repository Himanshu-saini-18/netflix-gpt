import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInFrom, setIsSignInFrom] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInFrom(!isSignInFrom);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9c363af5-4750-4f14-87d1-8125f5276db0/web/IN-en-20251027-TRIFECTA-perspective_b68b1528-3a10-4997-9f99-48ccbdb86626_large.jpg"
          alt="logo"
        />
      </div>
      <form className="w-4/12 rounded-lg absolute p-12 bg-black  my-36 mx-auto right-0 left-0 text-white bg-opacity-70">
        <h1 className="font-bold text-3xl p-4">
          {isSignInFrom ? "SignIn" : "LogIn"}
        </h1>
        {isSignInFrom&&(
          <input
            placeholder="Full Name"
            type="text"
            className="p-2 my-2 w-full bg-gray-700 rounded"
          />
        )
          
        }
        <input
          placeholder="Email Address"
          type="text"
          className="p-2 my-2 w-full bg-gray-700 rounded"
        />
        <input
          placeholder="Password"
          type="password"
          className="p-2 my-2 w-full bg-gray-700 rounded"
        />
        <button className=" p-4 my-2 bg-red-700 rounded-lg w-full">
          {isSignInFrom ? "Sign In" : "Log In"}
        </button>
        <p className="py-4 hover:cursor-pointer " onClick={toggleSignInForm}>
          {isSignInFrom ? "Already Registered?" : "New to Netflix?"}{" "}
          {isSignInFrom ? <p>LogIn Now</p> : <p>SignIn Now</p>}
        </p>
      </form>
    </div>
  );
};

export default Login;
