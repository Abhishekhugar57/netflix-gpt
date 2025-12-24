import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUpcomingMovies } from "../utils/MoviesSlice";
import { TMDB_KEY } from "../utils/constants";

const useUpcomingMovies = () => {
  const upcominMovies = useSelector((store) => store.movies.upcominMovies);
  const dispatch = useDispatch(); // fixed typo

  const getUpcomingMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_KEY}&language=en-US&page=1`
    );
    const json = await data.json();

    dispatch(addUpcomingMovies(json.results)); // fixed typo
  };

  useEffect(() => {
    !upcominMovies && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
