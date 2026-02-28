/*import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export default api;*/
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API,
});

export default api;