import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/user/profile`,
      providesTags: ["wishlist"],
    }),
    addWishlist: builder.mutation({
      query: ({ data }) => ({
        url: `/user/add-wishlist`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const { useAddWishlistMutation, useGetUserQuery } = bookApi;
