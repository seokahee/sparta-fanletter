const { useState } = require("react");

// input onChange 함수를 간편하게 사용하기 위한 커스텀hook
const useInput = () => {
  const [value, setValue] = useState("");

  const handler = (e) => {
    setValue(e.target.value);
  };

  return [value, handler];
};

export default useInput;
