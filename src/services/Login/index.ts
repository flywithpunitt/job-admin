import { baseApi } from '../base';
import { authLoginResponse } from './type';
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAuthLogin: build.mutation<authLoginResponse, any>({
      query: (data) => {
        return {
          method: 'POST',
          url: `/admin/login`,
          body: data
        };
      },
    }),
    forgetPassword: build.mutation<any, any>({
      query: (data: any) => {
        return {
          method: 'POST',
          url: `/admin/forget`,
          body: data,
        };
      },
    }),
    forgetPasswordSave: build.mutation<any, any>({
      query: (data: any) => {
        return {
          method: 'PATCH',
          url: `/admin/forget`,
          body: data,
        };
      },
    }),
  }),
});

export const { useGetAuthLoginMutation, useForgetPasswordMutation, useForgetPasswordSaveMutation } = authApi;
