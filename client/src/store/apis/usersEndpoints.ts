import { apiSlice } from "./apiSlice";

apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUserFields) => ({
        url: "users",
        method: "POST",
        body: newUserFields,
      }),
    }),
    loginUser: builder.mutation({
      query: (userFields) => ({
        url: "users/login",
        method: "POST",
        body: userFields,
      }),
    }),
    fetchUsers: builder.query({
      query: () => "users",
    }),
  }),
});
