import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SignInContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
`;

export const TextLink = styled(Link)`
  width: 80px;
  padding: 10px;
  cursor: pointer;
`;
