import Tabs from "./Tabs";
import styled from "styled-components";
import mainImg from "../assets/main.png";

export default function Header() {
  return (
    <Container>
      <Title>We Bare Bears</Title>
      <HeaderImg src={mainImg} alt="위베어베어스 이미지" />
      <Tabs />
    </Container>
  );
}
const HeaderImg = styled.img`
  width: 30%;
`;
const Container = styled.section`
  width: 100%;
  /* height: 300px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 700;
  flex: 1;
  display: flex;
  align-items: center;
`;
