import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor || '#4CAF50'};
  border: none;
  color: white;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  text-transform: uppercase;
  padding: ${(props) => props.padding || '0 25px 0 25px'};
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  font-weight: bolder;
  border-radius: 5px;
  width: ${(props) => props.width || 'auto'};

  &:hover {
    color: #fff;
    background-color: ${(props) => props.hover || '#218838#218838'};
    border-color: #1e7e34;
  }
  &:focus {
    outline: 5px auto #b3deb4;
  }
`;
