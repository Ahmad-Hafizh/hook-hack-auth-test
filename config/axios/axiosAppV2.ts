import axios from 'axios';

// console.log(process.env.APP_V2_API_URL);

const callAppV2Api = axios.create({
  baseURL: 'http://10.25.96.3:8000',
});

export default callAppV2Api;
