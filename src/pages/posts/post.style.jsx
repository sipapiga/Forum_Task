import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/custom-button/Custom-button';

export const PostContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

export const PostLink = styled(Link)`
  padding: 10px;
  padding-left: 0px;
  font-size: 16px;
`;
export const PostChipLink = styled(PostLink)`
  padding: 0px;
  color: #fff !important;
`;
export const PostCategoryChips = styled.div`
  width: ${(props) => props.width || ' 120%; '};
  padding: 0 10px;
  background-color: ${(props) => props.bgColor || '#51565a'};
  display: inline-flex;
  color: #fff;
  align-items: center;
  height: 32px;
  font-size: 10px !important;
  cursor: pointer;
  border: none;
`;
/* Styled Components Inheritance */
export const CreatePostButton = styled(CustomButton)`
  margin: 30px 0px 30px;
  float: right;

  &:hover {
    color: #fff;
    background-color: #0c4e94;
    border-color: #0c4e94;
  }

  &:focus {
    background-color: #0c4e94;
    border-color: #0c4e94 !important;
  }
`;
export const ContentDiv = styled.div`
  margin-top: 50px;
`;

export const PostDetailsDiv = styled(PostContainer)`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  justify-content: flex-start;
`;
