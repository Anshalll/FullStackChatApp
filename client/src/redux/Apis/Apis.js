import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const AccessData = createApi({
  reducerPath: 'AccessData',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000'}),
  endpoints: (builder) => ({
    getAccessData: builder.query({
      query: (name) => ({
        url: name,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }

      }), 
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,
      providesTags: ["UserData"] ,
      
    }),

   
    Forms: builder.mutation({
      query: ({ path, data , method}) => ({
        url: path,
        method: method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
      transformResponse: (response) => {
       
        return response;
      },
      transformErrorResponse: (response) => {
    
        return response.data || response.error;
      },

    })
    
  }),
});

export const { useGetAccessDataQuery , useFormsMutation } = AccessData;

