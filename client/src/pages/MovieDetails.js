import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { movieAPI } from "../utils/api";
import { getImageUrl, getTrailerId } from "../utils/helpers";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await movieAPI.getById(id);
        setMovie(response.data);
        setRating(response.data.rating || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };

    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);

    fetchMovie();
  }, [id]);

  const handleRate = async (value) => {
    if (userRating > 0) {
      alert("You have already rated this movie!");
      return;
    }
    try {
      const response = await movieAPI.rate(id, value);
      setRating(response.data.rating);
      setUserRating(value);
      alert("Thank you for your rating!");
    } catch (error) {
      console.error("Error rating movie:", error);
      alert("Failed to submit rating");
    }
  };

  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (savedFavorites.includes(id)) {
      const updated = savedFavorites.filter((favId) => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(updated);
    } else {
      const updated = [...savedFavorites, id];
      localStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(updated);
    }
  };

  const isFavorite = favorites.includes(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-4xl text-primary-400">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Movie not found</h2>
          <Link to="/movies" className="text-primary-400 hover:text-primary-300">
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  const trailerId = getTrailerId(movie.trailerLink);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/movies"
          className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-6"
        >
          ← Back to Movies
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <img
              src={getImageUrl(movie.posterImage)}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-primary-600 px-4 py-2 rounded font-semibold">
                {rating > 0 ? `${rating.toFixed(1)} ⭐` : "Not Rated"}
              </span>
              <span className="text-gray-300">
                {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-gray-300">{movie.duration}</span>
              <button
                onClick={toggleFavorite}
                className={`px-4 py-2 rounded transition ${
                  isFavorite
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((g, idx) => (
                <span
                  key={idx}
                  className="bg-primary-600 text-white px-3 py-1 rounded text-sm"
                >
                  {g}
                </span>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Description</h2>
              <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </div>

            {/* Rating Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Rate this Movie</h3>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleRate(value)}
                    disabled={userRating > 0}
                    className={`px-3 py-1 rounded transition ${
                      userRating >= value
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-700 hover:bg-gray-600"
                    } ${
                      userRating > 0
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <p className="text-sm text-gray-400 mt-2">
                  You rated this {userRating}/10
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Trailer Section */}
        {trailerId && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Trailer</h2>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${trailerId}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
