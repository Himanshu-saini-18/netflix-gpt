import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {  USER_AVATAR } from "../utils/constants";
const Login = () => {

  const dispatch = useDispatch();

  const [isSignInFrom, setIsSignInFrom] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidData(
      email.current.value,
      password.current.value,
      !isSignInFrom ? name.current.value : undefined
    );
    setErrorMessage(message);

    if (message) return; //if there any message

    //SignUp SignIn logic
    if (!isSignInFrom) {
      //SignUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // SignIn up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser; //this come from the updated value of user
              dispatch(
                //update store again
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
          console.log(user);
     
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
          {isSignInFrom ? "SignIn" : "SignUp"}
        </h1>
        {!isSignInFrom && (
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
          {isSignInFrom ? "SignIn" : "SignUp"}
        </button>
        <p className="py-4 hover:cursor-pointer " onClick={toggleSignInForm}>
          {isSignInFrom
            ? "New to Netflix? SignUp Now"
            : "Already Registered? SignIn Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
