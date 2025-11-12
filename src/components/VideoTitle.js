import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-36 w-screen aspect-video px-12 pt-[20%] px-16 absolute text-white bg-gradient-to-r from-black ">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/3">{overview}</p>

      <div className="">
        <button className="bg-white hover:bg-opacity-80  text-black py-2 px-10  text-xl rounded mr-6">
          ▶Play
        </button>
        <button className="bg-gray-500 bg-opacity-50 text-white py-2 px-10  text-xl rounded ">
           More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
