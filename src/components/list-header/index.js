import React, { useState } from 'react';
import classNames from 'classnames';

function ListHeader({ text, onClick }) {
  const [isOpen, setOpen] = useState(false);
  
  const onToggle = () => {
    onClick(text, !isOpen);
    setOpen(!isOpen);
  }

  return (
    <th
      scope="col"
    >
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => onClick(text, isOpen)}
        >
          {text}
        </span>
        <i
          className={classNames('fa', {
            'fa-caret-down': !isOpen,
            'fa-caret-up': isOpen,
          })}
          style={{ cursor: 'pointer' }}
          onClick={() => onToggle()}
        />
      </div>
    </th>
  );
}

export default ListHeader;
