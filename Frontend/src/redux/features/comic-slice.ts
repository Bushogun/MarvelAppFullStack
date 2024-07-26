import { IComicCard } from '@/app/Components/Comics-list/interfaces/iComicCard';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateComic } from "@/redux/initial-state";

const comicSlice = createSlice({
  name: "comic",
  initialState: initialStateComic,
  reducers: {
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setComics: (state, action: PayloadAction<IComicCard>) => {
      state.comics = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setSpecificComic: (state, action) => {
      state.specificComic = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setIsLogged,
  setUserID,
  setUserName,
  setToken,
  clearToken,
  setComics,
  setSpecificComic,
  setLoading,
  setError,
} = comicSlice.actions;

export default comicSlice.reducer