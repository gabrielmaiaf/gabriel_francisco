import React, { Fragment, useEffect, useState } from "react";

function AddCharacter() {
  const [species, setSpecies] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/species`)
    .then(resp => resp.json())
    .then(response => setSpecies(response))
  }, [])

  const speciesSelect = () => {
    const speciesOpts = species.map(s => <option key={s}>{s}</option>)
    return (
      <select id="species-select" defaultValue="Species" className="form-control" required>
        <option>Species</option>
        {speciesOpts}
      </select>
    );
  }

  const genderOpts = (text, id) => {
    return (
      <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="genderOptions" id={`gender${id}`} value={text.toLowerCase()} />
        <label className="form-check-label" htmlFor={`gender${id}`}>{text}</label>
      </div>
    );
  }

  return (
    <Fragment>
      <h1>Add character</h1>

      <form>
        <div className="form-group">
          <label htmlFor="input-name">Name</label>
          <input type="text" id="input-name" placeholder="Name" className="form-control" required />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="species-select">Species</label>
            {speciesSelect()}
          </div>
          <div className="form-group col-md-6">
            <label>Gender</label>
            <div className="form-group">
              {genderOpts('Male', 1)}
              {genderOpts('Female', 2)}
              {genderOpts('n/a', 3)}
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="input-homeworld">Homeworld</label>
          <input type="text" id="input-homeworld" placeholder="Homeworld" className="form-control" />
        </div>
      </form>
      <button type="submit" className="btn btn-primary">Add</button>
    </Fragment>
  );
}

export default AddCharacter;
