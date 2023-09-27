import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getUser } from '../../api/users';
import { userUrls } from '../../utils/users-url';
import { Loader } from '../../components/Loader/Loader';
import { getUserAC } from '../../redux/userReducer';
import './UserPage.css';

export const UserPage = () => {
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getUser(userId)
      .then((data) => {
        dispatch(getUserAC(data));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
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
        <div className="users_item">
          <div className="users_main">
            <img
              src={userUrls[+user?.id - 1]}
              className="user-ava"
              alt="User"
            />

            <h1>{user?.name}</h1>
          </div>          

          <p>
            <span className="span-info">City: </span>
            {user?.address.city}
          </p>

          <p>
            <span className="span-info">Company: </span>
            {user?.company.name}
          </p>

          <p>
            <span className="span-info">Website: </span>
            {user?.website}
          </p>

          <p className="user-links__info">
            <a href={`mailto:${user?.email}`} className="link-info">
              <img
                src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
                className="user_icon"
                alt="Email"
              />
              Email
            </a>
          </p>

          <p className="user-links__info">
            <a href={`tel:+${user?.phone.split(' ')[0]}`} className="link-info">
              <img
                src="https://cdn4.iconfinder.com/data/icons/social-media-2097/94/phone-512.png"
                className="user_icon"
                alt="Phone"
              />
              +{user?.phone.split(' ')[0]}
            </a>
          </p>

          <div className="btn-container">
            <Link to={`/posts?userId=${user?.id}`} className="btn btn-primary">
              Open posts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
