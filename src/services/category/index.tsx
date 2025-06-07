import { baseApi } from '../base';
import { JobCategoryResponse } from './types';

type categoryResponse = {
  id:string
}


const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<JobCategoryResponse, any>({
      query: ({limit,offset}) => {
        return {
          method: 'GET',
          url: `/admin/category?limit=${limit}&offset=${offset}`,
        };
      },
      providesTags: ['category'],
    }),
    createCategory: build.mutation<any, any>({
      query: (data: any) => {
        return {
          method: 'POST',
          url: `/admin/category`,
          body: data,
        };
      },
      invalidatesTags: ['category'],
    }),
    deletyeCategory: build.mutation<any, categoryResponse>({
      query: ({id}) => {
  
        
        return {
          method: 'DELETE',
          url: `/admin/category/${id}`,
        };
      },
      invalidatesTags: ['category'],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoryQuery,useDeletyeCategoryMutation } = categoryApi;
