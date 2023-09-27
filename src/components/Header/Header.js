import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

export const Header = () => {
  const count = useSelector(state => state.favorites.favoriteGoods.length);
  const getLinkClass = ({ isActive }) => isActive
    ? 'nav-link active'
    : 'nav-link';

  return (
    <header className="header">
      <div>
        <Link to="/">
          <img
            src="https://e7.pngegg.com/pngimages/572/85/png-clipart-blogger-computer-icons-desktop-teckpath-blog-icon-text-trademark.png"
            className="main-icon"
            alt=""
          />
        </Link>
      </div>

      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/posts" className={getLinkClass}>
            Posts
          </NavLink>
        </li>

        <li className="nav-item fav-container">
          <NavLink to="/favorites" className={getLinkClass}>
            Favorites
          </NavLink>

          {!!count && (
            <div className="mini-count">
              {count <= 9 ? count : '9+'}
            </div>
          )}
        </li>
      </ul>
    </header>
  );
}
