import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// // 비동기 통신을 위한 state 설정
// const initialState = {
//   users: [], // 로그인한 사용자 정보
//   isLoading: false, // 로그인 요청 중인지 여부
//   isError: false, // 로그인 요청 중 에러가 발생했는지 여부
//   error: null, // 로그인 요청 중 에러 메시지
// };

// // 회원가입 서버 통신을 위한 비동기 함수
// export const __register = createAsyncThunk(
//   "USER_REGISTER",
//   async (payload, thunkAPi) => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_JWT_SERVER}/register`,
//         payload
//       );
//       return response.data;
//     } catch (error) {
//       console.log("회원가입 실패");
//       throw error;
//     }
//   }
// );

// export const __login = createAsyncThunk(
//   "USER_LOGIN",
//   async (payload, thunkAPi) => {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_JWT_SERVER}/login`,
//         payload,
//         { withCredentials: true }
//       );
//       console.log("response", response);
//       return response.data;
//     } catch (error) {
//       console.log("로그인 실패");
//       throw error;
//     }
//   }
// );

// 로그인 상태 초기값
const initialState = {
  // 값이 존재할 때에만 true, 값이 없으면 false
  isLogin: !!localStorage.getItem("accessToken"),
};

// actionCreator , reducer 생성
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // 페이로드로 받은 로컬 스토리지 저장
      const accessToken = action.payload;
      localStorage.setItem("accessToken", accessToken);

      state.isLogin = true;
    },
    logout: (state, action) => {
      state.isLogin = false;

      // 로컬 스토리지 내의 모든 데이터 제거
      localStorage.clear("accessToken");
      // 로그아웃 시 사용자와 관련된 모든 데이터를 제거해야 함 그래서 모든 데이터를 제거하는 clear() 메서드를 사용하는 것이 더 적합하다. 사용자의 세션과 관련된 모든 정보를 지울 수 있기 때문에 보안상으로도 이점이 있다.

      //  특정 키에 해당하는 값 제거
      // localStorage.removeItem("accessToken")
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(__register.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.isError = false;
  //     state.users = action.payload; // 회원가입 성공 시 회원 정보 저장
  //   });
  //   builder.addCase(__register.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.isError = true;
  //     state.error = action.payload; // 서버에서 받은 에러 메세지 저장
  //   });
  //   builder.addCase(__login.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.isError = false;
  //     state.users = action.payload;
  //   });
  //   builder.addCase(__login.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.isError = true;
  //     state.error = action.payload;
  //   });

  // 펜딩은 어떤식으로 사용해야하는지 이해되지않는다
  // addMatcher 함수의 첫 번째 매개변수는 액션을 필터링하는 함수 << 여기가 이해 안됨, 액션을 필터링 하는 함수??? 그럼 어떤식으로 작성해야하는거지?
  // 두 번째 매개변수는 해당 액션이 발생했을 때 실행되는 리듀서 로직 << 여긴 이해 됨
  //   builder.addMatcher(
  //     (action) =>
  //       action.type === __register.pending.type ||
  //       action.type === __login.pending.type,
  //     (state, action) => {
  //       state.isLoading = true;
  //       state.isError = false;
  //     }
  //   );
  // },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
