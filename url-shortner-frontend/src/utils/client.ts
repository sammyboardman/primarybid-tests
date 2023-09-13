import axios from 'axios';

const client = axios.create({
  timeout: 10000,
});


export default client;
