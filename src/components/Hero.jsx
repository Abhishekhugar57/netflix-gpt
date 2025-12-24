import { useState } from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import VideoPlayerModal from "./VideoPlayerModal";

const Hero = ({ movie }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="relative">
      <VideoBackground movieId={movie.id} />

      <VideoTitle
        title={movie.title}
        overview={movie.overview}
        onPlay={() => setShowPlayer(true)}
      />

      {showPlayer && (
        <VideoPlayerModal
          movieId={movie.id}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </div>
  );
};

export default Hero;
