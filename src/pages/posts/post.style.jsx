import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/custom-button/Custom-button';

export const PostContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

export const PostLink = styled(Link)`
  padding: 10px;
  font-size: 16px;
  margin-left: 10px;
`;
export const PostChipLink = styled(Link)`
  color: #fff !important;
  text-align: center;
  align-items: center;
  padding: 5px;
`;
export const PostCategoryChips = styled.div`
  width: ${(props) => props.width || '100%; '};
  font-size: 16px;
  padding: 10px;
  background-color: ${(props) => props.bgColor || '#51565a'};
  color: #fff;
  height: 100%;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  text-align: center;
`;
export const PostDetailCategory = styled(PostCategoryChips)`
  padding: 2px;
  border-radius: 4px;

  &:hover {
    color: #fff;
    background-color: #eb4612;
    border-color: #eb4612;
  }
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
  margin-top: 20px;
`;

export const PostDetailsDiv = styled(PostContainer)`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  margin-top: 15px;
  justify-content: space-between;
`;
