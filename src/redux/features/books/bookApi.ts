import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (data) => ({
        url: `/book/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddBookMutation } = bookApi;
