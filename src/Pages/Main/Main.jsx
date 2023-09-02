import React, { useState } from "react";
import { google } from "googleapis";
import { useSelector } from "react-redux";
function Main() {
  const user = useSelector((state) => state.user.googleResponse);
  const [loading, setLoading] = useState(false);

  async function uploadHandler() {
    setLoading(true);

    console.log("user", user);
    const youtube = google.youtube({
      version: "v3",
      auth: "AIzaSyAkL3mKIvuetfhs2s7CLrKjUGXJBW7wvEw",
    });

    // Prepare the video resource
    const videoResource = {
      snippet: {
        title: "Uploaded Video Title",
        description: "Uploaded Video Description",
      },
      status: {
        privacyStatus: "private",
      },
    };

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
