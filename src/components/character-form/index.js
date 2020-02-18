import React, { Fragment, useEffect, useState } from "react";
import classNames from 'classnames';

function CharacterForm({ onChange, onSubmit, buttonText, state }) {
  const [speciesTypes, setSpeciesTypes] = useState([]);
  const [touch, setTouch] = useState({
    name: false,
    species: false,
    gender: false,
  });
  const [disabled, setDisabled] = useState(false);

  const RequiredText = <span className="text-primary">*</span>;
  const errorText = <span style={{ display: 'block' }} className="invalid-feedback">This field is required.</span>

  useEffect(() => {
    fetch(`http://localhost:3000/species`)
    .then(resp => resp.json())
    .then(response => setSpeciesTypes(response))
  }, [])

  const speciesSelect = () => {
    const speciesOpts = speciesTypes.map(s => <option key={s} value={s}>{s}</option>)
    return (
      <select
        id="species"
        value={state.species || ''}
        className={classNames("form-control", {
          'is-invalid': showError('species')
        })}
        required
        onChange={e => onChange({ ...state, species: e.target.value })}
        onBlur={() => handleBlur('species')}
      >
        <option value="" disabled hidden>Species</option>
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
            className={classNames("form-check-input", {
              'is-invalid': showError('gender')
            })}
            type="radio"
            name="genderOptions"
            id={`gender${i}`}
            value={options[i].toLowerCase()}
            onChange={e => onChange({ ...state, gender: e.target.value })}
            checked={options[i].toLowerCase() === state.gender}
            required
          />
          <label className="form-check-label" htmlFor={`gender${i}`}>{options[i]}</label>
        </div>
      )
    }

    return genderOptions;
  }

  const handleBlur = (field) => setTouch({ ...touch, [field]: true });

  const validation = (name, gender, species) => {
    return {
      name: name === undefined || name.length === 0,
      species: species === null || species.length === 0,
      gender: gender === null || gender.length === 0,
    }
  }

  const errors = validation(state.name, state.gender, state.species);
   
  const showError = (field) => {
    const hasError = errors[field];
    const shouldShow = touch[field];

    return hasError ? shouldShow : false;
  }

  const handleSubmit = e => {
    const notAllowed = Object.keys(errors).filter(n => errors[n]);

    if (notAllowed.length !== 0) {
      e.preventDefault();
      setTouch({
        name: notAllowed.find(e => e === 'name'),
        species: notAllowed.find(e => e === 'species'),
        gender: notAllowed.find(e => e === 'gender'),
      });
      document.getElementById(notAllowed[0]).focus();
      return;
    }

    setDisabled(true);
    return onSubmit();
  }

  return (
    <Fragment>
      <form className="mt-5">
        <div className="form-group">
          <label htmlFor="input-name">Name {RequiredText}</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className={classNames("form-control", {
              'is-invalid': showError('name')
            })}
            required
            onChange={e => onChange({ ...state, name: e.target.value })}
            value={state.name || ''}
            onBlur={() => handleBlur('name')}
          />
          {showError('name') ? errorText : null}
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="species-select">Species {RequiredText}</label>
            {speciesSelect()}
            {showError('species') ? errorText : null}
          </div>
          <div className="form-group col-md-5 ml-2">
            <label>Gender {RequiredText}</label>
            <div id="gender" className="form-group mt-1">
              {genderOpts()}
            </div>
            {showError('gender') ? errorText : null}
          </div>
        </div>
        <div>
          <label htmlFor="input-homeworld">Homeworld</label>
          <input
            type="text"
            id="input-homeworld"
            placeholder="Homeworld"
            className="form-control"
            onChange={e => onChange({ ...state, homeworld: e.target.value })}
            value={state.homeworld || ''}
          />
        </div>
      </form>
      <button
        type="submit"
        className="btn btn-primary btn-block mt-5"
        onClick={e => handleSubmit(e)}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </Fragment>
  );
}

export default CharacterForm;
