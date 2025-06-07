import { baseApi } from '../base';

const menuApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMenu: build.query<any, any>({
      query: () => {
        return {
          method: 'GET',
          url: `/admin/menu`,
        };
      },
    })
    // registerUser: build.mutation<any, any>({
    //   query: (data: any) => {
    //     return {
    //       method: 'POST',
    //       url: `/signup`,
    //       body: data,
    //     };
    //   },
    // }),
  }),
});

export const { useGetMenuQuery } = menuApi;
