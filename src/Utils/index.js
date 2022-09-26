import Storage from './AsyncStorage';
import Axios, { AxiosRequestConfig } from 'axios';
export const avatar = `https://www.w3schools.com/howto/img_avatar.png`;

async function getHeaders() {
  let token = await Storage.getToken();
 // console.warn('Token======>>>>>>',token);
  return {
    headers: {
      Accept: '*/*',
     'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    documentheaders: {
      Accept: '*/*',
     // 'Content-Type': 'application/json',
      'Content-Type' : 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
}

const BearerHeaders = (token, More: AxiosRequestConfig = {}) => {
  return {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      ...More,
    },
  };
};
export { getHeaders, BearerHeaders };
