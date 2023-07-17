import React, { useState } from "react";
function Main() {
  const [show, setshow] = useState(false);
  return (
    <div className=" flex justify-center items-center flex-1 ">
      {/* <h1 className="font-[700] text-7xl">Main</h1> */}
      {show ? (
        <img
          className="h-[300px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCsi6F0Dn2hoQtNK94yrlwyHtcKRGemfC0aFYmeedI-A&s"
        />
      ) : (
        <button
          onClick={() => {
            setshow(true);
          }}
          className="bg-[#30CB53] text-2xl text-white font-[700] py-6 px-12 rounded-[20px] cursor-pointer"
        >
          Get Early Access
        </button>
      )}
    </div>
  );
}

export default Main;
