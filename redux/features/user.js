import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tasks.vitasoftsolutions.com/",
  }),
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => ({
        url: "",
        method: "GET",
        params: {},
      }),

      providesTags: ["userList"],
    }),

    getUserDetails: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),

    createUser: builder.mutation({
      query: ({ userData }) => ({
        url: "",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["userList"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: "",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["userList"],
    }),
  }),
});

export const {
  useGetUserListQuery,
  useGetUserDetailsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
