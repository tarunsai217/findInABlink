import React from "react";
import "./Header.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setGoogleResponse,
  setProfileData,
} from "../../Redux/Features/userSlice";

function Header() {
  const user = useSelector((state) => state.user.googleResponse);
  const profile = useSelector((state) => state.user.profileData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          dispatch(setProfileData(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("codeResponse", codeResponse);
      dispatch(setGoogleResponse(codeResponse));
      navigate("/main");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    dispatch(setGoogleResponse(null));
    dispatch(setProfileData(null));
    navigate("/");
  };

  const handleOnClickHandler = () => {
    if (user) {
      logOut();
    } else {
      login();
    }
  };

  return (
    <header className="bg-[#1E1E1E] flex justify-between ml-24 mr-24 py-4">
      <ul className="ml-0 flex items-center">
        <li className="font-[700] text-2xl cursor-pointer">𝕗𝕚𝕟𝕕𝕀𝕟𝔸𝔹𝕝𝕚𝕟𝕜</li>
      </ul>
      <ul className="ml-0 flex ">
        <li className="flex items-center hidden">
          <button className="text-[#A8A196] hover:text-white hover:text-xl font-[700] text-lg  mr-6 cursor-pointer">
            Sign up
          </button>
        </li>
        <li>
          <button
            onClick={handleOnClickHandler}
            className="bg-white text-black hover:bg-[#EEEEEE] font-[700] transform hover:scale-110 rounded-2xl px-8 py-2 cursor-pointer"
          >
            {user ? "Logout" : "Login"}
          </button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
