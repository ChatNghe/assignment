import { randomUser } from "../../service/userService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface UserState {
  users?: object;
}
const initialState: UserState = {
  users: {},
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(randomUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
