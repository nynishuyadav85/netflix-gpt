import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR } from "./constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleCLick = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2">
          <img className="w-8 h-8" src={USER_AVATAR} alt="usericon" />
          <button
            className="bg-red-700 p-4 m-4 rounded-sm size-15 text-white font-bold"
            onClick={handleCLick}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
