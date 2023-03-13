import { IMovie } from "src/interfaces/app.interface";
import { create } from "zustand";

interface InfoState {
	modal: boolean;
	Currentmovies: IMovie;
	setModal: (bool: boolean) => void;
	setCurrentMovies: (movies: IMovie) => void;
}

export const useInfoStore = create<InfoState>()((set) => ({
	modal: false,
	Currentmovies: {} as IMovie,
	setModal: (bool: boolean) => set((state) => ({ ...state, modal: bool })),
	setCurrentMovies: (movie: IMovie) =>
		set((state) => ({ ...state, Currentmovies: movie })),
}));
