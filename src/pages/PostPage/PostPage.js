import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../../api/posts';
import { getPostAC } from '../../redux/postReducer';
import { Loader } from '../../components/Loader/Loader';
import './PostPage.css';
import { Comments } from '../../components/Comments/Comments';

export const PostPage = () => {
  const { postId } = useParams();
  const post = useSelector(state => state.post.currentPost);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPost(postId)
      .then(data => {
        dispatch(getPostAC(data));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  
  return (
    <div>
      {hasError && (
        <p className="loading-error">
          Something went wrong. Please, check your internet connection!
        </p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="post-page">
          <div className="post-content">
            <h1>{post?.title}</h1>

            <p>{post?.body}</p>
          </div>

          <Comments postId={postId} />
        </div>
      )}
    </div>
  );
}
