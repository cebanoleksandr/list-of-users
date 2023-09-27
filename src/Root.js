import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PostPage } from './pages/PostPage/PostPage';
import { PostsPage } from './pages/PostsPage/PostsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { UserPage } from './pages/UserPage/UserPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="users/:userId" element={<UserPage />} />

        <Route path="posts">
          <Route index element={<PostsPage />} />
          <Route path=":postId" element={<PostPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);
