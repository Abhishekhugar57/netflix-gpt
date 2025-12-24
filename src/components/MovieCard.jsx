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
