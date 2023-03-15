import MuiModal from "@mui/material/Modal";
import { useInfoStore } from "src/store";
import { FaTimes, FaPlay, FaPause } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Element } from "src/interfaces/app.interface";
import ReactPlayer from "react-player";
import { BiPlus } from "react-icons/bi";
import { VscUnmute } from "react-icons/vsc";
import { BsVolumeMute } from "react-icons/bs";
import { AiFillLike, AiOutlineCloseCircle } from "react-icons/ai";
import { addDoc, collection } from "firebase/firestore";
import { db } from "src/firebase";
import { AuthContext } from "../../context/auth.context";
import { useRouter } from "next/router";
import { IconButton, Snackbar } from "@mui/material";

const Modal = () => {
	const [trailer, setTrailer] = useState<string>("");
	const [muted, setMuted] = useState<boolean>(true);
	const [play, setPlay] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();
	const [open, setOpen] = useState(false);



	const handleCloseS = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const { user } = useContext(AuthContext);

	const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
	const api_key = process.env.NEXT_PUBLIC_API_KEY as string;
	const handleClose = () => {
		setModal(false);
	};

	const { modal, setModal, Currentmovies } = useInfoStore();

	const api = `${base_url}/${
		Currentmovies.media_type === "tv" ? "tv" : "movie"
	}/${Currentmovies.id}/videos?api_key=${api_key}&language=en-US`;

	const addToList = async () => {
		setIsLoading(true);
		try {
			await addDoc(collection(db, "products"), {
				user_id: user?.uid,
				product: Currentmovies,
			});
			setIsLoading(false);
			setOpen(true);

			router.replace(router.asPath);
		} catch (e) {
			console.error("Error adding document: ", e);
			setIsLoading(true);
		}
	};

	const action = (
		<>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleCloseS}>
				<AiOutlineCloseCircle className="w-7 h-7" />
			</IconButton>
		</>
	);

	useEffect(() => {
		const fetchVideoData = async () => {
			const data = await fetch(api).then((response) => response.json());

			if (data?.results) {
				const index = data?.results.findIndex(
					(el: Element) => el.type === "Trailer"
				);

				setTrailer(`${data?.results[index].key}`);
			}
		};

		fetchVideoData();
		//eslint-disable-next-line
	}, [Currentmovies]);

	return (
		<MuiModal
			open={modal}
			onClose={handleClose}
			className=" fixed  !top-7 left-0 right-0 z-50 mx-auto w-full md:max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide">
			<>
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleCloseS}
					message="SUCCESS"
					action={action}
				/>
				<button
					onClick={() => setModal(false)}
					className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#111111]">
					<FaTimes />
				</button>
				<div className=" relative pt-[55%]">
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${trailer}`}
						width={"100%"}
						height={"100%"}
						playing={play}
						style={{ position: "absolute", top: 0, left: 0 }}
						muted={muted}
					/>
					<div className=" absolute bottom-10 flex items-center justify-center px-18">
						<div className=" flex space-x-2 items-center">
							<button
								onClick={() => setPlay((prev: boolean) => !prev)}
								className=" flex items-center gap-x-2 rounded  py-4 bg-white px-8 text-xl text-black transition hover:bg-[#e6e6e6]">
								{play ? (
									<>
										<FaPause className=" h-7 w-7 text-black" />
										Pause
									</>
								) : (
									<>
										<FaPlay className=" h-7 w-7 text-black" />
										Play
									</>
								)}
							</button>
							<button className="modalButton " onClick={addToList}>
								{isLoading ? "..." : <BiPlus className="w-6 h-6" />}
							</button>
							<button className="modalButton ">
								<AiFillLike className="w-6 h-6" />
							</button>

							<button
								onClick={() => setMuted((prev) => !prev)}
								className="modalButton">
								{muted ? (
									<BsVolumeMute className="w-6 h-6" />
								) : (
									<VscUnmute className="w-6 h-6" />
								)}
							</button>
						</div>
					</div>
				</div>

				<div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
					<div className="space-y-6 text-lg">
						<div className="flex items-center space-x-2 text-sm">
							<p className="font-semibold text-green-400">
								{Currentmovies!.vote_average * 10}% Match
							</p>
							<p className="font-light">
								{Currentmovies.first_air_date}
							</p>
							<div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
								HD
							</div>
						</div>

						<div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
							<p className="w-5/6">{Currentmovies?.overview}</p>
							<div className="flex flex-col space-y-3 text-sm">
								<div>
									<span className="text-[gray]">
										Original language:
									</span>{" "}
									{Currentmovies?.original_language}
								</div>

								<div>
									<span className="text-[gray]">Total votes:</span>{" "}
									{Currentmovies?.vote_count}
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</MuiModal>
	);
};

export default Modal;
