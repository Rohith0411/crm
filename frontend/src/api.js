import axios from "axios"; //call api

const API = axios.create({
  baseURL: "https://mini-crm-backend-o2iw.onrender.com", //dont want to write full url
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;