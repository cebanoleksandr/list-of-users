import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUsers } from '../../api/users';
import { Filters } from '../../components/Filters/Filters';
import { Loader } from '../../components/Loader/Loader';
import { UserCard } from '../../components/UserCard/UserCard';
import { getUsersAC } from '../../redux/usersReducer';
import './HomePage.css';

export const HomePage = () => {
  const users = useSelector(state => state.users.items);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get('_sort'));
  const [order, setOrder] = useState(searchParams.get('_order'));
  const [query, setQuery] = useState(searchParams.get('q'));
  const navigate = useNavigate();
  const path = '/';

  let searchURL = [
    sort ? `_sort=${sort}` : '',
    order ? `_order=${order}` : '',
    query ? `q=${query}` : '',
  ];

  useEffect(() => {
    setIsLoading(true);
    console.log(sort);

    getUsers(sort, order, query)
      .then(data => {
        dispatch(getUsersAC(data));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, order, query]);

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
      <h1>Home page</h1>

      {hasError && (
        <p className="loading-error">
          Something went wrong. Please, check your internet connection!
        </p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="home-content">
          <div className="users-list">
            {users.map(user => (
              <UserCard key={user.id} user={user} />
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
