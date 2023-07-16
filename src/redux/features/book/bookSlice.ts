import { createSlice } from "@reduxjs/toolkit";

interface IBook {
  books:
    | [
        {
          _id: string;
          title: string;
          desc: string;
          author: string;
          genre: string;
          bookImgUrl: string;
          publishedDate: string;
        }
      ]
    | null;
  meta: {
    page: number | null;
    limit: number | null;
    total: number | null;
  } | null;
  search: {
    searchTerm: string | null;
  } | null;
}

const initialState: IBook = {
  books: null,
  meta: null,
  search: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    booksState: (state, action) => {
      state.books = action.payload.books;
      state.meta = action.payload.meta;
    },
    searchState: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { booksState, searchState } = bookSlice.actions;

export default bookSlice.reducer;
