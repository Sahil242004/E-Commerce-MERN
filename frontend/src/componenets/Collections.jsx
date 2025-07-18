import React from "react";
// import { assets } from "../assets/assets";

const Collections = () => {
  return (
    <div className="mt-20 text-center">
      <div>
        <h1>
          <span className="text-gray-500 text-3xl">Latest</span>&nbsp;&nbsp;
          <span className="text-3xl">Collections &mdash;</span>
        </h1>
        <p className="my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate,
          doloremque vel, esse nobis odit temporibus labore eos possimus qui rem
        </p>
      </div>
      {/* cards below */}
      <div className="cards grid grid-cols-5 gap-1 mt-8 ">
        <div>{/* <img src={} /> */}</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
        <div>hello</div>
      </div>
    </div>
  );
};

export default Collections;
