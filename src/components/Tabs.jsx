import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setMember } from "redux/modules/memberSlice";

export default function Tabs() {
  const activeMember = useSelector((state) => state.member);
  const dispatch = useDispatch();

  const onActiveMember = (event) => {
    if (event.target === event.currentTarget) return;

    dispatch(setMember(event.target.textContent));
  };
  return (
    <TabsWrapper onClick={onActiveMember}>
      <Tab $activeMember={activeMember}>그리즐리</Tab>
      <Tab $activeMember={activeMember}>판다</Tab>
      <Tab $activeMember={activeMember}>아이스베어</Tab>
    </TabsWrapper>
  );
}

const TabsWrapper = styled.ul`
  background-color: gray;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  gap: 12px;
  border-radius: 12px;
  width: 30%;
`;

const Tab = styled.li`
  ${(props) => {
    if (props.$activeMember === props.children) {
      return css`
        background-color: #eee;
        color: black;
      `;
    }
    return css`
      background-color: black;
      color: white;
    `;
  }}

  font-size: 20px;
  width: 30%;
  text-align: center;
  padding: 12px 6px;
  border-radius: 12px;
  cursor: pointer;
`;
