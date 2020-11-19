import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin: 20px;
  font-family: Lucida Console;
  cursor: pointer;
`;
export const BreadCrumbText = styled.div`
  &:hover {
    font-weight: bold;
    text-decoration: underline wavy blue !important;
  }
`;
