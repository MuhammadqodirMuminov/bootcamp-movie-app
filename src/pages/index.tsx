import { GetServerSideProps } from "next";
import Head from "next/head";
import { Header, Hero, Modal, Row, SubscriptionPlan } from "src/components";
import { AuthContext } from "src/context/auth.context";
import { IMovie, Product } from "src/interfaces/app.interface";
import { API_REQUEST } from "src/services/api.service";
import { useContext } from "react";
import { useInfoStore } from "src/store";

export default function Home({
	trending,
	topRated,
	TvTopRated,
	popular,
	NowPlaying,
	Latest,
	products,
}: HomeProps): JSX.Element {
	const { isLoading } = useContext(AuthContext);
	const { modal } = useInfoStore();
	const subscription: boolean = false;

	console.log(products);

	if (isLoading) return <>{null}</>;

	// if (!subscription) return <SubscriptionPlan products={products} />;

	return (
		<div
			className={` relative h-[200vh] ${
				modal && "!h-screen overflow-hidden"
			}`}>
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
			{modal && <Modal />}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
	const [
		trending,
		topRated,
		TvTopRated,
		popular,
		NowPlaying,
		Latest,
		products,
	] = await Promise.all([
		fetch(API_REQUEST.trending).then((response) => response.json()),
		fetch(API_REQUEST.top_rated).then((response) => response.json()),
		fetch(API_REQUEST.tv_top_rated).then((response) => response.json()),
		fetch(API_REQUEST.popular).then((response) => response.json()),
		fetch(API_REQUEST.now_playing).then((response) => response.json()),
		fetch(API_REQUEST.latest).then((response) => response.json()),
		fetch(API_REQUEST.products_list).then((response) => response.json()),
	]);

	return {
		props: {
			trending: trending?.results,
			topRated: topRated.results,
			TvTopRated: TvTopRated.results,
			popular: popular.results,
			NowPlaying: NowPlaying.results,
			Latest: Latest.results || trending.results.reverse(),
			products: products.products.data,
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
	products: Product;
}
