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
  padding: 0 12px;
  background-color: #51565a;
  border-radius: 100px;
  display: inline-flex;
  margin: 4px;
  color: #fff;
  align-items: center;
  height: 32px;
  font-size: 14px;
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
