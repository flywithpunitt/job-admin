import { baseApi } from '../base';
import {
  customerByIdResponce,
  customerRequest,
  customerResponce,
  CustomersResponse,
  getCustomerPlanResponce,
} from './type';

type customerRequestType = {
  limit?: number;
  offset?: number;
};

const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomer: build.query<CustomersResponse, customerRequestType>({
      query: ({ limit, offset }) => `/customer?limit=${limit}&offset=${offset}`,
      // providesTags: ['customer'],
    }),
    createCustomer: build.mutation<customerResponce[], customerRequest>({
      query: (data) => ({
        method: 'POST',
        url: '/customer',
        body: data,
      }),
      // invalidatesTags: ['customer'],
    }),
    getCustomerPlan: build.query<getCustomerPlanResponce, any>({
      query: (id) => ({
        method: 'GET',
        url: `/plan/${id}/customer`,
        // providesTags: ['customer'],
      }),
    }),

    getCustomerById: build.query<customerByIdResponce, any>({
      query: (id) => ({
        method: 'GET',
        url: `/customer/${id}`,
        // providesTags: ['customer'],
      }),
    }),
  }),
});

export const {
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useGetCustomerPlanQuery,
  useGetCustomerByIdQuery,
} = customerApi;
