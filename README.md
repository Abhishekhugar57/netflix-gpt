# React + Vite

create react app
configured tailwindcss
header
routing
login
singn up
form validation
useRef Hook
sign up auth
tmdb registed with api key

  <div
      className="
  absolute top-0 left-0 w-full p-0 m-0 z-10
  flex flex-col md:flex-row justify-between
  bg-gradient-to-b from-black
  bg-black
  sm:bg-blue-500
  md:bg-green-900
"
    >
    const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-[25%] left-12 text-white z-20">
      {" "}
      {/*className="pt-[14%] px-24 w-screen aspect-video absolute text-white bg-gradient-to-r from black"*/}
      <h1 className=" text-x1 md:text-4xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-md w-1/3"> {overview}</p>
      <div>
        <button className="text-black p-4 px-12 text-xl bg-white bg-opacity-80 rounded-lg hover:bg-opacity-80">
          Play
        </button>
        <button className=" mx-2  text-black p-4 px-12   text-xl bg-white bg-opacity-80 rounded-lg hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;

import { useEffect, useState } from "react";

const VideoBackground = ({ movieId }) => {
const [trailerId, setTrailerId] = useState(null);

const getMovieVideos = async () => {
const options = {
method: "GET",
headers: {
accept: "application/json",
Authorization:
"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTk4NWMxNmQwODM0Y2I3NGM4MTVkYWNhMmNiODliZCIsIm5iZiI6MTc2NTE5MDkwOC4zMTgsInN1YiI6IjY5MzZhY2ZjYzEwMGFjMmY2NjA1ZGI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BdUjRu05ncDgN7ehHkerMrMxwxaxHBy1nHyKcpb68cc",
},
};

    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    );

    const json = await data.json();

    // 1. Find trailer
    const trailer = json.results.find((video) => video.type === "Trailer");

    // 2. If no trailer → pick first available video
    const video = trailer || json.results[0];

    setTrailerId(video?.key);

};

useEffect(() => {
getMovieVideos();
}, [movieId]);

return (

<div className="relative w-full h-screen overflow-hidden z-0">
{trailerId && (
<iframe
className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2"
src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${trailerId}`}
allowFullScreen
/>
)}
</div>
);
};
export default VideoBackground;

const VideoTitle = ({ title, overview }) => {
return (

<div className="absolute top-[25%] left-4 md:left-12 text-white z-20 w-[90%] md:w-auto">
<h1 className="text-2xl md:text-4xl font-bold">{title}</h1>

      <p className="hidden md:inline-block py-6 text-md w-1/3">{overview}</p>

      <div className="mt-4 flex gap-3">
        <button className="text-black px-6 py-2 md:p-4 md:px-12 text-sm md:text-xl bg-white bg-opacity-80 rounded-lg hover:bg-opacity-80">
          ▶ Play
        </button>

        <button className="text-black px-6 py-2 md:p-4 md:px-12 text-sm md:text-xl bg-white bg-opacity-80 rounded-lg hover:bg-opacity-80">
          ℹ More Info
        </button>
      </div>
    </div>

);
};

export default VideoTitle;
maincont- <VideoBackground movieId={id} />
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import Hero from "./Hero";

const MainContainer = () => {
const movies = useSelector((store) => store.movies?.nowPlayingMovies);

// Fix: Check both null and empty array
if (!movies || movies.length === 0) return null;

const mainMovie = movies[0];

if (!mainMovie) return null; // extra protection

const { original_title, overview, id } = mainMovie;

return (
<div className="pt-30% bg-black md:pt-0">
<VideoTitle title={original_title} overview={overview} />
<Hero movie={movie} />
</div>
);
};

export default MainContainer;

1)moviecard.jsx
const MovieCard = ({ posterPath }) => {
if (!posterPath) return null;

return (
<div className="w-[140px] md:w-[160px] h-[210px] md:h-[240px] flex-shrink-0 overflow-hidden rounded-md">
<img
className="w-full h-full object-cover"
src={"https://image.tmdb.org/t/p/w500" + posterPath}
alt="movie"
/>
</div>
);
};

export default MovieCard;
2)movies.slice
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
name: "movies",
initialState: {
nowPlayingMovies: null,
popularMovies: null,
topRatedMovies: null,
upcomingMoviesMovies: null,
},
reducers: {
addNowPlayingMovies: (state, action) => {
state.nowPlayingMovies = action.payload;
},
addPopularMovies: (state, action) => {
state.popularMovies = action.payload;
},
addTopRatedMovies: (state, action) => {
state.topRatedMovies = action.payload;
},
addUpcomingMovies: (state, action) => {
state.upcomingMovies = action.payload;
},
},
});
export const {
addNowPlayingMovies,
addPopularMovies,
addTopRatedMovies,
addUpcomingMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;

import { useDispatch, useSelector } from "react-redux";
import Header from "./header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
const Browse = () => {
const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
useNowPlayingMovies();
usePopularMovies();
useTopRatedMovies();
useUpcomingMovies();

return (
<div>
<Header />
{showGptSearch ? (
<GptSearch />
) : (
<>
<MainContainer />
<SecondaryContainer />
</>
)}
</div>
);
};

export default Browse;

<iframe
        className="w-[90%] h-[90%]"
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&controls=1&mute=0&rel=0`}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
