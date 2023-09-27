import { Link } from 'react-router-dom';
import './UserCard.css';

export const UserCard = ({ user }) => {
  return (
    <div className="users-item">
      <h2>{user.name}</h2>

      <div className="user-info">
        <div className="user-address">
          <p>
            <span className="span-info">City: </span>
            {user.address.city}
          </p>

          <p>
            <span className="span-info">Company: </span>
            {user.company.name}
          </p>

          <p>
            <span className="span-info">Website: </span>
            {user.website}
          </p>
        </div>

        <div className="user-links">
          <p className="user-links__info">
            <a href={`mailto:${user.email}`} className="link-info">
              <img
                src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
                className="user_icon"
                alt="Email"
              />
              Email
            </a>
          </p>

          <p className="user-links__info">
            <a href={`tel:+${user.phone.split(' ')[0]}`} className="link-info">
              <img
                src="https://cdn4.iconfinder.com/data/icons/social-media-2097/94/phone-512.png"
                className="user_icon"
                alt="Phone"
              />
              +{user.phone.split(' ')[0]}
            </a>
          </p>
        </div>
      </div>

      <div className="btn-container">
        <Link to={`/users/${user.id}`} className="btn btn-primary">
          Open profile
        </Link>
        <Link to={`/posts?userId=${user.id}`} className="btn btn-success">
          Posts
        </Link>
      </div>
    </div>
  );
}
