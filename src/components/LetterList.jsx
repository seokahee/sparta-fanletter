import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getLetter } from "redux/modules/lettersSlice";
import styled from "styled-components";
import LetterCard from "./LetterCard";

export default function LetterList() {
  const activeMember = useSelector((state) => state.member);
  const letters = useSelector((state) => state.letters.letters); // state.리듀서. db에 저장된 letters[](initialState에 들어있는거)
  const dispatch = useDispatch();

  console.log("state.letters.letters", letters);

  useEffect(() => {
    dispatch(__getLetter());
  }, [dispatch]);

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
