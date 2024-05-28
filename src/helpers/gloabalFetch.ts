// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'http://localhost:8000/api/v1'

interface FetchOptions extends RequestInit {
}

const fetchGlobal = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, options);

  const contentType = response.headers.get('content-type');
  
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Expected JSON, got ${contentType}: ${text}`);
  }

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export default fetchGlobal;
