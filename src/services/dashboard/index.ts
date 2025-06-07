import { baseApi } from '../base';


const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query<any, any>({
      query: () => '/admin/dashboard',
     providesTags: ['dashboard'],
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
