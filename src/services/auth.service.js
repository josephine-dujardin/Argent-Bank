import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LocalStorageKeys } from "../const/const";

// console.log(process.env.REACT_APP_API_BASE_URL)

export const argentBankApi = createApi({
  reducerPath: "argentBankApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3001/api/v1`,
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
      login: builder.mutation({
        query: function(credentials) {
          return {
            url: "/user/login",
            method: "POST",
            body: credentials,
          };
        },
      }),
      signUp: builder.mutation({
        query: function() {
          return "/user/signup";
        },
      }),
      profile: builder.mutation({
        query: function(body) {
          return {
            url: "/user/profile",
            method: "POST",
            body: body,
          };
        },
      }),
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

export const { useLoginMutation, useSignUpMutation, useProfileMutation, useUpdateProfileMutation } =
  argentBankApi;