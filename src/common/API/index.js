import axios from "axios";

export const API = {
  get: async function (endpoint) {
    try {
      const response = await axios.get(
        "https://gigih-final-term-backend.vercel.app/" + endpoint
      );
      return response;
    } catch (error) {
      throw error.response;
    }
  },
  post: async function (endpoint, params) {
    try {
      const response = await axios.post(
        "https://gigih-final-term-backend.vercel.app/" + endpoint,
        params
      );
      return response;
    } catch (error) {
      throw error.response;
    }
  },
};
