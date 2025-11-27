import axios from 'axios';

console.log(process.env.NEXT_PUBLIC_APP_V2_API_URL);

const callAppV2Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_V2_API_URL || '',
});

export default callAppV2Api;
