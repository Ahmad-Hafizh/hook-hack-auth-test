import axios from "axios";

const callHomeApi = axios.create({
  baseURL: "http://localhost:3000",
});

export default callHomeApi;
