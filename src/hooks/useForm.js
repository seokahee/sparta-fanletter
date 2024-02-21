const { useState } = require("react");

// 커스텀 훅을 써보고싶었지만 여러 인풋을 어떤식으로 써야할지 감이 안와서 강의 내용을 나중에 참고하기 위해 만듬

// 커스텀훅 사용하는 로직 (로그인 컴포넌트에서 사용됨)
// 커스텀훅에 초기 값을 넣는다 login컴포넌트에 넣어서 사용함
const { formState, changeHandler, setFormState } = useState({
  id: "",
  password: "",
  nickname: "",
});
// 커스텀훅에 넣은 값을 구조분해할당으로 하나씩 꺼낸거 얘도 로그인 컴포넌트에 씀
const { id, password, nickname } = formState;

//
// 커스텀 훅 만드는 로직
// state에 넣을 값을 인자로 받아오는데 객체형태로 받아옴 위에 작성됨
const useForm = (initialState = {}) => {
  // 아이디, 비밀번호, 닉네임이 모두 들어간 state
  // initialState안에 객체 형태로 값이 들어가있다
  const [formState, setFormState] = useState(initialState);

  // 각 인풋에 name과 initialState이름을 동일하게 쓰면 name키마다 값을 변경할 수 있다
  const changeHandler = (e) => {
    const { name, value } = e.target.value;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFormState(e.target.value);
  };
  // state 비우기 위한 함수
  const resetForm = () => {
    setFormState(initialState);
  };
  return [formState, changeHandler, setFormState];
};
export default useForm;

// 여러 state를 하나의 state로 묶어 커스텀훅 사용하기
// 1. 커스텀훅을 만들기 위한 함수를 만든다
// 2. 스테이트에 들어갈 값은 매개변수로 받아온다 (위 예시 코드는 매개변수가 객체형태인것임)
// 3. 스테이트를 만들고 인자값을 넣어준다

// 4. 체인지 함수를 만든다
// 5. 컴포넌트의 입력창에는 name속성을 넣는다(객체형 스테이트의경우 이름이 같아야함)
// 6. 체인지 함수 안에 키와 값을 구조분해 할당으로 이벤트 타겟 밸류를 넣어준다
// 7. 스테이트에 이전값을 인자로 받아 불변성을 위해 이전값을 전개구문으로 풀어주고 새 객체에(객체형태니까) name(키) : value를 넣어준다
// 그리고 스테이트에 이벤트 타겟을 넣어주고 콘솔로 확인하면 잘 작동할것
// 8. 다 만든 커스텀훅들을 배열에 담아 리턴해주면 끝

// 사용방법은 맨 위에 있음
