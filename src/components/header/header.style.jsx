import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  box-shadow: 0px 1px 10px #888888;
`;
/* Styled Components Inheritance */
export const LogoContainer = styled(Link)`
  width: 80px;
  padding: 10px;
`;
export const OptionContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const OptionLink = styled(Link)`
  ${OptionContainerStyles}
`;
export const OptionDiv = styled.div`
  ${OptionContainerStyles}
`;
