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
  isLogin: false,
};

// actionCreator , reducer 생성
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
    },
    logout: (state, action) => {
      state.isLogin = false;
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
