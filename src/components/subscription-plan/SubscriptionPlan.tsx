import Image from "next/image";
import React from "react";
import { useAuth } from "src/hooks/useAuth";
import logo from "../../public/logo.svg";
import { ISubscription } from "./subscription-plan.props";
import PlanCard from "../plan-card/plan-card";

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
			<div className="flex justify-center items-center mt-20">
				<div className=" md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
					{products.reverse().map((product) => (
						<PlanCard product={product} key={product.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default SubscriptionPlan;
