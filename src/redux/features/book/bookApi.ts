import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["newBook"],
    }),
    getBooks: builder.query({
      query: () => "/book",
      providesTags: ["newBook"],
    }),
    getBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
  }),
});

export const { useAddBookMutation, useGetBooksQuery, useGetBookQuery } =
  bookApi;
