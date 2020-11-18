import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 90vh;
  background: rgb(238, 174, 202);
  background: linear-gradient(
    90deg,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  border: 3px solid grey;
  display: flex;
  justify-content: center;
`;

export const Text = styled.h1`
  align-items: center;
  text-align: center;
  padding-top: 20%;
  margin: auto;
  font-size: 5rem;
  font-family: 'Lucida Console', Courier, monospace;
`;
