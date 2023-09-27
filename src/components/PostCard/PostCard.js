import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/users';
import { addToFavorites, removeFromFavorites } from '../../redux/favoritesReducer';
import { Loader } from '../Loader/Loader';
import './PostCard.css';

export const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [author, setAutor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const favoritePosts = useSelector(state => state.favorites.favoriteGoods);
  const isFavorite = favoritePosts.some(favoritePost => favoritePost.id === post.id);
  const likeURL = isFavorite
    ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/768px-Heart_coraz%C3%B3n.svg.png'
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Heart_icon_red_hollow.svg/2166px-Heart_icon_red_hollow.svg.png';

  useEffect(() => {
    setIsLoading(true);

    getUser(post.userId)
      .then(data => {
        setAutor(data.name);
      })
      .catch(() => {
        setAutor(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [post.userId]);

  const toggleLike = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(post?.id));
    } else {
      dispatch(addToFavorites(post));
    }
  }

  return (
    <div className="post-item">
      <h2>{post?.title}</h2>

      {isLoading ? (
        <Loader />
      ) : (
        <small>{ author }</small>
      )}

      <div className="btn-container">
        <img
          src={likeURL}
          className="like"
          onClick={toggleLike}
          alt="Heart"
        />

        <Link to={`/posts/${post?.id}`} className="btn btn-primary">
          Open
        </Link>
      </div>
    </div>
  );
}
