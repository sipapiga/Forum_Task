import React from 'react';
import {
  StyledContainer,
  StyledFormInput,
  FormInputLabel,
} from './form-input.style.jsx';

export default function formInput({ onChange, label, ...otherProps }) {
  return (
    <StyledContainer>
      <StyledFormInput onChange={onChange} {...otherProps} />
      {label ? (
        <FormInputLabel
          className={`${otherProps.value.length ? 'shrink' : ''}`}
        >
          {label}
        </FormInputLabel>
      ) : null}
    </StyledContainer>
  );
}
