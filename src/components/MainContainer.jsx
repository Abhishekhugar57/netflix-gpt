import { useSelector } from "react-redux";
import Hero from "./Hero";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];

  return (
    <div className="bg-black">
      <Hero movie={mainMovie} />
    </div>
  );
};

export default MainContainer;
