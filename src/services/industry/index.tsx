import { baseApi } from '../base';
import { IndustryResponse } from './type';

type industryRequest = {
  id: string;
}

const industryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getIndustry: build.query<IndustryResponse, any>({
      query: ({limit,offset}) => {
        return {
          method: 'GET',
          url: `/admin/industry?limit=${limit}&offset=${offset}`,
        };
      },
      providesTags: ["industry"],
    }),
    createIndustry: build.mutation<any, any>({
      query: (data: any) => {
        return {
          method: 'POST',
          url: `/admin/industry`,
          body: data,
        };
      },
      invalidatesTags: ["industry"],
    }),
    deleteIndustry: build.mutation<any, industryRequest>({
      query: ({id}) => {
        return {
          method: 'DELETE',
          url: `/admin/industry/${id}`,
        };
      },
      invalidatesTags: ["industry"],
    }),
  }),
});

export const { useCreateIndustryMutation,useGetIndustryQuery,useDeleteIndustryMutation } = industryApi;
