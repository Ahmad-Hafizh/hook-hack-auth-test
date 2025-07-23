import axios from "axios";

const callHomeApi = axios.create({
  baseURL: "https://www.hook-hack.com",
});

export default callHomeApi;
