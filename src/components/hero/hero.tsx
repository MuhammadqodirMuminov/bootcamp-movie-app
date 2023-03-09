import Image from "next/image";
import { useEffect, useState } from "react";
import { BASE_IMAGE_URL } from "src/helpers";
import { IMovie } from "src/interfaces/app.interface";
import { HeroProps } from "./hero.props";
import { TbPlayerPlay } from "react-icons/tb";
import ReactStars from "react-stars";

const Hero = ({ trending }: HeroProps): JSX.Element => {
	const [movie, setMovie] = useState<IMovie>({} as IMovie);

	useEffect(() => {
		const randomMovie = trending[Math.floor(Math.random() * trending.length)];

		setMovie(randomMovie);
	}, [trending]);

	return (
		<div className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[65vh] lg:pb-12 lg:justify-center">
			<div className="  absolute top-0 left-0 -z-10  h-[95vh] w-full">
				<Image
					src={`${BASE_IMAGE_URL}${
						movie?.backdrop_path || movie?.poster_path
					}`}
					alt={`${movie?.original_name}`}
					fill
					className=" object-cover "
				/>
			</div>

			<div className="py-[4px] px-[8px] text-center w-[111px] bg-[#1d1d1d]/50 rounded-tr-[8px] rounded-bl-[8px]">
				{movie?.media_type}
			</div>

			<div className="flex items-center space-x-4">
				<ReactStars
					count={10}
					value={Math.floor(movie?.vote_average)}
					color2={"#fff"}
					edit={false}
					size={32}
				/>
				<p>({movie?.vote_count})</p>
			</div>

			<h1 className="text-2xl font-bold md:text-4xl lg:text-7xl ">
				{movie?.name || movie?.original_name || movie?.original_title}
			</h1>

			<p className=" max-w-xs md:max-w-lg lg:max-w-2xl text-xs md:text-lg lg:text-2xl text-shadow-md">
				{movie?.overview?.slice(0, 100)}...
			</p>

			<div className="w-[200px] h-[56px] font-bold bg-white/40 text-black  space-x-2 rounded-full flex items-center justify-center">
				<TbPlayerPlay className=" h-5 w-5 md:h-8  md:w-8" />{" "}
				<button> Watch more</button>
			</div>
		</div>
	);
};

export default Hero;
