import { Store } from '@/redux/initial-state';
import { Middleware } from '@reduxjs/toolkit';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);

    const state: Store = store.getState().comic;
    const { isLogged, token, userID, comics } = state;

    const persistState = { isLogged, token, comics, userID };

    localStorage.setItem('comicState', JSON.stringify(persistState));

    return result;
};

export default localStorageMiddleware;
