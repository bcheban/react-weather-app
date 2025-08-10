import React, { useState, useEffect } from 'react';
import { fetchLatestNews } from '../../services/newsApi';

const NEWS_PER_PAGE = 4;

const NewsArticleCard = ({ imageUrl, description, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="group block cursor-pointer">
    <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={description}
        className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
    </div>
    <p className="mt-4 text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">{description}</p>
  </a>
);

const NewsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
    {Array.from({ length: NEWS_PER_PAGE }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="bg-gray-300 rounded-lg h-48 w-full"></div>
        <div className="h-4 bg-gray-300 rounded mt-4 w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded mt-2 w-4/6"></div>
      </div>
    ))}
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center py-10 px-4 bg-red-50 rounded-lg">
    <p className="text-red-600 font-semibold">Oops! Something went wrong.</p>
    <p className="text-gray-600 mt-2">{message}</p>
  </div>
);

const NewsSection = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingMore, setIsAddingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { articles: fetched, totalResults } = await fetchLatestNews({ page: 1, pageSize: NEWS_PER_PAGE });
        setArticles(fetched);
        setTotalResults(totalResults);
      } catch (err) {
        setError(err.message || 'Failed to load news.');
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialNews();
  }, []);

  const handleSeeMore = async () => {
    setIsAddingMore(true);
    setError(null);
    const nextPage = currentPage + 1;
    try {
      const { articles: newArticles } = await fetchLatestNews({ page: nextPage, pageSize: NEWS_PER_PAGE });
      setArticles((prev) => [...prev, ...newArticles]);
      setCurrentPage(nextPage);
    } catch (err) {
      setError(err.message || 'Failed to load more news.');
    } finally {
      setIsAddingMore(false);
    }
  };

  const hasMoreArticles = articles.length < totalResults;

  if (isLoading) {
    return (
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl mb-8 font-bold text-black">News</h2>
          <NewsSkeleton />
        </div>
      </section>
    );
  }

  if (error && articles.length === 0) {
    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-xl sm:text-2xl mb-8 font-bold text-black">News</h2>
                <ErrorMessage message={error} />
            </div>
        </section>
    );
  }
  
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl mb-8 font-bold text-black">News</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {articles.map(({ id, imageUrl, description, url }) => (
            <NewsArticleCard key={id} imageUrl={imageUrl} description={description} url={url} />
          ))}
        </div>

        {error && articles.length > 0 && (
          <p className="text-center text-red-500 mt-8">{error}</p>
        )}

        {hasMoreArticles && !error && (
          <div className="mt-12 flex justify-center sm:justify-start">
            <button
              onClick={handleSeeMore}
              disabled={isAddingMore}
              className="bg-[#FFB36C] text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-orange-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isAddingMore ? 'Loading...' : 'See more'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;