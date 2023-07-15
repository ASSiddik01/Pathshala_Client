import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // getBook: builder.query({
    //   query: (id) => `/user/${id}`,
    //   providesTags: ["wishlist"],
    // }),
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

export const { useAddWishlistMutation } = bookApi;
