import { templateApi } from "@/redux/api/baseApi";
import {
  IIProcessSignUpResponse,
  IProcessSignUpUser,
  ISignUpMutationRequest,
  ISignUpMutationResponse,
  IUpdateUserProfileRequest,
  IUpdateUserProfileResponse,
} from "./user.interface";
import { loginResponse } from "../auth/auth.interface";

const templateUserApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleProcessSingUp: builder.mutation<
      IIProcessSignUpResponse,
      IProcessSignUpUser
    >({
      query: ({ name, email, password }) => {
        return {
          url: "/user/process-signup",
          method: "POST",
          body: {
            name: name,
            email: email,
            password: password,
          },
        };
      },
    }),
    handleSingUp: builder.mutation<
      ISignUpMutationResponse,
      ISignUpMutationRequest
    >({
      query: ({ token }) => {
        return {
          url: "/user/signup",
          method: "POST",
          body: { token: token },
        };
      },
    }),

    getLoggedInUser: builder.query<any, any>({
      query: () => {
        return {
          url: "/user/logged-in-user",
          method: "GET",
        };
      },
    }),

    getAllUser: builder.query<any, any>({
      query: ({ page, limit, search }) => {
        return {
          url: "/user/find",
          method: "GET",
          params: {
            page: page,
            limit: limit,
            search: search,
          },
        };
      },
    }),

    handleDeleteUser: builder.mutation<any, any>({
      query: (id) => {
        return {
          url: `/user/delete/${id}`,
          method: "DELETE",
        };
      },
    }),
    loggedInUser: builder.query<loginResponse, void>({
      query: () => {
        return {
          url: `/user/logged-in-user`,
          method: "GET",
        };
      },
    }),

    handleUpdateUserProfile: builder.mutation<
      IUpdateUserProfileResponse,
      IUpdateUserProfileRequest
    >({
      query: (data) => {
        console.log("Update User Profile Data:", data);
        return {
          url: "/user/update-user-profile",
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleProcessSingUpMutation,
  useHandleSingUpMutation,
  useGetLoggedInUserQuery,
  useGetAllUserQuery,
  useHandleDeleteUserMutation,
  useHandleUpdateUserProfileMutation,
  useLoggedInUserQuery,
} = templateUserApi;
