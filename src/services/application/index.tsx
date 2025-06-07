import { baseApi } from '../base';



const applicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getApplication: build.query<any, any>({
      query: ({id}) => {
        return {
          method: 'GET',
          url: `/admin/applications?job_id=${id}`,
        };
      },
    }),
  }),
});

export const { useGetApplicationQuery } = applicationApi;
