import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JsonApi, authApi } from "axios/api";
import { toast } from "react-toastify";

// 로그인 상태 초기값
const initialState = {
  // 값이 존재할 때에만 true, 값이 없으면 false
  isLogin: !!localStorage.getItem("accessToken"),
  nickname: localStorage.getItem("nickname"),
  avatar: localStorage.getItem("avatar"),
  userId: localStorage.getItem("userId"),
};

export const __editProfile = createAsyncThunk(
  "editProfile",
  async (payload, thunkAPI) => {
    try {
      const { data } = await authApi.patch("/profile", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const editingObj = {};
      const { nickname, avatar } = data;
      if (nickname) editingObj.nickname = nickname;
      if (avatar) editingObj.avatar = avatar;

      const userId = localStorage.getItem("userId");
      const { data: myLetters } = await JsonApi.get(
        `/letters?userId=${userId}`
      );

      for (const myletter of myLetters) {
        await JsonApi.patch(`letters/${myLetters.id}`, editingObj);
      }

      return data;
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue;
    }
  }
);

// actionCreator , reducer 생성
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // 페이로드로 받은 로컬 스토리지 저장
      const { accessToken, nickname, avatar, userId } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("userId", userId);
      state.isLogin = true;
      state.nickname = nickname;
      state.avatar = avatar;
      state.userId = userId;
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
  extraReducers: (builder) => {
    builder.addCase(__editProfile.fulfilled, (state, action) => {
      const { nickname, avatar } = action.payload;
      if (avatar) {
        localStorage.setItem("avatar", avatar);
        state.avatar = avatar;
      }
      if (nickname) {
        localStorage.setItem("nickname", nickname);
        state.nickname = nickname;
      }
      state.isLoading = false;
      toast.success("프로필 변경이 완료되었습니다.");
    });
    builder.addCase(__editProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addMatcher(
      (action) => action.type === __editProfile,
      (state, action) => {
        state.isLoading = true;
        state.isError = false;
      }
    );
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
