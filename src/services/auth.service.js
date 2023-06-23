import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorageKeys } from "../const/const";

// Create the API instance using createApi
export const argentBankApi = createApi({
  reducerPath: "argentBankApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3001/api/v1`,
    // Prepare headers function to include authorization token
    prepareHeaders: function(headers) {
      const token = localStorage.getItem(LocalStorageKeys.AuthToken);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: function(builder) {
    return {
      // Login endpoint mutation
      login: builder.mutation({
        query: function(credentials) {
          return {
            url: "/user/login",
            method: "POST",
            body: credentials,
          };
        },
      }),
      // Sign up endpoint mutation
      signUp: builder.mutation({
        query: function() {
          return "/user/signup";
        },
      }),
      // Profile endpoint mutation
      profile: builder.mutation({
        query: function(body) {
          return {
            url: "/user/profile",
            method: "POST",
            body: body,
          };
        },
      }),
      // Update profile endpoint mutation
      updateProfile: builder.mutation({
        query: function(body) {
          return {
            url: "user/profile",
            method: "PUT",
            body: body,
          };
        },
      }),
    };
  },
});

// Export generated hooks for each endpoint mutation
export const { useLoginMutation, useSignUpMutation, useProfileMutation, useUpdateProfileMutation } =
  argentBankApi;