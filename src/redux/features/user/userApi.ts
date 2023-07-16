import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/user/profile`,
      providesTags: ["wishlist", "readlist"],
    }),
    addWishlist: builder.mutation({
      query: ({ data }) => ({
        url: `/user/add-wishlist`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    removeWishlist: builder.mutation({
      query: ({ data }) => ({
        url: `/user/remove-wishlist`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    addReadlist: builder.mutation({
      query: ({ data }) => ({
        url: `/user/add-readlist`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["readlist"],
    }),
    markFinished: builder.mutation({
      query: ({ data }) => ({
        url: `/user/mark-finished`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["readlist"],
    }),
  }),
});

export const {
  useAddWishlistMutation,
  useGetUserQuery,
  useRemoveWishlistMutation,
  useAddReadlistMutation,
  useMarkFinishedMutation,
} = bookApi;
