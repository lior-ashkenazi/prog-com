import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../index";

const NODE_ENV = import.meta.env.VITE_NODE_ENV as string;
const ENDPOINT = import.meta.env.VITE_ENDPOINT as string;

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Users", "Messages", "Chats", "Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${NODE_ENV === "production" ? ENDPOINT : ""}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token: string | null = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
