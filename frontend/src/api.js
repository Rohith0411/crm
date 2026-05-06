import axios from "axios"; //call api

const API = axios.create({
  baseURL: "http://localhost:5000/api", //dont want to write full url
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;