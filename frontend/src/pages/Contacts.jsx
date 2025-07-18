import React from "react";
import Title from "../componenets/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../componenets/NewsLetterBox";

const Contacts = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="flex flex-col my-10 justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Office</p>
          <p className="text-gray-500">
            VIIT College Kondhwa
            <br />
            Pune, Maharashtra
          </p>
          <p className="text-gray-500">
            Tel: 9322803356 / 8626069514
            <br />
            Email: sahil.22311046@viit.ac.in / mangesh.22311296@viit.ac.in
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contacts;
