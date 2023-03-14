import Image from "next/image";
import React from "react";
import { useAuth } from "src/hooks/useAuth";
import logo from "../../public/logo.svg";
import { RiVipCrown2Line } from "react-icons/ri";
import { AiOutlineHourglass, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { ISubscription } from "./subscription-plan.props";

const SubscriptionPlan = ({ products }: ISubscription) => {
	const { logOut } = useAuth();

	return (
		<div className="min-h-screen ">
			<div className="  border-b-2 border-gray-300/20 h-[10vh] flex items-center justify-between px-4 md:px-10">
				<Image
					src={logo}
					alt={"logo"}
					width={56}
					height={56}
					className={"cursor-pointer object-contain"}
				/>
				<div
					onClick={() => logOut()}
					className=" cursor-pointer hover:underline">
					Logout
				</div>
			</div>
			<div className=" flex flex-col space-y-4 text-center">
				<h1 className=" text-2xl md:text-5xl text-shadow-sm">
					Flexible pricing for teams of any size.
				</h1>
				<p className=" text-xl text-shadow-sm">
					Relaxing with watchin your favourite movies and tv
				</p>
			</div>
			<div className="flex justify-center items-center">
				<div className=" md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
					{products.reverse().map((product) => (
						<div
							key={product.id}
							className="max-w-sm cursor-pointer bg-white/20 px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
							<h3 className="mb-3 text-xl font-bold text-[#E10856]">
								Starter
							</h3>
							<div className=" relative">
								{/* eslint-disable-next-line */}
								<img
									src={product.images[0]}
									alt="Colors"
									className="rounded-xl w-full"
								/>
								<p className="absolute top-0 bg-black/90 text-white font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
									{product.default_price.unit_amount}
								</p>
							</div>
							<div className="border-[1px] border-white/20 mt-4" />
							<button className="mt-4 w-full bg-[#E10856] py-4 rounded hover:opacity-80 font-semibold">
								BUY PLAN
							</button>
							<div className="my-4 flex flex-col space-y-2">
								{product.metadata.adv.split(", ").map((c, id) => (
									<div
										key={id}
										className="  flex items-center space-x-4">
										{id === 0 && (
											<RiVipCrown2Line className=" w-7 h-7" />
										)}
										{id === 1 && (
											<AiOutlineHourglass className=" w-7 h-7" />
										)}
										{id === 2 && (
											<AiOutlineVideoCameraAdd className=" w-7 h-7" />
										)}

										<p>{c}</p>
									</div>
								))}
								
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SubscriptionPlan;
