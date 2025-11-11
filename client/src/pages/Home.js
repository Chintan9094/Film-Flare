import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { movieAPI } from '../utils/api';
import { getImageUrl } from '../utils/helpers';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await movieAPI.getAll({ sort: 'createdAt' });
        const movies = response.data;
        
        if (movies.length > 0) {
          setFeaturedMovie(movies[0]);
          setTrendingMovies(movies.slice(0, 8));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl text-primary-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      {featuredMovie && (
        <div className="relative h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getImageUrl(featuredMovie.posterImage)})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
                  {featuredMovie.title}
                </h1>
                <p className="text-xl mb-6 text-gray-200 line-clamp-3">
                  {featuredMovie.description}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="bg-primary-600 px-4 py-2 rounded font-semibold">
                    {featuredMovie.rating > 0 ? `${featuredMovie.rating.toFixed(1)} ⭐` : 'New Release'}
                  </span>
                  <span className="text-gray-300">{new Date(featuredMovie.releaseDate).getFullYear()}</span>
                  <span className="text-gray-300">{featuredMovie.duration}</span>
                </div>
                <Link
                  to={`/movie/${featuredMovie._id}`}
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition"
                >
                  Watch Trailer
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending Movies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Trending Movies</h2>
          <Link
            to="/movies"
            className="text-primary-400 hover:text-primary-300 font-semibold"
          >
            View All →
          </Link>
        </div>

        {trendingMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No movies available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

