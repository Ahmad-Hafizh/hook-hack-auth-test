import axios from "axios";

const callHomeApi = axios.create({
  baseURL: "http://hook-hack.com",
});

export default callHomeApi;
