import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInFrom, setIsSignInFrom] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    //SignUp SignIn logic
    if (isSignInFrom) {
      //Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/142436125?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;  //this come from the updated value of user
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //SignIn Logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

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
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-4/12 rounded-lg absolute p-12 bg-black  my-36 mx-auto right-0 left-0 text-white bg-opacity-70"
      >
        <h1 className="font-bold text-3xl p-4">
          {isSignInFrom ? "SignUp" : "SignIn"}
        </h1>
        {isSignInFrom && (
          <input
            ref={name}
            placeholder="Full Name"
            type="text"
            className="p-2 my-2 w-full bg-gray-700 rounded"
          />
        )}
        <input
          ref={email}
          placeholder="Email Address"
          type="text"
          className="p-2 my-2 w-full bg-gray-700 rounded"
        />
        <input
          ref={password}
          placeholder="Password"
          type="password"
          className="p-2 my-2 w-full bg-gray-700 rounded"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className=" p-4 my-2 bg-red-700 rounded-lg w-full"
          onClick={handleButtonClick}
        >
          {isSignInFrom ? "Sign Up" : "Sign In"}
        </button>
        <p className="py-4 hover:cursor-pointer " onClick={toggleSignInForm}>
          {isSignInFrom ? "Already Registered?" : "New to Netflix?"}
          {isSignInFrom ? "SignIn Now" : "SignUp Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
