import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
function Main() {
  const user = useSelector((state) => state.user.googleResponse);
  const [loading, setLoading] = useState(false);

  async function uploadHandler() {
    setLoading(true);
    console.log("user", user);
    let data = {
      accessToken: user["access_token"],
    };
    let response = await axios.post("http://localhost:5000", data);
    console.log("response", response);
    setLoading(false);
  }
  return (
    <div className=" flex justify-center items-center flex-1 ">
      {!loading ? (
        <button
          onClick={uploadHandler}
          className="bg-[#30CB53] text-2xl text-white font-[700] py-6 px-12 rounded-[20px] cursor-pointer"
        >
          Upload
        </button>
      ) : (
        <button className="bg-[#30CB53] text-2xl text-white font-[700] py-6 px-12 rounded-[20px] cursor-pointer">
          Loading....
        </button>
      )}
    </div>
  );
}

export default Main;
