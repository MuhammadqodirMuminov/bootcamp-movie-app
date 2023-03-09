import Image from "next/image";
import { BASE_IMAGE_URL } from "src/helpers";
import { ThumbnailProps } from "./thumbnail.interface";

const Thumbnail = ({ movies }: ThumbnailProps) => {
	return (
		<div className=" relative h-[330px] md:h-[440px] min-w-[200px] md:min-w-[292px] cursor-pointer transition duration-200 ease-out md:hover:scale-105">
			<Image
				src={`${BASE_IMAGE_URL}${
					movies?.poster_path || movies?.backdrop_path
				}`}
				alt={`${movies?.original_name}`}
				fill
				className=" object-cover rounded-sm md:rounded"
			/>
		</div>
	);
};

export default Thumbnail;
