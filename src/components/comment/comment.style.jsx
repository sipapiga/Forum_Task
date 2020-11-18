import styled from 'styled-components';
import CustomButton from '../../components/custom-button/Custom-button';

/* Styled Components Inheritance */
export const CreateCommentButton = styled(CustomButton)`
  margin: 20px 0px 20px;
  padding: 0 20px 0 20px;
  height: 40px;
  line-height: 20px;

  &:hover {
    color: #fff;
    background-color: #2f5d31;
    border-color: #0c4e94;
  }

  &:focus {
    background-color: #2f5d31;
    border-color: #1e4820 !important;
  }
`;
