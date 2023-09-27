import { client } from '../utils/fetchClient';

export const getUsers = (sort, order = '', query = '') => {
  const s = sort || order ? 'name' : '';
  const o = order ? order : '';
  const q = query ? query : '';

  return client.get(`/users?_sort=${s}&_order=${o}&q=${q}`);
};

export const getUser = (userId) => {
  return client.get(`/users/${userId}`);
};
