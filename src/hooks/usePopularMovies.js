import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/MoviesSlice";
import { TMDB_KEY } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  // fixed typo
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
    );
    const json = await data.json();

    dispatch(addPopularMovies(json.results)); // fixed typo
  };

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};

export default usePopularMovies;
