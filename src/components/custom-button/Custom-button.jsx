import React from 'react';
import { StyledButton } from './custom-button.style';

export default function CustomButton({ children, ...otherProps }) {
  return <StyledButton {...otherProps}>{children}</StyledButton>;
}
