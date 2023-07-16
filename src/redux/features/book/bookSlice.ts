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
  genre: string;
  year: string;
}

const initialState: IBook = {
  books: null,
  meta: null,
  search: null,
  genre: "",
  year: "",
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
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
  },
});

export const { booksState, searchState, setGenre, setYear } = bookSlice.actions;

export default bookSlice.reducer;
