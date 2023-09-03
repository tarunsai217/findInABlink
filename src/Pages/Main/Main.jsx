import React, { useState, useRef, Fragment } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import { useSelector } from "react-redux";
import axios from "axios";
function Main() {
  const user = useSelector((state) => state.user.googleResponse);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    if (isVideoFile(newFile)) {
      setSelectedFile(newFile);
    } else {
      toast.error("Please select a valid video file.");
    }
  };

  const handleFileInputChange = (event) => {
    const newFile = event.target.files[0];
    setSelectedFile(newFile);
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  async function uploadHandler() {
    setLoading(true);
    if (!selectedFile) {
      toast.error("Please select a video file.");
      return;
    }
    const formData = new FormData();
    formData.append("videoFile", selectedFile);
    formData.append("accessToken", user["access_token"]);

    try {
      let response = await axios.post(`${API_URL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsVideoUploaded(true);
      setUploadedVideo(response.data.data);
      setSelectedFile(null);
      console.log("response", response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Helper function to check if a file is a video
  function isVideoFile(file) {
    const videoTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
      "video/x-matroska",
    ];
    return videoTypes.includes(file.type);
  }

  function viewClickHandler() {
    let urlToOpen = `https://www.youtube.com/watch?v=${uploadedVideo.id}`;
    window.open(urlToOpen, "_blank");
  }

  function shareClickHandler() {
    let urlToOpen = `https://www.youtube.com/watch?v=${uploadedVideo.id}`;
    navigator.clipboard.writeText(urlToOpen);
  }

  return (
    <div className=" flex flex-col justify-center items-center flex-1 ">
      <div
        className="file-drop-area cursor-pointer h-[200px] w-[50%] rounded-[8px] mb-10 border-[1px] border-white flex items-center justify-center"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        onClick={handleDivClick}
      >
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
        <p>Drag and drop video files here or click to select</p>
      </div>
      {selectedFile && (
        <Fragment>
          <div className="flex flex-col items-center mt-10 mb-10">
            <h3 className="mb-4">Uploaded Video Preview:</h3>
            <video
              ref={videoRef}
              controls
              width="400"
              src={selectedFile && URL.createObjectURL(selectedFile)}
            >
              Your browser does not support the video tag.
            </video>

            {!loading ? (
              <button
                onClick={uploadHandler}
                className="bg-[#30CB53] text-2xl text-white font-[700] py-6 px-12 rounded-[20px] cursor-pointer mt-5"
              >
                Upload
              </button>
            ) : (
              <button className="bg-[#30CB53] text-2xl text-white font-[700] py-6 px-12 rounded-[20px] cursor-pointer">
                Loading....
              </button>
            )}
          </div>
        </Fragment>
      )}
      {isVideoUploaded ? (
        <Fragment>
          <h1>Your video has been uploaded successfully...</h1>
          <div className="flex mt-2">
            <button
              onClick={viewClickHandler}
              className="mr-8 bg-white text-xl text-[#30CB53] font-[700] py-4 px-12 rounded-[20px] cursor-pointer"
            >
              View
            </button>
            <button
              onClick={shareClickHandler}
              className="bg-[#30CB53] text-xl text-white font-[700] py-4 px-12 rounded-[20px] cursor-pointer"
            >
              Share
            </button>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}

export default Main;
