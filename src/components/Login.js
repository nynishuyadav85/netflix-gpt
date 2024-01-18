import React, { useRef, useState } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "./constants";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSignIn, setIsSignIn] = useState(true);

  const onSignUpClicked = () => {
    setIsSignIn(!isSignIn);
  };
  const onButtonClick = () => {
    const message = validate(
      email.current.value,
      password.current.value
      //   name.current.value
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignIn) {
      //signup method
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
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      // signin method
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
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/df6621a3-890c-4ca0-b698-90bd5152f3d1/20a59be7-7062-4991-bca0-805e9a7f2716/IN-en-20240107-trifectadaily-perspective_alpha_website_small.jpg"
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="bg-black absolute p-12 my-36 mx-auto right-0 left-0 w-3/12 text-white rounded-lg bg-opacity-85"
      >
        <h2 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-gray-800"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address or phone number"
          className="p-2 my-4 w-full bg-gray-800"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-800"
        />
        <p className="text-red-600 font-bold text-lg">{errorMessage}</p>
        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg"
          onClick={onButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="font-bold cursor-pointer" onClick={onSignUpClicked}>
          {!isSignIn
            ? "Already have account! Sign In Now"
            : "New to Netflix? Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default Login;
