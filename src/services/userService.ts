import axios from 'axios';

const USERS_URL = 'http://localhost:3000/api/user';


export const createUser = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${USERS_URL}`, {
        username,
        password
      });
      return response;
    } catch (error) {
      throw new Error('Failed to count favorites');
    }
};
