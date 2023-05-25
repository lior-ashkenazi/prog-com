import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../types/userTypes";
import { Chat } from "../types/chatTypes";

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
});

export const { setUser, setSelectedChat, setChats } = appSlice.actions;

export default appSlice.reducer;
