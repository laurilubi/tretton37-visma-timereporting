import styled from 'styled-components';
import Input from './Input';

const Form = styled.form`
  max-width: 20rem;
  & > ${Input} {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

export default Form;