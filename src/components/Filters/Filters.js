import cn from 'classnames';
import { useState } from 'react';
import './Filters.css';

export const Filters = ({ query, onOrder, onQuery, onRemomeSearch, order }) => {
  const [q, setQ] = useState(query || '');

  const sortASC = () => {
    onOrder('asc');
  }

  const sortDESC = () => {
    onOrder('desc');
  }

  const removeFilters = () => {
    onRemomeSearch();
  }

  const searchHandler = () => {
    onQuery(q);
  }

  return (
    <div className="filter">
      <div className="search">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          type='text'
          placeholder="Search..."
        />

        <button className="btn btn-success" onClick={searchHandler}>
          Search
        </button>
      </div>

      <div className="btns">
        <button
          className={cn('btn', {
            'btn-success': order === 'asc',
            'btn-dark': order !== 'asc',
          })}
          onClick={sortASC}
        >
          ASC
        </button>

        <button
          className={cn('btn', {
            'btn-success': order === 'desc',
            'btn-dark': order !== 'desc',
          })}
          onClick={sortDESC}
        >
          DESC
        </button>

        <button
          className="btn btn-dark"
          onClick={removeFilters}
        >
          Remove filters
        </button>
      </div>
    </div>
  );
}
