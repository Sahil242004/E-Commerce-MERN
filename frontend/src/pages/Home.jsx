import React from "react";
import Hero from "../componenets/Hero";
import Collections from "../componenets/Collections";
import LatestCollections from "../componenets/LatestCollections";
import BestSeller from "../componenets/BestSeller";
import OurPolicy from "../componenets/OurPolicy";
import NewsLetterBox from "../componenets/NewsLetterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
