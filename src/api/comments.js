import { client } from '../utils/fetchClient';

export const getComments = (postId) => {
  return client.get(`/comments?postId=${postId}`);
};

export const removeComment = (commentId) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = (comment) => {
  return client.post('/comments', comment);
};
