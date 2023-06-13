import { apiSlice } from "./apiSlice";
import {
  FetchProfileRequest,
  FetchProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "./types/profileEndpointsTypes";

export const profileEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProfile: builder.query<FetchProfileResponse, FetchProfileRequest>({
      query: (userId) => `/profile/${userId}`,
      providesTags: [{ type: "Profile" }],
    }),
    updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (chatDetails) => ({
        url: "profile",
        method: "PUT",
        body: chatDetails,
      }),
      invalidatesTags: [{ type: "Profile" }],
    }),
  }),
});
