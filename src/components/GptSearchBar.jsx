import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { addGptMovieResult } from "../utils/GptSlice";
import { TMDB_TOKEN } from "../utils/constants";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const searchMovieTmdb = async (movie) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    };

    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      options
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie recommendation system and suggest some movies for the query" +
      searchText.current.value +
      "only give me names of 5 movies,comma separated like the example ahead ecample result:gadar,sholay,golmaal,hera pheri,don";
    console.log(searchText.current.value);
    const gptResults = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: gptQuery }],
    });

    const gptMovies = gptResults.choices[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));
    const tmDbResults = await Promise.all(promiseArray);
    console.log(tmDbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmDbResults })
    );
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className=" w-full md:w-1/2 bg-black grid grid-cols-12 gap-4 p-4 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 col-span-8 rounded"
          placeholder={lang[language].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 bg-red-700 text-white rounded-lg col-span-4"
          onClick={handleGptSearchClick}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
