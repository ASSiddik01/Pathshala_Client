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
      providesTags: ["newBook"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["newBook"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["newBook"],
    }),
    reviewBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["newBook"],
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetBooksQuery,
  useGetBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useReviewBookMutation,
} = bookApi;
