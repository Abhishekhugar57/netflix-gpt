import { useEffect, useState } from "react";

const VideoPlayerModal = ({ movieId, onClose }) => {
  const [trailerId, setTrailerId] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: "Bearer YOUR_TMDB_TOKEN",
            accept: "application/json",
          },
        }
      );
      const json = await res.json();

      const trailer = json.results.find((video) => video.type === "Trailer");

      setTrailerId(trailer?.key);
    };

    fetchTrailer();
  }, [movieId]);

  if (!trailerId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl"
      >
        ✕
      </button>
      <iframe
        className="w-[90%] h-[90%]"
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&controls=1&mute=0&rel=0`}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayerModal;
