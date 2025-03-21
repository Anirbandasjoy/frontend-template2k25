import { templateApi } from "@/redux/api/baseApi";

import {
  IForgotPasswordRequest,
  IForgotPasswordResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
  IUpdatePasswordRequest,
  IUpdatePasswordResponse,
  loginRequest,
  loginResponse,
  logOutResponse,
} from "./auth.interface";

const authApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleLogin: builder.mutation<loginResponse, loginRequest>({
      query: ({ email, password }) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: { email, password },
        };
      },
    }),

    handleLogOut: builder.mutation<logOutResponse, void>({
      query: () => {
        return {
          url: "/auth/logOut",
          method: "POST",
        };
      },
    }),

    handleForgotPassword: builder.mutation<
      IForgotPasswordResponse,
      IForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    handleResetPassword: builder.mutation<
      IResetPasswordResponse,
      IResetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PUT",
        body: data,
      }),
    }),

    handleUpdatePassword: builder.mutation<
      IUpdatePasswordResponse,
      IUpdatePasswordRequest
    >({
      query: (data) => {
        return {
          url: "/auth/update-password",
          method: "PATCH",
          body: {
            oldPassword: data?.oldPassword,
            newPassword: data?.newPassword,
            confirmPassword: data?.confirmPassword,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleLoginMutation,
  useHandleLogOutMutation,
  useHandleForgotPasswordMutation,
  useHandleResetPasswordMutation,
  useHandleUpdatePasswordMutation,
} = authApi;
