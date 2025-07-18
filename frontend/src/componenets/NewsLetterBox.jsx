import React from "react";

const NewsLetterBox = () => {
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now and get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eaque
      </p>
      <form className="w-full sm:w-1/2 md:flex-row flex items-center gap-2 mx-auto my-6 border pl-3">
        <input
          className="w-full sm:flex-1 outline-none"
          type="text"
          placeholder="Enter youe email"
          required
        />
        <button className="bg-black text-white h-10 px-2 text-xs">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
