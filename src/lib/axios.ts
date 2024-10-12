import setup from 'axios';
import { getCookie } from '../utils/get-cookie';

const csrftoken = getCookie('csrftoken');
const ig_app_id = '936619743392459';

const axios = setup.create({
  baseURL: 'https://www.instagram.com',
  headers: {
    'x-csrftoken': csrftoken,
    'x-ig-app-id': ig_app_id,
  },
});

export default axios;
