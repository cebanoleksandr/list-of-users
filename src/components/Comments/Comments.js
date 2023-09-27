import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../api/comments';
import { getCommentsAC } from '../../redux/commentsReducer';
import { Loader } from '../Loader/Loader';
import './Comments.css';

export const Comments = ({ postId }) => {
  const comments = useSelector(state => state.comments.items);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getComments(postId)
    .then(data => {
      dispatch(getCommentsAC(data));
    })
    .catch(() => {
      setHasError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="comments">
      <h2>Comments</h2>

      {hasError && (
        <p className="loading-error">
          Can not load comments
        </p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map(comment => (
            <p key={comment.id}>
              <span className="author-email">{comment.email}: </span> {comment.body}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
