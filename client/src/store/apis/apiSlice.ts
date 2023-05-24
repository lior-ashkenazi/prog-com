import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getToken } from "../../utils/auth";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Users", "Messages", "Chats"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token: string | null = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
