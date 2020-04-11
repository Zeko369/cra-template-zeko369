import styled from "styled-components";

const Button = styled.button`
  outline: none;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;

  font-size: 0.75em;

  cursor: pointer;
  transition-duration: 0.3s;

  color: white;
  background-color: #ad237e;

  &:active {
    transform: translateY(3px);
    background-color: #9d136e;
  }
`;

export default Button;
