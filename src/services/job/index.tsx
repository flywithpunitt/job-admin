import { baseApi } from '../base';
import { JobsResponse } from './type';


const jobApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getjob: build.query<JobsResponse, any>({
      query: ({limit, offset, status, date_range}) => {
        
        return {
          method: 'GET',
          url: `/admin/listings?limit=${limit}&offset=${offset}&status=${status}&date_range=${date_range}
          `,
        };
      },
      providesTags: ["listings"],
    }),
    updatejob: build.mutation<any, any>({
      query: (data: any) => {
        return {
          method: 'PATCH',
          url: `/admin/listings`,
          body: data,
        };
      },
      invalidatesTags: ["listings"],
    }),
  }),
});

export const { useUpdatejobMutation,useGetjobQuery } = jobApi;
