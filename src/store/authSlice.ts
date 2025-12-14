import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  currentUser: { name: string; email: string } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    //  در این بخش(_) جایگزینی شده برای استیت
    login: (_, action: PayloadAction<{ email: string; password: string }>) => {
      // لاجیک واقعی توسط Member2 اضافه می‌شود
      console.log("Dispatch login:", action.payload);
    },
    register: (
      _,
      action: PayloadAction<{ name: string; email: string; password: string }>
    ) => {
      // لاجیک واقعی توسط Member2 اضافه می‌شود
      console.log("Dispatch register:", action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
