// store/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Role = "admin" | "member";

export type User = {
  id: string;
  name: string;
  role: Role;
};

type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.unshift(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const updated = action.payload;
      state.users = state.users.map((u) => (u.id === updated.id ? updated : u));
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.users = state.users.filter((u) => u.id !== id);
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser, setUsers } = slice.actions;
export default slice.reducer;
