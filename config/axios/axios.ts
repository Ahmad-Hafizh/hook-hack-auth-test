import axios from "axios";

const callApi = axios.create({
  baseURL: "https://1f0f-133-125-60-141.ngrok-free.app/",
});

export default callApi;
