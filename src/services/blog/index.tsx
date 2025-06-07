import { baseApi } from '../base';

type customerRequestType = {
  limit?: number;
  offset?: number;
};

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlog: build.query<any, any>({
      query: () => `/admin/blog`,
     providesTags: ['blog'],
    }),
    createBlog: build.mutation<any, any>({
      query: (data) => ({
        method: 'POST',
        url: '/admin/blog',
        body: data,
      }),
       invalidatesTags: ['blog'],
    }),
    getBlogById: build.query<any, any>({
      query: (id) => ({
        method: 'GET',
        url: `/admin/blog/${id}`,
         
      }),
      providesTags: ['blog'],
    }),

    blogEdit: build.mutation<any, any>({
      query: ({id,data}) => ({
        method: 'POST',
        url: `/admin/blog/update/${id}`,
        body: data,
      }),
      invalidatesTags: ['blog'],
    }),
  }),
});

export const {
useCreateBlogMutation,
useGetBlogQuery,
useGetBlogByIdQuery,
useBlogEditMutation,
} = blogApi;
