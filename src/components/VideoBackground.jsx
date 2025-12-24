import { useEffect, useState } from "react";
import { TMDB_TOKEN } from "../utils/constants";

const VideoBackground = ({ movieId }) => {
  const [trailerId, setTrailerId] = useState(null);

  const getMovieVideos = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
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
  }, []);

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
