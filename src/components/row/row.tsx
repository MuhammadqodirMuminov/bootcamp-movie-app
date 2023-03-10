import { useRef, useState } from "react";

import { IRow } from "./row.interface";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Thumbnail from "../thumbnail/thumbnail";

const Row = ({ title, movies, isBig = false }: IRow) => {
	const [moved, setMoved] = useState<boolean>(false);
	const coruselRef = useRef<HTMLDivElement>(null);
	const handleClick = (direction: "right" | "left") => {
		setMoved(true);

		if (coruselRef.current) {
			const { scrollLeft, clientWidth } = coruselRef.current;

			const scrollTo =
				direction === "left"
					? scrollLeft - clientWidth
					: scrollLeft + clientWidth;

			coruselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });

			if (direction === "left" && scrollTo === 0) {
				setMoved(false);
			}
		}
	};

	return (
		<div className=" space-y-1 md:space-y-2">
			<h2 className=" w-56 cursor-pointer text-sm md:text-2xl font-semibold text-[#c4c2c2] hover:text-white transition duration-200">
				{title}
			</h2>

			<div className=" group relative md:ml-2">
				<AiFillCaretLeft
					className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-125 ${
						!moved && "hidden"
					}`}
					onClick={() => handleClick("left")}
				/>

				<div
					className={`flex items-center ${
						!isBig && "space-x-1 md:space-x-4"
					}   scrollbar-hide overflow-x-scroll overflow-hidden `}
					ref={coruselRef}>
					{movies?.map((item) => (
						<Thumbnail key={item.id} movies={item} isBig={isBig} />
					))}
				</div>

				<AiFillCaretRight
					className=" absolute top-0 bottom-0 right-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-125"
					onClick={() => handleClick("right")}
				/>
			</div>
		</div>
	);
};

export default Row;
