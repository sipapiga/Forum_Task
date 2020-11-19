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
  font-size: 14px;
  text-align: center;
  align-items: center;
  padding: 5px;
`;
export const PostCategoryChips = styled.div`
  width: ${(props) => props.width || '100%; '};
  padding: 2px;
  background-color: ${(props) => props.bgColor || '#51565a'};
  display: inline-flex;
  color: #fff;
  align-items: center;
  height: 100%;
  cursor: pointer;
  border: none;
  border-radius: 5px;
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
