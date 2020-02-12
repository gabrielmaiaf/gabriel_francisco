import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import ListRow from '../../components/list-row';
import Pagination from '../../components/pagination';

function ListView() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch(`http://localhost:3000/characters?_page=${page}&_limit=10`)
    .then(resp => resp.json())
    .then(response => setCharacters(response))
  }, [page])

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
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Species</th>
            <th scope="col">Gender</th>
            <th scope="col">Homeworld</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listCharacters()}
        </tbody>
      </table>

      <Pagination
        page={page}
        onPress={e => setPage(e)}
      />
    </Fragment>
  );
}

export default ListView;
