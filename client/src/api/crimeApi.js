import axios from "axios";

const API = "http://localhost:5000/api";

export const getCounties = async () => {
  const response = await axios.get(`${API}/counties`);
  return response.data;
};
