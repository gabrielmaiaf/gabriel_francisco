import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import ListHeader from '../../components/list-header';
import ListRow from '../../components/list-row';
import Pagination from '../../components/pagination';

// Helpers
import useDebounce from '../../helpers/use-debounce';

function ListView() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(1);
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('_sort=id&_order=asc');

  const searchEvent = useDebounce(search, 200);

  useEffect(() => {
    const fetchPage = searchEvent !== '' ? `http://localhost:3000/characters?q=${searchEvent}&_page=${page}&_limit=10&${ordering}`
      : `http://localhost:3000/characters?_page=${page}&_limit=10&${ordering}`;
    fetch(fetchPage)
    .then(resp => resp.json())
    .then(response => setCharacters(response))
  }, [searchEvent, page, ordering])

  useEffect(() => {
    const fetchPage = searchEvent !== '' ? `http://localhost:3000/characters?q=${searchEvent}`
      : 'http://localhost:3000/characters';
    fetch(fetchPage)
    .then(resp => resp.json())
    .then(response => setPagination(response.length))
  }, [searchEvent])

  const listCharacters = () => {
    return characters.map(c => {
      return (
        <ListRow
          key={c.id}
          id={c.id}
          name={c.name}
          species={c.species}
          gender={c.gender}
          planet={c.homeworld}
        />
      );
    });
  }

  const handleOrder = (sort, order) => {
    let sortedQuery;
    switch (sort) {
      case 'Name':
        sortedQuery = '_sort=name'        
        break;
      case 'Gender':
        sortedQuery = '_sort=gender';
        break;
      case 'Species':
        sortedQuery = '_sort=species';
        break;
      case 'Id':
        sortedQuery = '_sort=id';        
        break;
      default:
        break;
    }

    let orderQuery = order ? '_order=desc' : '_order=asc';

    setOrdering(`${sortedQuery}&${orderQuery}`)
  }

  const NoResults = () => (
    <tr>
      No Results Found
    </tr>
  )

  return (
    <Fragment>
      <h1>List View</h1>

      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="searchInput" className="sr-only">
              Search
            </label>
            <input
              type="text"
              className="form-control"
              id="searchInput"
              placeholder="Search..."
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-sm-6 text-sm-right">
          <Link to="/add" type="button" className="btn btn-primary mb-3">
            Add New
          </Link>
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <ListHeader text="Id" onClick={handleOrder} />
            <ListHeader text="Name" onClick={handleOrder} />
            <ListHeader text="Species" onClick={handleOrder} />
            <ListHeader text="Gender" onClick={handleOrder} />
            <ListHeader text="Homeworld" onClick={handleOrder} />
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {search.length > 0 && characters.length === 0 ? NoResults() : listCharacters()}
        </tbody>
      </table>

      {search.length > 0 && characters.length === 0 ?
        null : 
        <Pagination
          page={page}
          totalPages={pagination}
          onPress={e => setPage(e)}
        />
      }
    </Fragment>
  );
}

export default ListView;
