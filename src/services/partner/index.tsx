import { baseApi } from '../base';
import { UserRequest, partnerResponse } from './type';

type planTypeRequest = {
  limit?: number;
  offset?: number;
};

const partnerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPartner: build.query<partnerResponse, planTypeRequest>({
      query: ({limit, offset}) => {
        return {
          method: 'GET',
          url: `/admin/partner`,
        };
      
      },
      providesTags: ["partner"],
    }),
    createPartner: build.mutation<partnerResponse, any>({
      query: (data: any) => {
        return {
          method: 'POST',
          url: `/admin/partner`,
          body: data.formData,
        };
      },
      invalidatesTags: ["partner"],
    }),
  
    deletePartner:  build.mutation<partnerResponse, any>({
      query: (data) => {
        return {
          method: 'DELETE',
          url: `admin/partner/${data.id}`,
        };
      },
      invalidatesTags: ["partner"],
      
    }),
  }),
});

export const {useCreatePartnerMutation,useDeletePartnerMutation,useGetPartnerQuery } = partnerApi;
