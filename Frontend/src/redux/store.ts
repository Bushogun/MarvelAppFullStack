import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import comicSlice from "./features/comic-slice";
import localStorageMiddleware from "@/utils/storageSession";

const preloadedState = (): PreloadedState<RootState> => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem('comicState');
    if (savedState) {
      return { comic: JSON.parse(savedState) };
    }
  }
  return { comic: { isLogged: false, userID: 0, token: null, comics: undefined, loading: false, specificComic: undefined, error: null } };
};

const rootReducer = combineReducers({
  comic: comicSlice,
});

export function setupStore(preloadedStateParam?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedStateParam || preloadedState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
