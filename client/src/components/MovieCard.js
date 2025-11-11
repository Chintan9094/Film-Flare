import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/helpers';

const MovieCard = ({ movie }) => {

  return (
    <Link to={`/movie/${movie._id}`} className="group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <div className="relative overflow-hidden">
          <img
            src={getImageUrl(movie.posterImage)}
            alt={movie.title}
            className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
            }}
          />
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded text-sm font-semibold">
            {movie.rating > 0 ? movie.rating.toFixed(1) : 'N/A'}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{movie.title}</h3>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>{new Date(movie.releaseDate).getFullYear()}</span>
            <span>{movie.duration}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {movie.genre.slice(0, 2).map((g, idx) => (
              <span key={idx} className="bg-primary-600 text-white text-xs px-2 py-1 rounded">
                {g}
              </span>
            ))}
          </div>
          <p className="text-gray-300 text-sm line-clamp-2">{movie.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

