
const API_URL = process.env.VUE_APP_API_URL;

interface FetchOptions extends RequestInit {
  // Puedes agregar más opciones si lo necesitas
}

const fetchGlobal = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export default fetchGlobal;
