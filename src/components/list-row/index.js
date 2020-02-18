import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function ListRow({ id, name, species, gender, planet, history }) {
  const handleDelete = id => {
    fetch(`http://localhost:3000/characters/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(() => history.push('/'))
  }

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{species}</td>
      <td>{gender}</td>
      <td>{planet}</td>
      <td>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Actions"
        >
          <Link to={`/edit/${id}`} type="button" className="btn btn-secondary">
            <i className="fa fa-pencil" aria-hidden="true" /> Edit
          </Link>
          <button
            type="button" className="btn btn-danger"
            onClick={() => handleDelete(id)}
          >
            <i className="fa fa-trash-o" aria-hidden="true" /> Remove
          </button>
        </div>
      </td>
    </tr>
  );
}

export default withRouter(ListRow);
