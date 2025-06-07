import { baseApi } from '../base';
import { UserRequest, UserResponse } from './type';

type planTypeRequest = {
  limit?: number;
  offset?: number;
};

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getuser: build.query<UserResponse, planTypeRequest>({
      query: ({limit, offset}) => {
        return {
          method: 'GET',
          url: `/admin/user?limit=${limit}&offset=${offset}`,
        };
      
      },
      providesTags: ["user"],
    }),
    createUser: build.mutation<any, UserRequest>({
      query: (data: any) => {
        return {
          method: 'POST',
          url: `/admin/user`,
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
    getuserMe: build.query<any, any>({
      query: () => {
        return {
          method: 'GET',
          url: `/admin/user/me`,
        };
      
      },
    
    }),
    updateUser:  build.mutation<any, any>({
      query: (data) => {
        return {
          method: 'PATCH',
          url: `/admin/user/${data.id}`,
          body: data,
        };
      },
      invalidatesTags: ["user"],
      
    }),
  }),
});

export const { useGetuserQuery,useCreateUserMutation,useGetuserMeQuery, useUpdateUserMutation } = userApi;
