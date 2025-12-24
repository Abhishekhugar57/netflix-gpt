const VideoTitle = ({ title, overview, onPlay }) => {
  return (
    <div className="absolute top-[25%] left-4 md:left-12 text-white z-20">
      <h1 className="text-4xl font-bold">{title}</h1>

      <p className="hidden md:block py-6 w-1/3">{overview}</p>

      <div className="flex gap-8 md:gap-3">
        <button
          onClick={onPlay}
          className="bg-white text-black px-2 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-xl"
        >
          ▶ Play
        </button>

        <button className="bg-gray-400 bg-opacity-60 px-6 py-3 rounded-lg text-xl">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
