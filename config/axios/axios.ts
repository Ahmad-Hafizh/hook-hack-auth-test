import axios from 'axios';

const callApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
});

export default callApi;
