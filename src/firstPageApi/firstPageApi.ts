import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataPoke } from '../slicers/pokeList/pokeSlicerType';

export const firstPage = createApi({
  reducerPath: 'firstPage',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getPosts: builder.query<DataPoke, void>({
      query: () => '/pokemon-species',
    }),
  }),
});

export const { useGetPostsQuery } = firstPage;
