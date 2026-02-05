import axios from "axios";

const baseURL = "https://car-rental-api.goit.global";

export const api = axios.create({
  baseURL,
  withCredentials: false,
});

export default api;
