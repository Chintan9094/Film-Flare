import React, { useState, useEffect, useCallback } from 'react';
import { movieAPI, blogAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../utils/helpers';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('movies');
  const [movies, setMovies] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const navigate = useNavigate();

  const [movieForm, setMovieForm] = useState({
    title: '',
    releaseDate: '',
    duration: '',
    genre: '',
    description: '',
    posterImage: null,
    trailerLink: ''
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'FilmFlare Team',
    coverImage: null
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'movies') {
        const response = await movieAPI.getAll();
        setMovies(response.data);
      } else {
        const response = await blogAPI.getAll();
        setBlogs(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMovieChange = (e) => {
    if (e.target.name === 'posterImage') {
      setMovieForm({ ...movieForm, posterImage: e.target.files[0] });
    } else {
      setMovieForm({ ...movieForm, [e.target.name]: e.target.value });
    }
  };

  const handleBlogChange = (e) => {
    if (e.target.name === 'coverImage') {
      setBlogForm({ ...blogForm, coverImage: e.target.files[0] });
    } else {
      setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
    }
  };

  const resetMovieForm = () => {
    setMovieForm({
      title: '',
      releaseDate: '',
      duration: '',
      genre: '',
      description: '',
      posterImage: null,
      trailerLink: ''
    });
    setEditingMovie(null);
    setShowMovieForm(false);
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      content: '',
      excerpt: '',
      author: 'FilmFlare Team',
      coverImage: null
    });
    setEditingBlog(null);
    setShowBlogForm(false);
  };

  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(movieForm).forEach(key => {
        if (key === 'genre') {
          formData.append('genre', movieForm.genre.split(',').map(g => g.trim()));
        } else if (key !== 'posterImage' || movieForm.posterImage) {
          formData.append(key, movieForm[key]);
        }
      });

      if (editingMovie) {
        await movieAPI.update(editingMovie._id, formData);
      } else {
        await movieAPI.create(formData);
      }

      resetMovieForm();
      fetchData();
    } catch (error) {
      console.error('Error saving movie:', error);
      alert('Failed to save movie');
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(blogForm).forEach(key => {
        if (key !== 'coverImage' || blogForm.coverImage) {
          formData.append(key, blogForm[key]);
        }
      });

      if (editingBlog) {
        await blogAPI.update(editingBlog._id, formData);
      } else {
        await blogAPI.create(formData);
      }

      resetBlogForm();
      fetchData();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog post');
    }
  };

  const handleEditMovie = (movie) => {
    setMovieForm({
      title: movie.title,
      releaseDate: movie.releaseDate.split('T')[0],
      duration: movie.duration,
      genre: movie.genre.join(', '),
      description: movie.description,
      posterImage: null,
      trailerLink: movie.trailerLink
    });
    setEditingMovie(movie);
    setShowMovieForm(true);
  };

  const handleEditBlog = (blog) => {
    setBlogForm({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      coverImage: null
    });
    setEditingBlog(blog);
    setShowBlogForm(true);
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await movieAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete movie');
      }
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog post');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
              window.location.reload();
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('movies')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'movies'
                ? 'border-b-2 border-primary-500 text-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'blogs'
                ? 'border-b-2 border-primary-500 text-primary-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Blog Posts
          </button>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          {activeTab === 'movies' ? (
            <button
              onClick={() => {
                resetMovieForm();
                setShowMovieForm(true);
              }}
              className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded font-semibold"
            >
              Add New Movie
            </button>
          ) : (
            <button
              onClick={() => {
                resetBlogForm();
                setShowBlogForm(true);
              }}
              className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded font-semibold"
            >
              Add New Blog Post
            </button>
          )}
        </div>

        {/* Movie Form */}
        {showMovieForm && activeTab === 'movies' && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {editingMovie ? 'Edit Movie' : 'Add New Movie'}
            </h2>
            <form onSubmit={handleMovieSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={movieForm.title}
                    onChange={handleMovieChange}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Release Date *</label>
                  <input
                    type="date"
                    name="releaseDate"
                    required
                    value={movieForm.releaseDate}
                    onChange={handleMovieChange}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g., 2h 30m"
                    required
                    value={movieForm.duration}
                    onChange={handleMovieChange}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Genre (comma-separated) *</label>
                  <input
                    type="text"
                    name="genre"
                    placeholder="e.g., Action, Drama, Thriller"
                    required
                    value={movieForm.genre}
                    onChange={handleMovieChange}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Poster Image *</label>
                  <input
                    type="file"
                    name="posterImage"
                    accept="image/*"
                    onChange={handleMovieChange}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                    required={!editingMovie}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Trailer Link (YouTube) *</label>
                  <input
                    type="url"
                    name="trailerLink"
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                    value={movieForm.trailerLink}
                    onChange={handleMovieChange}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description (min 200 chars) *</label>
                <textarea
                  name="description"
                  rows="6"
                  required
                  minLength="200"
                  value={movieForm.description}
                  onChange={handleMovieChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold"
                >
                  {editingMovie ? 'Update Movie' : 'Add Movie'}
                </button>
                <button
                  type="button"
                  onClick={resetMovieForm}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blog Form */}
        {showBlogForm && activeTab === 'blogs' && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h2>
            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={blogForm.title}
                  onChange={handleBlogChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <input
                  type="text"
                  name="excerpt"
                  required
                  value={blogForm.excerpt}
                  onChange={handleBlogChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  value={blogForm.author}
                  onChange={handleBlogChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cover Image *</label>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleBlogChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                  required={!editingBlog}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content (min 200 chars) *</label>
                <textarea
                  name="content"
                  rows="10"
                  required
                  minLength="200"
                  value={blogForm.content}
                  onChange={handleBlogChange}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold"
                >
                  {editingBlog ? 'Update Post' : 'Add Post'}
                </button>
                <button
                  type="button"
                  onClick={resetBlogForm}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Movies List */}
        {activeTab === 'movies' && (
          <div>
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : movies.length === 0 ? (
              <div className="text-center py-12 text-gray-400">No movies yet. Add your first movie!</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.map((movie) => (
                  <div key={movie._id} className="bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={getImageUrl(movie.posterImage)}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{movie.description}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditMovie(movie)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMovie(movie._id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Blogs List */}
        {activeTab === 'blogs' && (
          <div>
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12 text-gray-400">No blog posts yet. Add your first post!</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div key={blog._id} className="bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={getImageUrl(blog.coverImage)}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

