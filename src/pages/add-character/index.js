import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';

function AddCharacter(props) {
  const [speciesTypes, setSpeciesTypes] = useState([]);
  const [name, setName] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [gender, setGender] = useState(null);
  const [species, setSpecies] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/species`)
    .then(resp => resp.json())
    .then(response => setSpeciesTypes(response))
  }, [])

  const speciesSelect = () => {
    const speciesOpts = speciesTypes.map(s => <option key={s}>{s}</option>)
    return (
      <select
        id="species-select"
        defaultValue="Species"
        className="form-control"
        required
        onChange={e => setSpecies(e.target.value)}
      >
        <option>Species</option>
        {speciesOpts}
      </select>
    );
  }

  const genderOpts = () => {
    const options = ['Male', 'Female', 'n/a'];
    const genderOptions = [];
    for(let i = 0; i <= options.length - 1; ++i) {
      genderOptions.push(
        <div key={`gender${i}`} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="genderOptions"
            id={`gender${i}`}
            value={options[i].toLowerCase()}
            onChange={e => setGender(e.target.value)}
          />
          <label className="form-check-label" htmlFor={`gender${i}`}>{options[i]}</label>
        </div>
      )
    }

    return genderOptions;
  }

  const RequiredText = <span className="text-primary">*</span>

  const handleCreate = () => {
    fetch('http://localhost:3000/characters', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        species: species,
        gender: gender,
        homeworld: homeworld,
      })
    })
      .then(res => res.json())
      .then(() => props.history.push('/'))
  }

  return (
    <Fragment>
      <h1>Add character</h1>

      <form className="mt-5">
        <div className="form-group">
          <label htmlFor="input-name">Name {RequiredText}</label>
          <input
            type="text"
            id="input-name"
            placeholder="Name"
            className="form-control"
            required
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="species-select">Species {RequiredText}</label>
            {speciesSelect()}
          </div>
          <div className="form-group col-md-5 ml-2">
            <label>Gender {RequiredText}</label>
            <div className="form-group mt-1">
              {genderOpts()}
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="input-homeworld">Homeworld</label>
          <input
            type="text"
            id="input-homeworld"
            placeholder="Homeworld"
            className="form-control"
            onChange={e => setHomeworld(e.target.value)}
          />
        </div>
      </form>
      <button
        type="submit"
        className="btn btn-primary btn-block mt-5"
        onClick={() => handleCreate()}
      >
        Add
      </button>
    </Fragment>
  );
}

export default withRouter(AddCharacter);
