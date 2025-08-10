const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';

const transformImageData = hits =>
  hits.map(hit => ({
    id: hit.id,
    webformatURL: hit.webformatURL,
    largeImageURL: hit.largeImageURL,
    alt: hit.tags,
  }));

export const fetchNatureImages = async () => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: 'nature',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 10,
    safesearch: 'true',
  });

  const url = `${BASE_URL}?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Pixabay API error: ${res.statusText}`);

  const data = await res.json();
  if (!data.hits || data.hits.length === 0)
    throw new Error('No images found for "nature".');

  return transformImageData(data.hits);
};
