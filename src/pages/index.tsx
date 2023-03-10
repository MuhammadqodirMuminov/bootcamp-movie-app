import { GetServerSideProps } from "next";
import Head from "next/head";
import { Header, Hero, Row } from "src/components";
import { IMovie } from "src/interfaces/app.interface";
import { API_REQUEST } from "src/services/api.service";

export default function Home({
	trending,
	topRated,
	TvTopRated,
	popular,
	NowPlaying,
	Latest,
}: HomeProps): JSX.Element {
	return (
		<div className=" relative h-[200vh]">
			<Head>
				<title>Home - Movie</title>
				<meta name="description" content="Generated by create next app" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/logo.svg" />
			</Head>
			<Header />
			<main className=" relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
				<Hero trending={trending} />
				<section className=" space-y-16">
					<Row title="Top Rated" movies={topRated} />
					<Row title="TV Shows" movies={TvTopRated} isBig={true} />
					<Row title="Popular" movies={popular} isBig={true} />
					<Row title="NowPlaying" movies={NowPlaying} />
					<Row title="Latest" movies={Latest} />
				</section>
			</main>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const trending = await fetch(API_REQUEST.trending).then((response) =>
		response.json()
	);
	const topRated = await fetch(API_REQUEST.top_rated).then((response) =>
		response.json()
	);
	const TvTopRated = await fetch(API_REQUEST.tv_top_rated).then((response) =>
		response.json()
	);
	const popular = await fetch(API_REQUEST.popular).then((response) =>
		response.json()
	);
	const NowPlaying = await fetch(API_REQUEST.now_playing).then((response) =>
		response.json()
	);
	const Latest = await fetch(API_REQUEST.latest).then((response) =>
		response.json()
	);

	return {
		props: {
			trending: trending?.results,
			topRated: topRated.results,
			TvTopRated: TvTopRated.results,
			popular: popular.results,
			NowPlaying: NowPlaying.results,
			Latest: Latest.results || trending.results.reverse(),
		},
	};
};

interface HomeProps {
	trending: IMovie[];
	topRated: IMovie[];
	TvTopRated: IMovie[];
	popular: IMovie[];
	NowPlaying: IMovie[];
	Latest: IMovie[];
}
