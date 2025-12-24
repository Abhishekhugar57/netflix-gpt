import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          className="h-screen object-cover w-screen"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/d615dd28-a1ac-4a03-995a-022d24e7b367/web/IN-en-20251124-TRIFECTA-perspective_263f0625-557f-436a-9d4f-b93224d2d6d2_medium.jpg"
          alt="bgd"
        />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </>
  );
};

export default GptSearch;
