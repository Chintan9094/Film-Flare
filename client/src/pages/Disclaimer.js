import React from 'react';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Disclaimer</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">General Information</h2>
            <p>
              The information on this website is provided on an "as is" basis. FilmFlare makes no
              representations or warranties of any kind, express or implied, about the completeness,
              accuracy, reliability, suitability, or availability of the information, products,
              services, or related graphics contained on this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Movie Reviews and Ratings</h2>
            <p>
              All movie reviews, ratings, and opinions expressed on FilmFlare are subjective and
              represent the views of our editorial team or contributors. These reviews are for
              informational and entertainment purposes only and should not be considered as
              professional advice or definitive judgments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">External Links</h2>
            <p>
              Our website may contain links to external websites, including YouTube for trailers and
              other third-party services. We have no control over the nature, content, and availability
              of those sites. The inclusion of any links does not necessarily imply a recommendation
              or endorse the views expressed within them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Copyright and Fair Use</h2>
            <p>
              Movie posters, images, and trailers are used under fair use for the purpose of review,
              criticism, and news reporting. All trademarks, logos, and brand names are the property
              of their respective owners. FilmFlare does not claim ownership of any movie content,
              images, or trailers displayed on this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">User-Generated Content</h2>
            <p>
              Users may submit ratings and comments on our website. We are not responsible for the
              accuracy or content of user-generated submissions. We reserve the right to remove any
              content that violates our terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Limitation of Liability</h2>
            <p>
              In no event will FilmFlare be liable for any loss or damage, including without
              limitation, indirect or consequential loss or damage, or any loss or damage whatsoever
              arising from loss of data or profits arising out of, or in connection with, the use of
              this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Changes to Disclaimer</h2>
            <p>
              We reserve the right to update this disclaimer at any time. Changes will be posted on
              this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Contact</h2>
            <p>
              If you have any questions about this Disclaimer, please contact us at{' '}
              <a href="/contact" className="text-primary-400 hover:text-primary-300">
                our contact page
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;

