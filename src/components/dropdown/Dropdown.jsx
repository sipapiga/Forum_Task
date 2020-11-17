import React, { useState } from 'react';
import { StyledContainer, DropdownLabelStyle } from './dropdown.style';

export default function Dropdown({
  options,
  selected,
  onSelecteChange,
  label,
}) {
  const [open, setOpen] = useState(false);

  const renderedOptions = options.map((option) => {
    if (selected.id === option.id) {
      return null; //show null show nothing in the screen
    }
    return (
      <div
        key={option.id}
        className="item"
        onClick={() => onSelecteChange(option)}
      >
        {option.title}
      </div>
    );
  });
  return (
    <StyledContainer className="ui form">
      <div className="field">
        <DropdownLabelStyle>{label}</DropdownLabelStyle>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.title}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
