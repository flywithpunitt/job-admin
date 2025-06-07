import { baseApi } from '../base';
import { CompanyResponse } from './type';


const companyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCompany: build.query<CompanyResponse, any>({
      query: ({limit,offset}) => {
        return {
          method: 'GET',
          url: `/admin/company?limit=${limit}&offset=${offset}`,
        };
      },
      providesTags: ["company"],
    }),
    updateCompany: build.mutation<any, any>({
      query: (data: any) => {
        return {
          method: 'PATCH',
          url: `/admin/company`,
          body: data,
        };
      },
      invalidatesTags: ["company"],
    }),
  }),
});

export const {

    useUpdateCompanyMutation,
    useGetCompanyQuery,

} = companyApi;
