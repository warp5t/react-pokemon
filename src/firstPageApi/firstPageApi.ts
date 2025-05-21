import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const firstPage = createApi({
  reducerPath: 'firstPage',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/pokemon-species',
    })
  }),
});

export const { useGetPostsQuery } = firstPage;