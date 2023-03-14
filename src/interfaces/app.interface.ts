export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	id: number;
	name: string;
	title: string;
	original_language: string;
	original_name: string;
	original_title: string;
	overview: string;
	poster_path: string;
	media_type: string;
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
}

export interface Element {
	type: "Trailer" | "Behind the Scenes" | "Teaser" | "Featurette";
}

export interface Product {
	default_price: {
		id: string;
		unit_amount: number;
	};
	id: string;
	images: string[];
	metadata: {
		adv: string;
	};
	name: string;
}
