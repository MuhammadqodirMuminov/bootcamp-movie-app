import { IMovie } from "src/interfaces/app.interface";

export interface IRow {
	title: string;
  movies: IMovie[];
  isBig?: boolean;
}
