import axios from "axios";

const callApi = axios.create({
  baseURL: "https://api.hook-hack.com/",
});

export default callApi;
