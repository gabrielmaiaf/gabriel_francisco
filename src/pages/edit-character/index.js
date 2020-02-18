import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';

// Component
import CharacterForm from '../../components/character-form';

function EditCharacter(props) {
  const { id } = props.match.params;
  const [state, setState] = useState({
    name: undefined,
    homeworld: undefined,
    gender: null,
    species: null,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/characters/${id}`)
    .then(resp => resp.json())
    .then(response => {
      setState({
        name: response.name,
        homeworld: response.homeworld,
        gender: response.gender,
        species: response.species,
      })
    });
  }, [id])

  const handleEdit = () => {
    fetch(`http://localhost:3000/characters/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: state.name,
        species: state.species,
        gender: state.gender,
        homeworld: state.homeworld,
      })
    })
      .then(res => res.json())
      .then(() => props.history.push('/'))
  }

  return (
    <Fragment>
      <h1>Edit character</h1>

      <CharacterForm
        onChange={setState}
        onSubmit={() => handleEdit()}
        buttonText="Edit"
        state={state}
      />
    </Fragment>
  );
}

export default withRouter(EditCharacter);
