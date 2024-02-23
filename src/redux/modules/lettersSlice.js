import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JsonApi } from "../../axios/api";

// 비동기 통신을 위한 state 설정
const initialState = {
  letters: [], // 팬레터 담는 곳
  isLoading: true, // 로그인 요청 중인지 여부
  isError: false, // 로그인 요청 중 에러가 발생했는지 여부
  error: null, // 로그인 요청 중 에러 메시지
};

// thunk를 이용한 비동기 함수 (db와 ui의 값을 동일하게 유지하기 위해)
export const __getLetter = createAsyncThunk(
  "getLetter",
  async (payload, thunkAPi) => {
    try {
      // 등록된 편지 불러오기
      const { data } = await JsonApi.get("/letters");

      // 편지 목록 내보내기
      return data;
    } catch (error) {
      console.log("오류 발생");
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const __addLetter = createAsyncThunk(
  "addLetter",
  async (payload, thunkAPi) => {
    try {
      // 새로운 편지 등록
      await JsonApi.post("/letters", payload);

      // 등록된 편지 불러오기
      const { data } = await JsonApi.get("/letters");

      // 편지 목록 내보내기
      return data;
    } catch (error) {
      console.log("오류 발생");
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const __deleteLetter = createAsyncThunk(
  "deleteLetter",
  async (payload, thunkAPi) => {
    try {
      await JsonApi.delete(`/letters/${payload}`);

      const { data } = await JsonApi.get("/letters");

      return data;
    } catch (error) {
      console.log("오류 발생");
      return thunkAPi.rejectWithValue(error);
    }
  }
);

export const __editLetter = createAsyncThunk(
  "editLetter",
  async ({ id, editingText }, thunkAPi) => {
    try {
      await JsonApi.patch(`/letters/${id}`, { content: editingText });

      const { data } = await JsonApi.get("/letters");

      return data;
    } catch (error) {
      console.log("오류 발생");
      return thunkAPi.rejectWithValue(error);
    }
  }
);

const letterSlice = createSlice({
  name: "letter",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(__addLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
      // action.payload = data
    });
    builder.addCase(__addLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(__getLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
      // action.payload = data
    });
    builder.addCase(__getLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(__deleteLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
      // action.payload = data
    });
    builder.addCase(__deleteLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(__editLetter.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
      // action.payload = data
    });
    builder.addCase(__editLetter.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addMatcher(
      (action) =>
        action.type === __getLetter.pending.type ||
        __addLetter.pending.type ||
        __deleteLetter,
      (state, action) => {
        state.isLoading = true;
        state.isError = false;
      }
    );
    // 펜딩은 어떤식으로 사용해야하는지 이해되지않는다
    // addMatcher 함수의 첫 번째 매개변수는 액션을 필터링하는 함수 << 여기가 이해 안됨, 액션을 필터링 하는 함수??? 그럼 어떤식으로 작성해야하는거지?
    // 두 번째 매개변수는 해당 액션이 발생했을 때 실행되는 리듀서 로직 << 여긴 이해 됨
  },
});

export default letterSlice.reducer;
