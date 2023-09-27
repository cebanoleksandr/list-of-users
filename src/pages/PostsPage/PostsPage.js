import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPosts, getUserPosts } from '../../api/posts';
import { Filters } from '../../components/Filters/Filters';
import { Loader } from '../../components/Loader/Loader';
import { PostCard } from '../../components/PostCard/PostCard';
import { getPostsAC } from '../../redux/postsReducer';
import './PostsPage.css';

export const PostsPage = () => {
  const posts = useSelector(state => state.posts.items);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const [sort, setSort] = useState(searchParams.get('_sort'));
  const [order, setOrder] = useState(searchParams.get('_order'));
  const [query, setQuery] = useState(searchParams.get('q'));
  const navigate = useNavigate();
  const path = userId ? `/posts?userId${userId}` : '/posts';
  let searchURL = [
    sort ? `_sort=${sort}` : '',
    order ? `_order=${order}` : '',
    query ? `q=${query}` : '',
  ];

  const loadPosts = () => {
    if (userId) {
      return getUserPosts(sort, userId, order, query);
    } else {
      return getPosts(sort, order, query);
    }
  }

  useEffect(() => {
    setIsLoading(true);

    loadPosts()
      .then(data => {
        dispatch(getPostsAC(data));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, sort, order, query]);

  useEffect(() => {
    if (!searchURL.length) {
      navigate(path);
    } else {
      navigate(`${path}?${searchURL.filter(Boolean).join('&')}`);
    }
  }, [sort, order, query]);

  const onOrder = (str) => {
    setOrder(str);
    const s = sort || order ? 'title' : '';
    searchURL = [
      sort ? `_sort=${s}` : '',
      order ? `_order=${str}` : '',
      query ? `q=${query}` : '',
    ];
  }

  const onQuery = (str) => {
    setQuery(str);
    const s = sort || order ? 'title' : '';
    searchURL = [
      sort ? `_sort=${s}` : '',
      order ? `_order=${order}` : '',
      query ? `q=${str}` : '',
    ];
  }

  const onRemomeSearch = () => {
    setOrder(null);
    setQuery(null);
    searchURL = [];
  }

  return (
    <div>
      <h1>Posts page</h1>

      {hasError && (
        <p className="loading-error">
          Something went wrong. Please, check your internet connection!
        </p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="posts-content">
          <div className="posts-list">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <Filters
            query={query}
            onOrder={onOrder}
            onQuery={onQuery}
            onRemomeSearch={onRemomeSearch}
            order={order}
          />
        </div>
      )}
    </div>
  );
}
