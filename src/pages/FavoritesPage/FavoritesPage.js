import { useSelector } from 'react-redux';
import { PostCard } from '../../components/PostCard/PostCard';
import './FavoritesPage.css';

export const FavoritesPage = () => {
  const posts = useSelector(state => state.favorites.favoriteGoods);
  
  return (
    <div>
      <h1>Favorites page</h1>

      {!posts.length && (
        <p>There are no posts in favorites. Pick some!</p>
      )}

      <div className="favorites-list">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
