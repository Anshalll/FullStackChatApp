import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const AccessData = createApi({
  reducerPath: 'AccessData',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000'}),
  endpoints: (builder) => ({


    validateUser: builder.mutation({
      query: ({  path, method }) => ({
        url: path,
        method: method || "GET",
        credentials: "include",
        headers: {
          'Cache-Control': 'no-cache',

          "Content-Type": "application/json",
        },
        transformResponse: (response) => {
       
          return response;
        },
        transformErrorResponse: (response) => {
      
          return response.data || response.error;
        },
  
      })
    }),
    
    Forms: builder.mutation({
      query: ({ path, data , method}) => ({
        url: path,
        method: method,
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',

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

    }),


    FileUpload: builder.mutation({
      query: ({ path, method , data  }) => ({
        url: path,
        method,
        credentials: "include",
      
        body: data
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

export const {  useFormsMutation , useValidateUserMutation , useFileUploadMutation} = AccessData;

