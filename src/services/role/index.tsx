import { baseApi } from '../base';
import { JobRoleResponse } from './types';

const roleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRole: build.query<JobRoleResponse, any>({
      query: ({limit,offset}) => {
        console.log(limit,offset);
        return {
          method: 'GET',
          url: `/admin/role?limit=${limit}&offset=${offset}`,
        };
      },
      providesTags: ["role"],
    }),
    getReview: build.query<any, any>({
      query: ({limit,offset}) => {
       
        return {
          method: 'GET',
          url: `/admin/review`,
        };
      },
      providesTags: ["review"],
    }),
    updateReview: build.mutation<any, any>({
      query: (data: any) => {
        return {
          method: 'PATCH',
          url: `/admin/review/${data.id}/${data.status}`,
        };
      },
      invalidatesTags: ["review"],
    }),
    createRole: build.mutation<any, any>({
      query: (data: any) => {
        return {
          method: 'POST',
          url: `/admin/role`,
          body: data,
        };
      },
      invalidatesTags: ["role"],
    }),
  }),
});

export const { useGetRoleQuery,useCreateRoleMutation, useGetReviewQuery, useUpdateReviewMutation } = roleApi;
