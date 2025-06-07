import { baseApi } from '../base';

import { CandidateResponse } from './types';


const candidateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCandidate: build.query<CandidateResponse, any>({
      query: ({limit,offset}) => {
        return {
          method: 'GET',
          url: `/admin/candidate?limit=${limit}&offset=${offset}`,
        };
      },
    }),
    createCandidate: build.mutation<any, any>({
      query: (data: any) => {
        return {
          method: 'POST',
          url: `/admin/candidate`,
          body: data,
        };
      },
    }),
    getCandidateById: build.query<any, any>({
      query: ({id}) => {
        return {
          method: 'GET',
          url: `/admin/candidate/${id}`,
        };
      },
    }),
  }),
});

export const { useCreateCandidateMutation, useGetCandidateQuery, useGetCandidateByIdQuery} = candidateApi;
