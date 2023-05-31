import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { usersEndpoints } from "../apis/usersEndpoints";
import { chatsEndpoints } from "../apis/chatsEndpoints";

import { User } from "../../types/userTypes";
import { Chat } from "../../types/chatTypes";

interface AppState {
  user: User | null;
  selectedChat: Chat | null;
  chats: Chat[];
}

const initialState: AppState = {
  user: null,
  selectedChat: null,
  chats: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setSelectedChat: (state, action: PayloadAction<Chat>) => {
      state.selectedChat = action.payload;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(usersEndpoints.endpoints.registerUser.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addMatcher(usersEndpoints.endpoints.loginUser.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addMatcher(usersEndpoints.endpoints.authUser.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addMatcher(chatsEndpoints.endpoints.accessChat.matchFulfilled, (state, action) => {
        // accessChat returns an object with property "chat"
        state.selectedChat = action.payload.chat;
      })
      .addMatcher(chatsEndpoints.endpoints.fetchChats.matchFulfilled, (state, action) => {
        state.chats = action.payload.chats;
      });
  },
});

export const { setUser, setSelectedChat, setChats } = appSlice.actions;

export default appSlice.reducer;
