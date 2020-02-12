import React from 'react';

function ListRow({ id, name, species, gender, planet }) {
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
          <button type="button" className="btn btn-secondary">
            <i className="fa fa-pencil" aria-hidden="true" /> Edit
          </button>
          <button type="button" className="btn btn-danger">
            <i className="fa fa-trash-o" aria-hidden="true" /> Remove
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ListRow;
