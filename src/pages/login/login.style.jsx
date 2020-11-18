import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SignInContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  margin: 5rem auto 3rem auto;
  background-color: #fff;
  padding: 30px;
`;

export const TextLink = styled(Link)`
  width: 80px;
  padding: 10px;
  cursor: pointer;
`;
