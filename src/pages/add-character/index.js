import React, { Fragment, useState } from "react";
import { withRouter } from 'react-router-dom';

// Component
import CharacterForm from '../../components/character-form';

function AddCharacter(props) {
  const [state, setState] = useState({
    name: '',
    homeworld: null,
    gender: null,
    species: null,
  });  

  const handleCreate = () => {
    fetch('http://localhost:3000/characters', {
      method: 'POST',
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
      <h1>Add character</h1>

      <CharacterForm
        onChange={setState}
        onSubmit={() => handleCreate()}
        buttonText="Add"
        state={state}
      />
    </Fragment>
  );
}

export default withRouter(AddCharacter);
