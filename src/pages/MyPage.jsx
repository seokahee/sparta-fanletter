import Avatar from "components/common/Avatar";
import Button from "components/common/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

function MyPage() {
  const { avatar, nickname, userId } = useSelector((state) => state.auth);

  // 닉네임 변경
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [selectedImg, setSelectedImg] = useState("");

  const previewImg = (e) => {
    // 인풋에 등록한 이미지 파일이 어떤 형식으로 들어있는지 확인 후 이미지 배열의 첫번째 요소를 넣는다
    const imgFile = e.target.files[0];
    console.log("imgFile", imgFile);

    if (imgFile.size > 1024 * 1024) {
      return toast.warn("최대 1MB까지 업로드 가능합니다.");
    }

    // 파일 객체를 url로 변환
    const imgUrl = URL.createObjectURL(imgFile);

    // 이미지 미리보기
    setSelectedImg(imgUrl);
  };

  const onEditDone = () => {
    toast.success("프로필 변경이 완료되었습니다.");
  };

  return (
    <Container>
      <ProfileWrapper>
        <h1>프로필 관리</h1>
        <label htmlFor="">
          <Avatar size="large" src={selectedImg} />
          <input type="file" onChange={previewImg} accept="image/*" />
        </label>

        {isEditing ? (
          <input
            type="text"
            defaultValue={nickname}
            autoFocus
            onChange={(e) => setEditingText(e.target.value)}
          />
        ) : (
          <NickName>{nickname}</NickName>
        )}
        <UserId>{userId}</UserId>
        {isEditing ? (
          <div>
            <Button text="취소" onClick={() => setIsEditing(false)} />
            <Button text="수정완료" onClick={onEditDone} />
          </div>
        ) : (
          <Button text="수정하기" onClick={() => setIsEditing(true)} />
        )}
      </ProfileWrapper>
    </Container>
  );
}

export default MyPage;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileWrapper = styled.section`
  width: 500px;
  border: 1px solid #eee;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  & h1 {
    font-size: 24px;
    font-weight: 700;
  }
  &div {
    display: flex;
    gap: 24px;
  }
  &input {
    height: 24px;
    outline: none;
    padding: 6px;
  }
  & > label > input {
    display: none;
  }
`;
const NickName = styled.span`
  font-size: 24px;
  font-weight: 700;
`;
const UserId = styled.span`
  font-size: 16px;
`;
