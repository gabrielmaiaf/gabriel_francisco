import React, { useState } from "react";
import { Link } from 'react-router-dom';
import classNames from 'classnames';

function Header() {
  const [isOpen, setOpen] = useState(false);
  
  const onToggle = () => setOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
      <Link to="/" className="navbar-brand">
        Sonalake Task
      </Link>

      <button
        type="button"
        onClick={() => onToggle()}
        className={classNames('navbar-toggler', {
          collapsed: !isOpen
        })}
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className={classNames('collapse', 'navbar-collapse', {
          show: isOpen
        })}
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              List View
              <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
