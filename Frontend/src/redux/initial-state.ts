import { IComicCard, Result } from "@/app/Components/Comics-list/interfaces/iComicCard";

export interface Store {
  isLogged: boolean,
  userID: number,
  userName: '',
  token: string | null,
  comics: IComicCard | undefined,
  specificComic: Result | undefined,
  loading: boolean,
  error: string | null
}

export const initialStateComic: Store = {
  isLogged: false,
  userID: 0,
  userName: '',
  token: null,
  comics: undefined,
  specificComic: undefined,
  loading: false,
  error: null,
};