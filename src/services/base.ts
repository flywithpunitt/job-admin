
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { log } from 'console';
import { APP_ENV } from 'src/config';
import { RootState } from 'src/redux/store';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: APP_ENV !== 'PROD' ? 'https://apis.wiztrace.com/api/v1' : 'https://apis.wiztrace.com/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // const { token }: any = (getState() as RootState).user;
     const token = localStorage.getItem("accessToken")

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
  'user',
 'role',
  'industry',
  'company',
  'category',
  'listings',
  'dashboard',
  'blog',
  'partner',
  "review"
  ],
});
