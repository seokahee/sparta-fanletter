import styled from "styled-components";

export default function Button({ text, onClick = () => {} }) {
  return (
    <BtnWrapper>
      <button onClick={onClick}>{text}</button>
    </BtnWrapper>
  );
}

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & button {
    background-color: #808080;
    color: white;
    font-size: 16px;
    padding: 6px 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;
