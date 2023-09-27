import { client } from '../utils/fetchClient';

export const getPosts = (sort, order, query) => {
  const s = sort || order ? 'title' : '';
  const o = order ? order : '';
  const q = query ? query : '';

  console.log(`/posts?_sort=${s}&_order=${o}&q=${q}`);

  return client.get(`/posts?_sort=${s}&_order=${o}&q=${q}`);
};

export const getUserPosts = (sort, userId, order = '', query = '') => {
  const s = sort || order ? 'title' : '';
  const o = order ? order : '';
  const q = query ? query : '';

  return client.get(`/posts?userId=${userId}&_sort=${s}&_order=${o}&q=${q}`);
};

export const getPost = (postId) => {
  return client.get(`/posts/${postId}`);
};
