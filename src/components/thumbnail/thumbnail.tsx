import Image from "next/image";
import ReactStars from "react-stars";
import { BASE_IMAGE_URL } from "src/helpers";
import { useInfoStore } from "src/store";
import { ThumbnailProps } from "./thumbnail.interface";

const Thumbnail = ({ movies, isBig = false }: ThumbnailProps) => {
  const { setModal, setCurrentMovies } = useInfoStore();
  
  const handleMmovieClick = () => {
		setModal(true);
		setCurrentMovies(movies);
  };


	return (
		<div
			onClick={handleMmovieClick}
			className={`relative ${
				isBig
					? "h-[440px] md:h-[640px] min-w-[350px] md:min-w-[450px]"
					: "h-[330px] md:h-[440px] min-w-[200px] md:min-w-[292px]"
			}  cursor-pointer transition duration-200 ease-out md:hover:scale-105`}>
			<Image
				src={`${BASE_IMAGE_URL}${
					movies?.poster_path || movies?.backdrop_path
				}`}
				alt={`${movies?.original_name}`}
				fill
				className=" object-cover rounded-sm md:rounded"
			/>

			<div className=" absolute top-0 bottom-0 left-0 right-0 bg-black/40 w-full h-full rounded"></div>

			<div className=" absolute left-2 right-2 bottom-5">
				<div className="flex items-center space-x-4">
					<ReactStars
						count={10}
						value={Math.floor(movies?.vote_average)}
						color2={"#fff"}
						edit={false}
						size={24}
					/>
					<p>({movies?.vote_count})</p>
				</div>

				<h1 className="text-2xl font-bold md:text-4xl  ">
					{movies?.name || movies?.original_name || movies?.original_title}
				</h1>
			</div>
		</div>
	);
};

export default Thumbnail;
