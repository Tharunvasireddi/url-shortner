import { createSlice } from "@reduxjs/toolkit";

let parsedUser = null;
try {
  const userFromStorage = localStorage.getItem("user");
  parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
} catch (error) {
  console.error("Failed to parse user from localStorage:", error);
  localStorage.removeItem("user"); // clear corrupted data
  parsedUser = null;
}

const initialState = {
  user: parsedUser,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user } = action.payload;
      console.log("User logged in:", user);

      localStorage.setItem("user", JSON.stringify(user));

      state.user = user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
