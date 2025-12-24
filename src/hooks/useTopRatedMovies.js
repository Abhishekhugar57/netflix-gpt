import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/MoviesSlice";
import { TMDB_KEY } from "../utils/constants";

const useTopRatedMovies = () => {
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);
  const dispatch = useDispatch(); // fixed typo

  const getTopRatedMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=1`
    );
    const json = await data.json();

    dispatch(addTopRatedMovies(json.results)); // fixed typo
  };

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
