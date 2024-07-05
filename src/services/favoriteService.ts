import axios from 'axios';

const FAVORITES_URL = 'http://localhost:3000/api/favorites';
const TOKEN_KEY = 'jwt_token';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  'Content-Type': 'application/json',
});

export const getFavorites = async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(FAVORITES_URL, {
        params: { page, limit },
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch favorites');
    }
  };

export const addFavorite = async (videoId: any) => {
  try {
    const userId = localStorage.getItem('userId');
    console.log(userId)
    const response = await axios.post(FAVORITES_URL, { videoId: videoId, userId: userId }, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add favorite');
  }
};

export const removeFavorite = async (videoId: any) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await axios.delete(`${FAVORITES_URL}/${videoId}`, {
      headers: getAuthHeaders(),
      data: { userId },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to remove favorite');
  }
};

export const countFavorites = async () => {
    try {
      const response = await axios.get(`${FAVORITES_URL}/count`, {
        headers: getAuthHeaders(),
      });
      return response.data.count;
    } catch (error) {
      throw new Error('Failed to count favorites');
    }
  };
