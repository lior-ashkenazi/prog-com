import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersEndpoints } from "../apis/usersEndpoints";
import { authEndpoints } from "../apis/authEndpoints";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("prog-com-jwt"),
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    removeToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersEndpoints.endpoints.registerUser.matchFulfilled, (state, action) => {
        const token = action.payload.token;
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem("prog-com-jwt", token);
      })
      .addMatcher(usersEndpoints.endpoints.loginUser.matchFulfilled, (state, action) => {
        const token = action.payload.token;
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem("prog-com-jwt", token);
      })
      .addMatcher(authEndpoints.endpoints.googleAuth.matchFulfilled, (state, action) => {
        const token = action.payload.token;
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem("prog-com-jwt", token);
      })
      .addMatcher(authEndpoints.endpoints.githubAuth.matchFulfilled, (state, action) => {
        const token = action.payload.token;
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem("prog-com-jwt", token);
      })
      .addMatcher(usersEndpoints.endpoints.authUser.matchFulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addMatcher(usersEndpoints.endpoints.logoutUser.matchFulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        localStorage.remove("prog-com-jwt");
      });
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
