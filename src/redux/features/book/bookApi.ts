import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    getBooks: builder.query({
      query: (query) => `/book?${query}`,
      providesTags: ["book"],
    }),
    getBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    reviewBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
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
