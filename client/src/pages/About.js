import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">About FilmFlare</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Welcome to FilmFlare, your ultimate destination for movie reviews, news, and entertainment!
          </p>

          <p>
            At FilmFlare, we are passionate about cinema and dedicated to bringing you the latest
            updates, in-depth reviews, and exclusive insights into the world of movies. Whether you're
            a casual moviegoer or a hardcore film enthusiast, we've got something for everyone.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Mission</h2>
          <p>
            Our mission is to create a comprehensive platform where movie lovers can discover new films,
            read thoughtful reviews, stay updated with industry news, and connect with a community of
            like-minded cinephiles. We believe that every movie has a story worth telling, and we're
            here to help you find your next favorite film.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Comprehensive movie database with detailed information and trailers</li>
            <li>Honest and insightful movie reviews</li>
            <li>Latest news and updates from the film industry</li>
            <li>Curated lists and recommendations</li>
            <li>User ratings and community engagement</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Our Team</h2>
          <p>
            FilmFlare is run by a team of movie enthusiasts who are dedicated to providing you with
            quality content and an exceptional user experience. We watch, review, and curate content
            with care, ensuring that every piece of information we share is accurate and valuable.
          </p>

          <p className="mt-8">
            Thank you for being part of the FilmFlare community. We're excited to share our passion
            for movies with you!
          </p>

          <div className="mt-12 p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="mb-4">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

