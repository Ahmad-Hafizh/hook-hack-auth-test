import axios from "axios";

const callHomeApi = axios.create({
  baseURL: "https://hook-hack.com",
});

export default callHomeApi;
