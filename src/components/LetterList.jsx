import styled from "styled-components";
import { useSelector } from "react-redux";
import LetterCard from "./LetterCard";

export default function LetterList() {
  const activeMember = useSelector((state) => state.member);
  // const letters = useSelector((state) => state.letters);
  const letters = useSelector((state) => state.letters.letter);

  const filteredLetters = letters.filter(
    (letter) => letter.writedTo === activeMember
  );
  return (
    <ListWrapper>
      {filteredLetters.length === 0 ? (
        <p>{activeMember}에게 남겨진 팬레터가 없습니다. </p>
      ) : (
        filteredLetters.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;
  border-radius: 12px;
  padding: 1%;
`;
