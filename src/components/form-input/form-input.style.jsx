import styled from 'styled-components';

export const StyledContainer = styled.div`
  position: relative;
  margin: 45px 0;
`;
export const StyledFormInput = styled.input`
  background: none;
  background-color: white;
  color: grey;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 90%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid grey;
  margin: 25px 0 0 30px;
  &:focus {
    outline: none;
  }
`;
export const FormInputLabel = styled.label`
  color: grey;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 30px;
  top: 10px;
  transition: 300ms ease all;
  &.shrink {
    top: -14px;
    font-size: 12px;
    color: black;
  }
`;
