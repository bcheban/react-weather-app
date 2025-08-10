const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';

const transformNewsData = articles =>
  articles
    .filter(article => article.urlToImage)
    .map(article => ({
      id: article.url,
      imageUrl: article.urlToImage,
      description: article.title,
      url: article.url,
    }));

export const fetchLatestNews = async ({ page = 1, pageSize = 4 } = {}) => {
  const query = 'weather OR nature';
  const apiUrl = `${BASE_URL}?q=${encodeURIComponent(query)}&language=en&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${API_KEY}`;
  const proxyUrl = `${CORS_PROXY}${encodeURIComponent(apiUrl)}`;

  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error(`CORS proxy error: ${response.statusText}`);

  const data = await response.json();

  if (data.status === 'error') throw new Error(data.message || 'Error fetching news');
  if (!data.articles) throw new Error('No news articles found.');

  return {
    articles: transformNewsData(data.articles),
    totalResults: data.totalResults,
  };
};